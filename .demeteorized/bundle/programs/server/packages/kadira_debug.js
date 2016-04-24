(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;
var Random = Package.random.Random;
var check = Package.check.check;
var Match = Package.check.Match;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Kadira = Package['meteorhacks:kadira'].Kadira;

/* Package-scope variables */
var Utils, KdDataLayer, TraceStore, KadiraDebug, AppConfig, SubHandlers, KdData;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/kadira_debug/lib/utils.js                                                             //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
Utils = Utils || {};

Utils.getAppEnv = function() {
  var env = 'development';
  if(!Package['kadira:runtime-dev']) {
    env = 'production';
  }
  return env;  
};
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/kadira_debug/lib/server/utils.js                                                      //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
Utils = Utils || {};

Utils.getDebugAuthKey = function () {
  var authKey = process.env.KADIRA_DEBUG_AUTH_KEY;
  if(authKey) {
    return authKey;
  }

  // Getting it from Meteor.settings.
  authKey = Meteor.settings && 
    Meteor.settings.kadira && 
    Meteor.settings.kadira.debug &&
    Meteor.settings.kadira.debug.authKey;

  return authKey;
};
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/kadira_debug/lib/server/data_layer.js                                                 //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
KdDataLayer = function(args) {
  this._serverId = args.serverId;
  this._docID = {
    'client': 'clientAuthorizedSessions',
    'remote': 'remoteAuthorizedSessions',
  };

  this.configColl = new Mongo.Collection('__kdconfig');
  this.timeEventsColl = new Mongo.Collection('__kdtimeevents');
  this.timeEventsColl._createCappedCollection(52428800); // 50 MB
  this.tracesColl = new Mongo.Collection('__kdtraces');
  this.tracesColl._createCappedCollection(52428800); // 50 MB

  // set TTL Index for expire accessTokens and authSessions
  this.configColl._ensureIndex({expires: 1}, {expireAfterSeconds: 3600});
};

KdDataLayer.prototype.registerAccessToken = function(accessToken) {
  var expiryDate = new Date(Date.now() + 1000 * 3600 * 24);

  this.configColl.insert({
    type: 'accessTokens',
    token: accessToken,
    expires: expiryDate
  });
};

KdDataLayer.prototype.isValidToken = function(accessToken) {
  return !!this.configColl.findOne({
    type: 'accessTokens',
    token: accessToken
  });
};

KdDataLayer.prototype.registerSession = function(type, sessionId) {
  var expiryDate = new Date(Date.now() + 1000 * 3600 * 24);

  this.configColl.insert({
    type: this._docID[type],
    session: sessionId,
    expires: expiryDate
  });
};

KdDataLayer.prototype.isValidSession = function(type, sessionId) {
  return !!this.configColl.findOne({
    type: this._docID[type],
    session: sessionId
  });
};

KdDataLayer.prototype.unregisterSession = function(type, sessionId) {
  this.configColl.remove({
    type: this._docID[type],
    session: sessionId
  });
};

KdDataLayer.prototype.increaseListenersCount = function(val) {
  this.configColl.update(
    { _id: 'listenersCount' },
    { $inc: {count: val}},
    { upsert: true }
  );
};

KdDataLayer.prototype.getListenersCount = function() {
  var config = this.configColl.findOne({_id: 'listenersCount'});
  var timelineCount = (config && config.count) ? config.count : 0;
  return timelineCount;
};

KdDataLayer.prototype.setTimeEvent = function(data) {
  this.timeEventsColl.rawCollection().insert(data, function(err) {
    if(err) {
      console.error(err.stack);
    }
  });
};

KdDataLayer.prototype.setTrace = function(key, type, trace) {
  this.tracesColl.rawCollection().update(
    { _id: key},
    {
      type: type,
      data: JSON.stringify(trace)
    },
    { upsert: true},
    function(err) {
      if(err) {
        console.error(err.stack);
      }
    }
  );
};

KdDataLayer.prototype.getTrace = function(key, type) {
  var traceData = this.tracesColl.findOne({
    _id: key,
    type: type
  });
  var trace = (traceData) ? JSON.parse(traceData.data) : undefined;
  return trace;
};

KdDataLayer.prototype.reset = function() {
  this.configColl.remove({});
  // XXX: Here don't remove data in the capped collections
  // because their data will be removed eventually.
};

////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/kadira_debug/lib/server/trace_store.js                                                //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var LRUCache = Npm.require('lru-cache');

TraceStore = function(args) {
  this.kdData = args.kdData;

  this._sessionMapper = {};
  this._registeredSessions = {};

  this._onMethodTrace = this._onMethodTrace.bind(this);
  this._onSubTrace = this._onSubTrace.bind(this);

  // This is an measurement to make sure, we won't have a 
  // memory leak in case of something goes wrong.
  this._timeEventsCache = new LRUCache({max: 1000});
};

TraceStore.prototype.registerSession = function(sessionId, browserId, clientId) {
  var key = this._getClientKey(browserId, clientId);
  this._sessionMapper[key] = sessionId;
  // we store registered sessions in a map
  // to keep track for futher uses
  this._registeredSessions[sessionId] = true;
};

TraceStore.prototype.unregisterSession = function(browserId, clientId) {
  var key = this._getClientKey(browserId, clientId);
  var sessionId = this._sessionMapper[key];
  delete this._sessionMapper[key];
  delete this._registeredSessions[sessionId];
};

TraceStore.prototype.start = function() {
  // It's okay call `Kadira._startInstrumenting` multiple times
  Kadira._startInstrumenting(function() {});

  Kadira.EventBus.on('method', 'methodCompleted', this._onMethodTrace);
  Kadira.EventBus.on('pubsub', 'subCompleted', this._onSubTrace);
};

TraceStore.prototype.stop = function() {
  Kadira.EventBus.removeListener('method', 'methodCompleted', this._onMethodTrace);
  Kadira.EventBus.removeListener('pubsub', 'subCompleted', this._onSubTrace);
};

TraceStore.prototype.getTrace = function(browserId, clientId, type, id) {
  var key = this._getClientKey(browserId, clientId);
  var sessionId = this._sessionMapper[key];
  if(!sessionId) {
    return;
  }

  if(type === 'method' || type === 'pubsub') {
    var traceKey = this._getTraceKey(sessionId, id);
    var trace = this.kdData.getTrace(traceKey, type);
    return trace;
  } else {
    throw new Meteor.Error(400, "Invalid trace type: " + type);
  }
};

// Pick all the timevents collection for this client
// Once picked, those data will be removed from the cache
TraceStore.prototype.pickTimeEvents = function(browserId, clientId) {
  var key = this._getClientKey(browserId, clientId);
  var sessionId = this._sessionMapper[key];

  if(!this._timeEventsCache.has(sessionId)) {
    return [];
  }

  var cacheItem = this._timeEventsCache.get(sessionId);
  this._timeEventsCache.del(sessionId);

  return cacheItem.times;
};

/*
  Tracks time related metrics for DDP messages 
  (but possible for others as well)

  @param type - type of the message (pubsub, method)
  @param id - sessionId of the message
  @param id - id of the message
  @param event - event we are tracking the time (eg:- start, end)
  @timestamp [optional] - timestamp of the event in milliseconds
  @info [optional] - an object containing some special information
*/
TraceStore.prototype._trackTime = function(type, sessionId, id, event, timestamp, info) {
  if(typeof timestamp === "object") {
    info = timestamp;
    timestamp = null;
  }

  timestamp = timestamp || Date.now();
  if(!this._timeEventsCache.has(sessionId)) {
    this._timeEventsCache.set(sessionId, {times: []});
  }

  var item = {
    type: type,
    id: id,
    event: event,
    timestamp: timestamp
  };

  if(info) {
    item.info = info;
  }

  this._timeEventsCache.get(sessionId).times.push(item);
};

TraceStore.prototype._onMethodTrace = function(trace, session) {
  if(!this._registeredSessions[session.id]) {
    // not a valid session,
    // return without building a trace
    return;    
  }

  // We don't need to track Kadira Debug ping method
  if(trace && trace.name === "kadira.debug.client.updateTimeline") {
    return;
  }
  this._buildTrace(trace);

  var key = this._getTraceKey(session.id, trace.id);
  this.kdData.setTrace(key, 'method', trace);

  this._trackTraceTimes('method', session.id, trace);
};

TraceStore.prototype._onSubTrace = function(trace, session) {
  if(!this._registeredSessions[session.id]) {
    // not a valid session,
    // return without building a trace
    return;    
  }

  // here, trace can be empty
  if(trace) {
    this._buildTrace(trace);

    var key = this._getTraceKey(session.id, trace.id);
    this.kdData.setTrace(key, 'pubsub', trace);

    this._trackTraceTimes('pubsub', session.id, trace);
  }
};

TraceStore.prototype._getTraceKey = function(session, traceId) {
  return session + traceId;
};

TraceStore.prototype._getClientKey = function(browserId, clientId) {
  return browserId + clientId;
};

// We need alter the tracer to make it compatible with the format
// tracer viewer accepts.
TraceStore.prototype._buildTrace = function(trace) {
  trace.startTime = new Date(trace.at);
  if(trace && trace.metrics && trace.metrics.total) {
    trace.totalValue = trace.metrics.total;
  }

  return trace;
};

TraceStore.prototype._trackTraceTimes = function(type, sessionId, trace) {
  var info = {name: trace.name};
  this._trackTime(type, sessionId, trace.id, 'server-received', trace.at, info);
  this._trackTime(type, sessionId, trace.id, 'server-waitend', trace.at + trace.metrics.wait);
  this._trackTime(type, sessionId, trace.id, 'server-processed', trace.at + trace.metrics.total);
};

TraceStore.prototype.reset = function() {
  this._sessionMapper = {};
  this._registeredSessions = {};
  
  this._timeEventsCache.reset();
};

////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/kadira_debug/lib/server/connect.js                                                    //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
KadiraDebug = KadiraDebug || {};
var UAParser = Npm.require('ua-parser-js');

AppConfig = {
  // app environment. Either `production` or `development`.
  env: Utils.getAppEnv(),

  // auth key taken from enviornment variables
  authKey: Utils.getDebugAuthKey()
};

SubHandlers = {
  // Keep DDP sessions of the remote admin's subscription for timeline
  timeline: [],
  // Keep DDP sessions of the client app's subscription for sending the
  // count of remote admins
  listeners: []
};

var uniqueId = 0;
var serverId = Random.id();
var startTime = new Date();

KdData = new KdDataLayer({serverId: serverId});

var traceStore = new TraceStore({kdData: KdData});
traceStore.start();

// Observers: KdConfig/listenersCount
KdData.configColl.find({_id: 'listenersCount'}).observeChanges({
  added: function(id, doc) {
    SubHandlers.listeners.forEach(function(sub) {
      sub.added('kdInfo', 'listeners-count', {count: doc.count});
    });
  },

  changed: function(id, doc) {
    SubHandlers.listeners.forEach(function(sub) {
      sub.changed('kdInfo', 'listeners-count', {count: doc.count});
    });
  }
});

// Observers: KdTimeEvents/serverTimeEvents
KdData.timeEventsColl.find({timestamp: {$gte: startTime}}).observeChanges({
  added: function(docId, doc) {
    if(doc && doc.data) {
      var info = JSON.parse(doc.data);
      var browserId = doc.browserId;
      var clientId = doc.clientId;

      SubHandlers.timeline.forEach(function(sub) {
        var id = 'id' + ++uniqueId;
        sub.added('kdTimeline', id, {
          browserId: browserId,
          clientId: clientId,
          data: info
        });
        sub.removed('kdTimeline', id);
      });
    }
  }
});

// publications

Meteor.publish('kadira.debug.remote.auth', function(authKey) {
  check(authKey, Match.Any);

  // We need to check authentication of a production app only.
  // For other development apps, we can use KD without any authentication
  if(AppConfig.env === 'production') {
    if(authKey !== AppConfig.authKey) {
      throw new Meteor.Error('401', 'Unauthorized.');
    }

    // authorize remote session
    var kadiraInfo = Kadira._getInfo();
    var sessionId = kadiraInfo.session;

    KdData.registerSession('remote', sessionId);
  }

  this.onStop(function() {
    if(AppConfig.env === 'production') {
      KdData.unregisterSession('remote', sessionId);
    }
  });

  this.ready();
});

Meteor.publish('kadira.debug.remote.timeline', function() {
  KadiraDebug._authorize('remote');

  this.ready();

  var sub = this;
  SubHandlers.timeline.push(sub);

  // increment listenersCount in DB
  KdData.increaseListenersCount(1);

  sub.onStop(function() {
    var index = SubHandlers.timeline.indexOf(sub);
    SubHandlers.timeline.splice(index, 1);

    // decrement listenersCount in DB
    KdData.increaseListenersCount(-1);
  });
});

Meteor.publish('kadira.debug.client.auth', function(accessToken) {
  check(accessToken, Match.Any);

  // We need to check the accessToken in the production mode only.
  // On development mode we don't need these checks.
  if(AppConfig.env === 'production') {

    if(!KdData.isValidToken(accessToken)) {
      throw new Meteor.Error('401', 'Unauthorized.');
    }

    // authorize client session
    var kadiraInfo = Kadira._getInfo();
    var sessionId = kadiraInfo.session;

    KdData.registerSession('client', sessionId);
  }

  this.onStop(function() {
    if(AppConfig.env === 'production') {
      KdData.unregisterSession('client', sessionId);
    }
  });

  this.ready();
});

Meteor.publish('kadira.debug.client.listeners', function() {
  KadiraDebug._authorize('client');

  var sub = this;

  var timelineCount = KdData.getListenersCount();

  sub.added('kdInfo', 'listeners-count', {count: timelineCount});
  sub.ready();

  SubHandlers.listeners.push(sub);
  sub.onStop(function() {
    var index = SubHandlers.listeners.indexOf(sub);
    SubHandlers.listeners.splice(index, 1);
  });
});

Meteor.publish('kadira.debug.client.init', function(browserId, clientId) {
  check(browserId, String);
  check(clientId, String);

  KadiraDebug._authorize('client');

  var kadiraInfo = Kadira._getInfo();
  if(kadiraInfo) {
    var sessionId = kadiraInfo.session;

    traceStore.registerSession(sessionId, browserId, clientId);

    this.onStop(function() {
      traceStore.unregisterSession(browserId, clientId);
    });
  }

  this.ready();
});

// methods
Meteor.methods({
  'kadira.debug.client.updateTimeline': function(browserId, clientId, data) {
    check(browserId, String);
    check(clientId, String);
    check(data, Object);

    KadiraDebug._authorize('client');

    // Pick tracked server time events and push them to the
    // client's payload
    // So, we can send them back to the server
    var serverTimeEvents = traceStore.pickTimeEvents(browserId, clientId);
    serverTimeEvents.forEach(function(ev) {
      data.times.push(ev);
    });

    // set unique id for each server sessions
    data.serverId = serverId;

    var dataObj = {
      browserId: browserId,
      clientId: clientId,
      type: 'timeEvents',
      timestamp: new Date(),
      data: JSON.stringify(data)
    };

    if(browserId && clientId) {
      // update data to DB
      KdData.setTimeEvent(dataObj);
    }
  },

  'kadira.debug.client.getBrowserName': function(userAgent) {
    check(userAgent, String);

    KadiraDebug._authorize('client');

    var parser = new UAParser(userAgent);
    return parser.getResult().browser.name;
  },

  'kadira.debug.remote.getTrace': function(browserId, clientId, type, id) {
    check(browserId, String);
    check(clientId, String);
    check(type, String);
    check(id, String);

    KadiraDebug._authorize('remote');

    return traceStore.getTrace(browserId, clientId, type, id);
  },

  'kadira.debug.remote.getAppEnv': function() {
    return AppConfig.env;
  },

  'kadira.debug.remote.createAccessToken': function() {
    KadiraDebug._authorize('remote');

    var token = Random.id(4);
    KdData.registerAccessToken(token);

    return token;
  },

  'kadira.debug.remote.reset': function() {
    KadiraDebug._authorize('remote');

    traceStore.reset();
    KdData.reset();
  }
});

KadiraDebug._authorize = function(type, sessionId) {
  if(AppConfig.env === 'development') {
    return true;
  }

  if(!sessionId) {
    var kadiraInfo = Kadira._getInfo();
    var sessionId = kadiraInfo.session;
  }

  if(KdData.isValidSession(type, sessionId)) {
    return true;
  } else {
    throw new Meteor.Error('401', 'Unauthorized.');
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['kadira:debug'] = {}, {
  KadiraDebug: KadiraDebug
});

})();

//# sourceMappingURL=kadira_debug.js.map
