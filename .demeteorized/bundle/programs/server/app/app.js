var require = meteorInstall({"lib":{"constants":{"lang_codes.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/constants/lang_codes.js                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
// key: Language Code, value: English Name                                                                             //
// https://msdn.microsoft.com/en-us/library/hh456380.aspx                                                              //
exports['default'] = {                                                                                                 //
  ar: 'Arabic',                                                                                                        // 4
  'bs-Latn': 'Bosnian (Latin)',                                                                                        // 5
  bg: 'Bulgarian',                                                                                                     // 6
  ca: 'Catalan',                                                                                                       // 7
  'zh-CHS': 'Chinese Simplified',                                                                                      // 8
  'zh-CHT': 'Chinese Traditional',                                                                                     // 9
  hr: 'Croatian',                                                                                                      // 10
  cs: 'Czech',                                                                                                         // 11
  da: 'Danish',                                                                                                        // 12
  nl: 'Dutch',                                                                                                         // 13
  en: 'English',                                                                                                       // 14
  et: 'Estonian',                                                                                                      // 15
  fi: 'Finnish',                                                                                                       // 16
  fr: 'French',                                                                                                        // 17
  de: 'German',                                                                                                        // 18
  el: 'Greek',                                                                                                         // 19
  ht: 'Haitian Creole',                                                                                                // 20
  he: 'Hebrew',                                                                                                        // 21
  hi: 'Hindi',                                                                                                         // 22
  mww: 'Hmong Daw',                                                                                                    // 23
  hu: 'Hungarian',                                                                                                     // 24
  id: 'Indonesian',                                                                                                    // 25
  it: 'Italian',                                                                                                       // 26
  ja: 'Japanese',                                                                                                      // 27
  sw: 'Kiswahili',                                                                                                     // 28
  tlh: 'Klingon',                                                                                                      // 29
  'tlh-Qaak': 'Klingon (pIqaD)',                                                                                       // 30
  ko: 'Korean',                                                                                                        // 31
  lv: 'Latvian',                                                                                                       // 32
  lt: 'Lithuanian',                                                                                                    // 33
  ms: 'Malay',                                                                                                         // 34
  mt: 'Maltese',                                                                                                       // 35
  no: 'Norwegian',                                                                                                     // 36
  fa: 'Persian',                                                                                                       // 37
  pl: 'Polish',                                                                                                        // 38
  pt: 'Portuguese',                                                                                                    // 39
  otq: 'Querétaro Otomi',                                                                                              // 40
  ro: 'Romanian',                                                                                                      // 41
  ru: 'Russian',                                                                                                       // 42
  'sr-Cyrl': 'Serbian (Cyrillic)',                                                                                     // 43
  'sr-Latn': 'Serbian (Latin)',                                                                                        // 44
  sk: 'Slovak',                                                                                                        // 45
  sl: 'Slovenian',                                                                                                     // 46
  es: 'Spanish',                                                                                                       // 47
  sv: 'Swedish',                                                                                                       // 48
  th: 'Thai',                                                                                                          // 49
  tr: 'Turkish',                                                                                                       // 50
  uk: 'Ukrainian',                                                                                                     // 51
  ur: 'Urdu',                                                                                                          // 52
  vi: 'Vietnamese',                                                                                                    // 53
  cy: 'Welsh',                                                                                                         // 54
  yua: 'Yucatec Maya'                                                                                                  // 55
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"msgs.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/constants/msgs.js                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
var PUBLISH_INTERVAL = exports.PUBLISH_INTERVAL = 15;                                                                  // 1
var NEW_CONVO_VISIBLE = exports.NEW_CONVO_VISIBLE = PUBLISH_INTERVAL;                                                  // 2
var VISIBLE_INTERVAL = exports.VISIBLE_INTERVAL = 15;                                                                  // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"widgets.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/constants/widgets.js                                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
var ItemTypes = exports.ItemTypes = {                                                                                  // 1
  WIDGET: 'widget'                                                                                                     // 2
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"vendor":{"WhyDidYouUpdateMixin.js":["underscore",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/vendor/WhyDidYouUpdateMixin.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
var _underscore = require('underscore');                                                                               // 2
                                                                                                                       //
var _underscore2 = _interopRequireDefault(_underscore);                                                                //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
                                                                                                                       //
/*                                                                                                                     //
Drop this mixin into a component that wastes time according to Perf.getWastedTime() to find                            //
out what state/props should be preserved. Once it says "Update avoidable!" for {state, props},                         //
you should be able to drop in React.addons.PureRenderMixin                                                             //
React.createClass {                                                                                                    //
  mixins: [WhyDidYouUpdateMixin]                                                                                       //
}                                                                                                                      //
*/                                                                                                                     //
function isRequiredUpdateObject(o) {                                                                                   // 12
  return Array.isArray(o) || o && o.constructor === Object.prototype.constructor;                                      // 13
} /* eslint-disable no-console */                                                                                      //
                                                                                                                       //
                                                                                                                       //
function deepDiff(o1, o2, p) {                                                                                         // 16
  var notify = function notify(status) {                                                                               // 17
    console.warn('Update %s', status);                                                                                 // 18
    console.log('%cbefore', 'font-weight: bold', o1);                                                                  // 19
    console.log('%cafter ', 'font-weight: bold', o2);                                                                  // 20
  };                                                                                                                   //
  if (!_underscore2['default'].isEqual(o1, o2)) {                                                                      // 22
    console.group(p);                                                                                                  // 23
    if ([o1, o2].every(_underscore2['default'].isFunction)) {                                                          // 24
      notify('avoidable?');                                                                                            // 25
    } else if (![o1, o2].every(isRequiredUpdateObject)) {                                                              //
      notify('required.');                                                                                             // 27
    } else {                                                                                                           //
      var keys = _underscore2['default'].union(_underscore2['default'].keys(o1), _underscore2['default'].keys(o2));    // 29
      for (var _iterator = keys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;                                                                                                      //
                                                                                                                       //
        if (_isArray) {                                                                                                //
          if (_i >= _iterator.length) break;                                                                           //
          _ref = _iterator[_i++];                                                                                      //
        } else {                                                                                                       //
          _i = _iterator.next();                                                                                       //
          if (_i.done) break;                                                                                          //
          _ref = _i.value;                                                                                             //
        }                                                                                                              //
                                                                                                                       //
        var key = _ref;                                                                                                //
                                                                                                                       //
        deepDiff(o1[key], o2[key], key);                                                                               // 31
      }                                                                                                                //
    }                                                                                                                  //
    console.groupEnd();                                                                                                // 34
  } else if (o1 !== o2) {                                                                                              //
    console.group(p);                                                                                                  // 36
    notify('avoidable!');                                                                                              // 37
    if (_underscore2['default'].isObject(o1) && _underscore2['default'].isObject(o2)) {                                // 38
      var _keys = _underscore2['default'].union(_underscore2['default'].keys(o1), _underscore2['default'].keys(o2));   // 39
      for (var _iterator2 = _keys, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;                                                                                                     //
                                                                                                                       //
        if (_isArray2) {                                                                                               //
          if (_i2 >= _iterator2.length) break;                                                                         //
          _ref2 = _iterator2[_i2++];                                                                                   //
        } else {                                                                                                       //
          _i2 = _iterator2.next();                                                                                     //
          if (_i2.done) break;                                                                                         //
          _ref2 = _i2.value;                                                                                           //
        }                                                                                                              //
                                                                                                                       //
        var _key = _ref2;                                                                                              //
                                                                                                                       //
        deepDiff(o1[_key], o2[_key], _key);                                                                            // 41
      }                                                                                                                //
    }                                                                                                                  //
    console.groupEnd();                                                                                                // 44
  }                                                                                                                    //
}                                                                                                                      //
                                                                                                                       //
var WhyDidYouUpdateMixin = {                                                                                           // 48
  componentDidUpdate: function () {                                                                                    // 49
    function componentDidUpdate(prevProps, prevState) {                                                                //
      deepDiff({ props: prevProps, state: prevState }, { props: this.props, state: this.state }, this.constructor.displayName);
    }                                                                                                                  //
                                                                                                                       //
    return componentDidUpdate;                                                                                         //
  }()                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
exports['default'] = WhyDidYouUpdateMixin;                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"perf.js":["react-addons-perf",function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/vendor/perf.js                                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Perf = require('react-addons-perf');                                                                                   // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"collections.js":["meteor/meteor","meteor/mongo",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/collections.js                                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
exports.buildIndexes = exports.Posts = exports.Locks = exports.Widgets = exports.Translations = exports.Invites = exports.Notifications = exports.Sections = exports.Notes = exports.Messages = exports.Convos = exports.Teams = undefined;
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 1
                                                                                                                       //
var _mongo = require('meteor/mongo');                                                                                  // 2
                                                                                                                       //
var Teams = exports.Teams = new _mongo.Mongo.Collection('teams');                                                      // 4
var Convos = exports.Convos = new _mongo.Mongo.Collection('convos');                                                   // 5
var Messages = exports.Messages = new _mongo.Mongo.Collection('messages');                                             // 6
var Notes = exports.Notes = new _mongo.Mongo.Collection('notes');                                                      // 7
var Sections = exports.Sections = new _mongo.Mongo.Collection('sections');                                             // 8
var Notifications = exports.Notifications = new _mongo.Mongo.Collection('notifications');                              // 9
var Invites = exports.Invites = new _mongo.Mongo.Collection('invites');                                                // 10
var Translations = exports.Translations = new _mongo.Mongo.Collection('translations');                                 // 11
var Widgets = exports.Widgets = new _mongo.Mongo.Collection('widgets');                                                // 12
var Locks = exports.Locks = new _mongo.Mongo.Collection('locks');                                                      // 13
                                                                                                                       //
// For test module                                                                                                     //
var Posts = exports.Posts = new _mongo.Mongo.Collection('posts');                                                      // 16
                                                                                                                       //
// Building indexes                                                                                                    //
var buildIndexes = exports.buildIndexes = function buildIndexes() {                                                    // 19
  if (_meteor.Meteor.isServer) {                                                                                       // 20
    Messages._ensureIndex({                                                                                            // 21
      text: 'text',                                                                                                    // 22
      username: 'text',                                                                                                // 23
      translation: 'text'                                                                                              // 24
    });                                                                                                                //
                                                                                                                       //
    Convos._ensureIndex({                                                                                              // 27
      name: 'text'                                                                                                     // 28
    });                                                                                                                //
                                                                                                                       //
    _meteor.Meteor.users._ensureIndex({                                                                                // 31
      username: 'text',                                                                                                // 32
      'emails.address': 'text'                                                                                         // 33
    });                                                                                                                //
                                                                                                                       //
    // TODO notes                                                                                                      //
  }                                                                                                                    // 20
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"convo.js":["meteor/jagi:astronomy","./collections","ramda",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/convo.js                                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
var _jagiAstronomy = require('meteor/jagi:astronomy');                                                                 // 1
                                                                                                                       //
var _collections = require('./collections');                                                                           // 2
                                                                                                                       //
var _ramda = require('ramda');                                                                                         // 3
                                                                                                                       //
var _ramda2 = _interopRequireDefault(_ramda);                                                                          //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
                                                                                                                       //
var Convo = _jagiAstronomy.Astro.Class({                                                                               // 5
  name: 'Convo',                                                                                                       // 6
  collection: _collections.Convos,                                                                                     // 7
  fields: {                                                                                                            // 8
    name: {                                                                                                            // 9
      type: 'string',                                                                                                  // 10
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return 'Default convo name';                                                                                 // 11
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    userIds: {                                                                                                         // 13
      type: 'array',                                                                                                   // 14
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return [];                                                                                                   // 15
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    teamId: {                                                                                                          // 17
      type: 'string',                                                                                                  // 18
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return 'noTeamId';                                                                                           // 19
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    firstMsgCreatedAt: {                                                                                               // 21
      type: 'date',                                                                                                    // 22
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return null;                                                                                                 // 23
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    lastMsgText: {                                                                                                     // 25
      type: 'string',                                                                                                  // 26
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return null;                                                                                                 // 27
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    lastMsgCreatedAt: {                                                                                                // 29
      type: 'date',                                                                                                    // 30
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return null;                                                                                                 // 31
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    recentUserIds: {                                                                                                   // 33
      type: 'array',                                                                                                   // 34
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return [];                                                                                                   // 35
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    recentUsernames: {                                                                                                 // 37
      type: 'array',                                                                                                   // 38
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return [];                                                                                                   // 39
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    numMsgs: {                                                                                                         // 41
      type: 'number',                                                                                                  // 42
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return 0;                                                                                                    // 43
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    }                                                                                                                  //
  },                                                                                                                   //
  behaviors: {                                                                                                         // 46
    timestamp: {                                                                                                       // 47
      hasCreatedField: true,                                                                                           // 48
      createdFieldName: 'createdAt',                                                                                   // 49
      hasUpdatedField: true,                                                                                           // 50
      updatedFieldName: 'updatedAt'                                                                                    // 51
    }                                                                                                                  //
  },                                                                                                                   //
  methods: {                                                                                                           // 54
    isUserInConvo: function () {                                                                                       // 55
      function isUserInConvo(input) {                                                                                  //
        var userIds = input.constructor === Array ? input : [input];                                                   // 56
        return _ramda2['default'].intersection(userIds, this.userIds).length === userIds.length;                       // 57
      }                                                                                                                //
                                                                                                                       //
      return isUserInConvo;                                                                                            //
    }(),                                                                                                               //
    isUserAdmin: function () {                                                                                         // 59
      function isUserAdmin() {                                                                                         //
        return true; // TODO implement new role for convo admin                                                        // 60
      }                                                                                                                // 59
                                                                                                                       //
      return isUserAdmin;                                                                                              //
    }(),                                                                                                               //
    getName: function () {                                                                                             // 62
      function getName(userId, convoUsers) {                                                                           //
        if (this.userIds.length === 1 || this.userIds.length > 2) {                                                    // 63
          return this.name;                                                                                            // 63
        }                                                                                                              //
        if (this.userIds.length === 2 && this.name === '') {                                                           // 64
          var otherUserId = _ramda2['default'].filter(function (id) {                                                  // 65
            return id !== userId;                                                                                      //
          }, this.userIds);                                                                                            //
          return convoUsers[otherUserId].username;                                                                     // 66
        }                                                                                                              //
        return this.name;                                                                                              // 68
      }                                                                                                                //
                                                                                                                       //
      return getName;                                                                                                  //
    }()                                                                                                                //
  }                                                                                                                    //
});                                                                                                                    //
exports['default'] = Convo;                                                                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"invite.js":["meteor/jagi:astronomy","./collections",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/invite.js                                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
var _jagiAstronomy = require('meteor/jagi:astronomy');                                                                 // 1
                                                                                                                       //
var _collections = require('./collections');                                                                           // 2
                                                                                                                       //
var Invite = _jagiAstronomy.Astro.Class({                                                                              // 4
  name: 'Invite',                                                                                                      // 5
  collection: _collections.Invites,                                                                                    // 6
  fields: {                                                                                                            // 7
    userId: {                                                                                                          // 8
      type: 'string'                                                                                                   // 9
    },                                                                                                                 //
    teamId: {                                                                                                          // 11
      type: 'string'                                                                                                   // 12
    },                                                                                                                 //
    invitedBy: {                                                                                                       // 14
      type: 'string'                                                                                                   // 15
    }                                                                                                                  //
  },                                                                                                                   //
  behaviors: {                                                                                                         // 18
    timestamp: {                                                                                                       // 19
      hasCreatedField: true,                                                                                           // 20
      createdFieldName: 'createdAt',                                                                                   // 21
      hasUpdatedField: true,                                                                                           // 22
      updatedFieldName: 'updatedAt'                                                                                    // 23
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    //
exports['default'] = Invite;                                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"lock.js":["meteor/jagi:astronomy","./collections",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/lock.js                                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
var _jagiAstronomy = require('meteor/jagi:astronomy');                                                                 // 1
                                                                                                                       //
var _collections = require('./collections');                                                                           // 2
                                                                                                                       //
var Lock = _jagiAstronomy.Astro.Class({                                                                                // 4
  name: 'Lock',                                                                                                        // 5
  collection: _collections.Locks,                                                                                      // 6
  fields: {                                                                                                            // 7
    noteId: {                                                                                                          // 8
      type: 'string'                                                                                                   // 9
    },                                                                                                                 //
    widgetId: {                                                                                                        // 11
      type: 'string'                                                                                                   // 12
    },                                                                                                                 //
    userId: {                                                                                                          // 14
      type: 'string'                                                                                                   // 15
    }                                                                                                                  //
  },                                                                                                                   //
  behaviors: {                                                                                                         // 18
    timestamp: {                                                                                                       // 19
      hasCreatedField: true,                                                                                           // 20
      createdFieldName: 'createdAt',                                                                                   // 21
      hasUpdatedField: true,                                                                                           // 22
      updatedFieldName: 'updatedAt'                                                                                    // 23
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    //
exports['default'] = Lock;                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"msg.js":["meteor/jagi:astronomy","./collections",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/msg.js                                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
var _jagiAstronomy = require('meteor/jagi:astronomy');                                                                 // 1
                                                                                                                       //
var _collections = require('./collections');                                                                           // 2
                                                                                                                       //
var Message = _jagiAstronomy.Astro.Class({                                                                             // 4
  name: 'Message',                                                                                                     // 5
  collection: _collections.Messages,                                                                                   // 6
  fields: {                                                                                                            // 7
    text: {                                                                                                            // 8
      type: 'string',                                                                                                  // 9
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return 'Default Message';                                                                                    // 10
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    userId: {                                                                                                          // 12
      type: 'string'                                                                                                   // 13
    },                                                                                                                 //
    username: { // Fall back for users who have been kicked out of team                                                // 15
      type: 'string',                                                                                                  // 16
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return 'Default username.';                                                                                  // 17
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    convoId: {                                                                                                         // 19
      type: 'string'                                                                                                   // 20
    },                                                                                                                 //
    convoName: {                                                                                                       // 22
      type: 'string',                                                                                                  // 23
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return 'Default Convo Name';                                                                                 // 24
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    translation: {                                                                                                     // 26
      type: 'object',                                                                                                  // 27
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return {};                                                                                                   // 28
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    }                                                                                                                  //
  },                                                                                                                   //
  behaviors: {                                                                                                         // 31
    timestamp: {                                                                                                       // 32
      hasCreatedField: true,                                                                                           // 33
      createdFieldName: 'createdAt',                                                                                   // 34
      hasUpdatedField: true,                                                                                           // 35
      updatedFieldName: 'updatedAt'                                                                                    // 36
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    //
exports['default'] = Message;                                                                                          //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"note.js":["meteor/jagi:astronomy","./collections","ramda",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/note.js                                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
var _jagiAstronomy = require('meteor/jagi:astronomy');                                                                 // 1
                                                                                                                       //
var _collections = require('./collections');                                                                           // 2
                                                                                                                       //
var _ramda = require('ramda');                                                                                         // 3
                                                                                                                       //
var _ramda2 = _interopRequireDefault(_ramda);                                                                          //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
                                                                                                                       //
var Note = _jagiAstronomy.Astro.Class({                                                                                // 5
  name: 'Note',                                                                                                        // 6
  collection: _collections.Notes,                                                                                      // 7
  fields: {                                                                                                            // 8
    convoId: {                                                                                                         // 9
      type: 'string'                                                                                                   // 10
    },                                                                                                                 //
    title: {                                                                                                           // 12
      type: 'string',                                                                                                  // 13
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return 'Default Note';                                                                                       // 14
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    widgetIds: {                                                                                                       // 16
      type: 'array',                                                                                                   // 17
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return [];                                                                                                   // 18
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    }                                                                                                                  //
  },                                                                                                                   //
  behaviors: {                                                                                                         // 21
    timestamp: {                                                                                                       // 22
      hasCreatedField: true,                                                                                           // 23
      createdFieldName: 'createdAt',                                                                                   // 24
      hasUpdatedField: true,                                                                                           // 25
      updatedFieldName: 'updatedAt'                                                                                    // 26
    }                                                                                                                  //
  },                                                                                                                   //
  methods: {                                                                                                           // 29
    isEmpty: function () {                                                                                             // 30
      function isEmpty() {                                                                                             //
        // return R.isEmpty(this.sectionIds);                                                                          //
        return _ramda2['default'].isEmpty(this.widgetIds);                                                             // 32
      }                                                                                                                //
                                                                                                                       //
      return isEmpty;                                                                                                  //
    }()                                                                                                                //
  }                                                                                                                    //
});                                                                                                                    //
exports['default'] = Note;                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"notification.js":["meteor/jagi:astronomy","./collections",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/notification.js                                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
var _jagiAstronomy = require('meteor/jagi:astronomy');                                                                 // 1
                                                                                                                       //
var _collections = require('./collections');                                                                           // 2
                                                                                                                       //
var Notification = _jagiAstronomy.Astro.Class({                                                                        // 4
  name: 'Notification',                                                                                                // 5
  collection: _collections.Notifications,                                                                              // 6
  fields: {                                                                                                            // 7
    userId: {                                                                                                          // 8
      type: 'string',                                                                                                  // 9
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return 'noUserId';                                                                                           // 10
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    teamId: {                                                                                                          // 12
      type: 'string',                                                                                                  // 13
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return 'noTeamId';                                                                                           // 14
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    convoId: {                                                                                                         // 16
      type: 'string',                                                                                                  // 17
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return 'noConvoId';                                                                                          // 18
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    convoName: {                                                                                                       // 20
      type: 'string',                                                                                                  // 21
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return 'default convo name';                                                                                 // 22
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    recentUsernames: {                                                                                                 // 24
      type: 'array',                                                                                                   // 25
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return [];                                                                                                   // 26
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    }                                                                                                                  //
  },                                                                                                                   //
  behaviors: {                                                                                                         // 29
    timestamp: {                                                                                                       // 30
      hasCreatedField: true,                                                                                           // 31
      createdFieldName: 'createdAt',                                                                                   // 32
      hasUpdatedField: true,                                                                                           // 33
      updatedFieldName: 'updatedAt'                                                                                    // 34
    }                                                                                                                  //
  },                                                                                                                   //
  methods: {                                                                                                           // 37
    belongsToUser: function () {                                                                                       // 38
      function belongsToUser(userId) {                                                                                 //
        return this.userId === userId;                                                                                 // 39
      }                                                                                                                //
                                                                                                                       //
      return belongsToUser;                                                                                            //
    }()                                                                                                                //
  }                                                                                                                    //
});                                                                                                                    //
exports['default'] = Notification;                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"section.js":["meteor/jagi:astronomy","./collections",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/section.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
var _jagiAstronomy = require('meteor/jagi:astronomy');                                                                 // 1
                                                                                                                       //
var _collections = require('./collections');                                                                           // 2
                                                                                                                       //
var Section = _jagiAstronomy.Astro.Class({                                                                             // 4
  name: 'Section',                                                                                                     // 5
  collection: _collections.Sections,                                                                                   // 6
  fields: {                                                                                                            // 7
    noteId: {                                                                                                          // 8
      type: 'string'                                                                                                   // 9
    },                                                                                                                 //
    text: {                                                                                                            // 11
      type: 'string',                                                                                                  // 12
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return '<p><br></p>';                                                                                        // 13
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }() // Without <br>, the user won't be able to edit on click.                                                    //
                                                                                                                       // 11
    },                                                                                                                 //
    editingByUserId: {                                                                                                 // 15
      type: 'string',                                                                                                  // 16
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return null;                                                                                                 // 17
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    unlocksAt: {                                                                                                       // 19
      type: 'date',                                                                                                    // 20
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return new Date(0);                                                                                          // 21
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    }                                                                                                                  //
  },                                                                                                                   //
  behaviors: {                                                                                                         // 24
    timestamp: {                                                                                                       // 25
      hasCreatedField: true,                                                                                           // 26
      createdFieldName: 'createdAt',                                                                                   // 27
      hasUpdatedField: true,                                                                                           // 28
      updatedFieldName: 'updatedAt'                                                                                    // 29
    }                                                                                                                  //
  },                                                                                                                   //
  methods: {                                                                                                           // 32
    canEdit: function () {                                                                                             // 33
      function canEdit(userId) {                                                                                       //
        return this.editingByUserId === userId || Date.now() > this.unlocksAt;                                         // 34
      }                                                                                                                //
                                                                                                                       //
      return canEdit;                                                                                                  //
    }(),                                                                                                               //
    isUserEditing: function () {                                                                                       // 37
      function isUserEditing(userId) {                                                                                 //
        return this.editingByUserId === userId && Date.now() < this.unlocksAt;                                         // 38
      }                                                                                                                //
                                                                                                                       //
      return isUserEditing;                                                                                            //
    }()                                                                                                                //
  }                                                                                                                    //
});                                                                                                                    //
exports['default'] = Section;                                                                                          //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"team.js":["meteor/meteor","meteor/jagi:astronomy","./collections","ramda","meteor/alanning:roles",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/team.js                                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 1
                                                                                                                       //
var _jagiAstronomy = require('meteor/jagi:astronomy');                                                                 // 2
                                                                                                                       //
var _collections = require('./collections');                                                                           // 3
                                                                                                                       //
var _ramda = require('ramda');                                                                                         // 4
                                                                                                                       //
var _ramda2 = _interopRequireDefault(_ramda);                                                                          //
                                                                                                                       //
var _alanningRoles = require('meteor/alanning:roles');                                                                 // 5
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
                                                                                                                       //
var Team = _jagiAstronomy.Astro.Class({                                                                                // 7
  name: 'Team',                                                                                                        // 8
  collection: _collections.Teams,                                                                                      // 9
  fields: {                                                                                                            // 10
    name: {                                                                                                            // 11
      type: 'string',                                                                                                  // 12
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return 'Default Team';                                                                                       // 13
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    userIds: {                                                                                                         // 15
      type: 'array',                                                                                                   // 16
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return [];                                                                                                   // 17
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    info: {                                                                                                            // 19
      type: 'string',                                                                                                  // 20
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return 'Give your team members some information about what the team is about.';                              // 21
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    }                                                                                                                  //
  },                                                                                                                   //
  behaviors: {                                                                                                         // 24
    timestamp: {                                                                                                       // 25
      hasCreatedField: true,                                                                                           // 26
      createdFieldName: 'createdAt',                                                                                   // 27
      hasUpdatedField: true,                                                                                           // 28
      updatedFieldName: 'updatedAt'                                                                                    // 29
    }                                                                                                                  //
  },                                                                                                                   //
  methods: {                                                                                                           // 32
    isUserInTeam: function () {                                                                                        // 33
      function isUserInTeam(input) {                                                                                   //
        var userIds = input.constructor === Array ? input : [input];                                                   // 34
        return _ramda2['default'].intersection(userIds, this.userIds).length === userIds.length;                       // 35
      }                                                                                                                //
                                                                                                                       //
      return isUserInTeam;                                                                                             //
    }(),                                                                                                               //
    isUserAdmin: function () {                                                                                         // 37
      function isUserAdmin(userId) {                                                                                   //
        return _alanningRoles.Roles.userIsInRole(userId, 'admin', this._id);                                           // 38
      }                                                                                                                //
                                                                                                                       //
      return isUserAdmin;                                                                                              //
    }(),                                                                                                               //
    isUserMember: function () {                                                                                        // 40
      function isUserMember(userId) {                                                                                  //
        return _alanningRoles.Roles.userIsInRole(userId, 'admin', this._id) || _alanningRoles.Roles.userIsInRole(userId, 'member', this._id);
      }                                                                                                                //
                                                                                                                       //
      return isUserMember;                                                                                             //
    }(),                                                                                                               //
    getRolesForUser: function () {                                                                                     // 44
      function getRolesForUser(userId) {                                                                               //
        return _alanningRoles.Roles.getRolesForUser(userId, this._id);                                                 // 45
      }                                                                                                                //
                                                                                                                       //
      return getRolesForUser;                                                                                          //
    }()                                                                                                                //
  }                                                                                                                    //
});                                                                                                                    //
// Meteor toys is basically the server, can see the server only fields too                                             //
// but if you do console log on client, won't see it.                                                                  //
if (_meteor.Meteor.isServer) {                                                                                         // 51
  Team.extend({                                                                                                        // 52
    fields: {                                                                                                          // 53
      serverOnly: {                                                                                                    // 54
        type: 'string',                                                                                                // 55
        'default': function () {                                                                                       //
          function _default() {                                                                                        //
            return 'Only server guys can read this.';                                                                  // 56
          }                                                                                                            //
                                                                                                                       //
          return _default;                                                                                             //
        }()                                                                                                            //
      }                                                                                                                //
    }                                                                                                                  //
  });                                                                                                                  //
}                                                                                                                      //
exports['default'] = Team;                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"translation.js":["meteor/jagi:astronomy","./collections",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/translation.js                                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
var _jagiAstronomy = require('meteor/jagi:astronomy');                                                                 // 1
                                                                                                                       //
var _collections = require('./collections');                                                                           // 2
                                                                                                                       //
var Translation = _jagiAstronomy.Astro.Class({                                                                         // 4
  name: 'Translation',                                                                                                 // 5
  collection: _collections.Translations,                                                                               // 6
  fields: {                                                                                                            // 7
    msgId: {                                                                                                           // 8
      type: 'string'                                                                                                   // 9
    },                                                                                                                 //
    convoId: {                                                                                                         // 11
      type: 'string'                                                                                                   // 12
    },                                                                                                                 //
    langCode: {                                                                                                        // 14
      type: 'string'                                                                                                   // 15
    },                                                                                                                 //
    text: {                                                                                                            // 17
      type: 'string'                                                                                                   // 18
    }                                                                                                                  //
  },                                                                                                                   //
  behaviors: {                                                                                                         // 21
    timestamp: {                                                                                                       // 22
      hasCreatedField: true,                                                                                           // 23
      createdFieldName: 'createdAt',                                                                                   // 24
      hasUpdatedField: true,                                                                                           // 25
      updatedFieldName: 'updatedAt'                                                                                    // 26
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    //
exports['default'] = Translation;                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"widget.js":["meteor/jagi:astronomy","./collections",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/widget.js                                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
var _jagiAstronomy = require('meteor/jagi:astronomy');                                                                 // 1
                                                                                                                       //
var _collections = require('./collections');                                                                           // 2
                                                                                                                       //
var Widget = _jagiAstronomy.Astro.Class({                                                                              // 4
  name: 'Widget',                                                                                                      // 5
  collection: _collections.Widgets,                                                                                    // 6
  fields: {                                                                                                            // 7
    noteId: {                                                                                                          // 8
      type: 'string'                                                                                                   // 9
    },                                                                                                                 //
    type: {                                                                                                            // 11
      type: 'string',                                                                                                  // 12
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return null;                                                                                                 // 13
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    },                                                                                                                 //
    data: {                                                                                                            // 15
      type: 'object',                                                                                                  // 16
      'default': function () {                                                                                         //
        function _default() {                                                                                          //
          return null;                                                                                                 // 17
        }                                                                                                              //
                                                                                                                       //
        return _default;                                                                                               //
      }()                                                                                                              //
    }                                                                                                                  //
  },                                                                                                                   //
  behaviors: {                                                                                                         // 20
    timestamp: {                                                                                                       // 21
      hasCreatedField: true,                                                                                           // 22
      createdFieldName: 'createdAt',                                                                                   // 23
      hasUpdatedField: true,                                                                                           // 24
      updatedFieldName: 'updatedAt'                                                                                    // 25
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    //
exports['default'] = Widget;                                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"server":{"methods":{"_myTest.js":["../../lib/collections","/lib/team","meteor/meteor","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/methods/_myTest.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  _meteor.Meteor.methods({                                                                                             // 11
    '_makeFakeConvo': function () {                                                                                    // 12
      function _makeFakeConvo(teamId, num) {                                                                           //
        (0, _check.check)(teamId, String);                                                                             // 13
        (0, _check.check)(num, Number);                                                                                // 14
        var convoId = _meteor.Meteor.call('convos.add', { name: 'fake convo', userIds: [], teamId: teamId });          // 15
        for (var i = 1; i <= num; i++) {                                                                               // 16
          _meteor.Meteor.call('msgs.add', { text: '' + i, convoId: convoId });                                         // 17
        }                                                                                                              //
      }                                                                                                                //
                                                                                                                       //
      return _makeFakeConvo;                                                                                           //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  _meteor.Meteor.methods({                                                                                             // 22
    '_wipeDbAndInitialize': function () {                                                                              // 23
      function _wipeDbAndInitialize() {                                                                                //
        _meteor.Meteor.users.remove({});                                                                               // 24
        _collections.Teams.remove({});                                                                                 // 25
        _collections.Convos.remove({});                                                                                // 26
        _collections.Messages.remove({});                                                                              // 27
        _collections.Notes.remove({});                                                                                 // 28
        _collections.Sections.remove({});                                                                              // 29
        _collections.Notifications.remove({});                                                                         // 30
        _collections.Invites.remove({});                                                                               // 31
        _collections.Translations.remove({});                                                                          // 32
        _collections.Widgets.remove({});                                                                               // 33
        _collections.Locks.remove({});                                                                                 // 34
                                                                                                                       //
        var langCode = 'en';                                                                                           // 36
                                                                                                                       //
        var userId = Accounts.createUser({                                                                             // 38
          email: 'test@test.com',                                                                                      // 39
          username: 'test',                                                                                            // 40
          password: '1'                                                                                                // 41
        });                                                                                                            //
        _meteor.Meteor.users.update(userId, {                                                                          // 43
          $set: { translationLangCode: langCode }                                                                      // 44
        });                                                                                                            //
                                                                                                                       //
        var userId2 = Accounts.createUser({                                                                            // 47
          email: 'invite@test.com',                                                                                    // 48
          username: 'invite',                                                                                          // 49
          password: '1'                                                                                                // 50
        });                                                                                                            //
        _meteor.Meteor.users.update(userId2, {                                                                         // 52
          $set: { translationLangCode: langCode }                                                                      // 53
        });                                                                                                            //
                                                                                                                       //
        var userId3 = Accounts.createUser({                                                                            // 56
          email: 'invite2@test.com',                                                                                   // 57
          username: 'invite2',                                                                                         // 58
          password: '1'                                                                                                // 59
        });                                                                                                            //
        _meteor.Meteor.users.update(userId3, {                                                                         // 61
          $set: { translationLangCode: langCode }                                                                      // 62
        });                                                                                                            //
                                                                                                                       //
        var team = new _team2['default']();                                                                            // 65
        team.set({ name: 'my cool team', userIds: [userId, userId2, userId3] });                                       // 66
        team.save();                                                                                                   // 67
                                                                                                                       //
        Roles.addUsersToRoles(userId, ['admin'], team._id);                                                            // 69
        Roles.addUsersToRoles([userId2, userId3], ['member'], team._id);                                               // 70
      }                                                                                                                //
                                                                                                                       //
      return _wipeDbAndInitialize;                                                                                     //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  _meteor.Meteor.methods({                                                                                             // 74
    'posts.create': function () {                                                                                      // 75
      function postsCreate(_id, title, content) {                                                                      //
        (0, _check.check)(_id, String);                                                                                // 76
        (0, _check.check)(title, String);                                                                              // 77
        (0, _check.check)(content, String);                                                                            // 78
                                                                                                                       //
        // Show the latency compensations                                                                              //
        _meteor.Meteor._sleepForMs(3000);                                                                              // 75
                                                                                                                       //
        // XXX: Do some user authorization                                                                             //
        var createdAt = new Date();                                                                                    // 75
        var post = { _id: _id, title: title, content: content, createdAt: createdAt };                                 // 85
        _collections.Posts.insert(post);                                                                               // 86
      }                                                                                                                //
                                                                                                                       //
      return postsCreate;                                                                                              //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  _meteor.Meteor.methods({                                                                                             // 90
    'posts.createComment': function () {                                                                               // 91
      function postsCreateComment(_id, postId, text) {                                                                 //
        (0, _check.check)(_id, String);                                                                                // 92
        (0, _check.check)(postId, String);                                                                             // 93
        (0, _check.check)(text, String);                                                                               // 94
                                                                                                                       //
        // Show the latency compensations                                                                              //
        _meteor.Meteor._sleepForMs(3000);                                                                              // 91
                                                                                                                       //
        // XXX: Do some user authorization                                                                             //
        var createdAt = new Date();                                                                                    // 91
        var author = 'The User';                                                                                       // 101
        var comment = { _id: _id, postId: postId, author: author, text: text, createdAt: createdAt };                  // 102
        _collections.Comments.insert(comment);                                                                         // 103
      }                                                                                                                //
                                                                                                                       //
      return postsCreateComment;                                                                                       //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var ACCOUNT_REGISTER = 'test.register';                                                                              // 107
  _meteor.Meteor.methods({                                                                                             // 108
    'test.register': function () {                                                                                     // 109
      function testRegister(_ref) {                                                                                    //
        var email = _ref.email;                                                                                        //
        var username = _ref.username;                                                                                  //
        var password = _ref.password;                                                                                  //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 110
          email: String,                                                                                               // 111
          username: String,                                                                                            // 112
          password: String                                                                                             // 113
        });                                                                                                            //
                                                                                                                       //
        function create(reject) {                                                                                      // 116
          try {                                                                                                        // 117
            console.log('create');                                                                                     // 118
            var userId = Accounts.createUser({ username: username, email: email, password: password });                // 119
          } catch (e) {                                                                                                //
            reject(e);                                                                                                 // 122
          }                                                                                                            //
        }                                                                                                              //
                                                                                                                       //
        function someTask() {                                                                                          // 126
          console.log('someTask');                                                                                     // 127
        }                                                                                                              //
                                                                                                                       //
        function longReject(reject) {                                                                                  // 130
          console.log('longReject start');                                                                             // 131
          try {                                                                                                        // 132
            _meteor.Meteor._sleepForMs(3000);                                                                          // 133
            throw new _meteor.Meteor.Error(ACCOUNT_REGISTER, 'long reject end meteor error');                          // 134
                                                                                                                       //
            // Doesn't work                                                                                            //
            // Meteor.setTimeout(() => {                                                                               //
            //   throw new Meteor.Error(ACCOUNT_REGISTER, 'long reject end meteor error');                             //
            // }, 3000);                                                                                               //
          } catch (e) {                                                                                                // 132
            reject({ reason: 'long reject end' });                                                                     // 142
          }                                                                                                            //
        }                                                                                                              //
                                                                                                                       //
        function someTask2() {                                                                                         // 146
          console.log('someTask2');                                                                                    // 147
        }                                                                                                              //
                                                                                                                       //
        return new Promise(function (resolve, reject) {                                                                // 150
          // Everything will run, if something fails, that error will be sent back to client                           //
          create(reject);                                                                                              // 152
          someTask();                                                                                                  // 153
          longReject(reject);                                                                                          // 154
          someTask2();                                                                                                 // 155
          resolve('Welcome ' + username + '!');                                                                        // 156
        }).then(function (res) {                                                                                       //
          return res;                                                                                                  //
        })['catch'](function (err) {                                                                                   //
          console.log(err);                                                                                            // 160
          throw new _meteor.Meteor.Error(ACCOUNT_REGISTER, err.reason); // Sent back to client                         // 161
        });                                                                                                            // 159
      }                                                                                                                //
                                                                                                                       //
      return testRegister;                                                                                             //
    }()                                                                                                                //
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _collections = require('../../lib/collections');                                                                   // 1
                                                                                                                       //
var _team = require('/lib/team');                                                                                      // 6
                                                                                                                       //
var _team2 = _interopRequireDefault(_team);                                                                            //
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 7
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 8
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"account.js":["meteor/meteor","/lib/collections","/lib/team","/lib/convo","meteor/check","meteor/random","meteor/alanning:roles","ramda","email-validator","meteor/lepozepo:cloudinary",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/methods/account.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
                                                                                                                       //
  var ACCOUNT_REGISTER_TEAM = 'account.register.createTeam';                                                           // 14
  _meteor.Meteor.methods({                                                                                             // 15
    'account.register.createTeam': function () {                                                                       // 16
      function accountRegisterCreateTeam(_ref) {                                                                       //
        var teamName = _ref.teamName;                                                                                  //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 17
          teamName: String                                                                                             // 18
        });                                                                                                            //
                                                                                                                       //
        // Account creation called from client side, so user is logged in already.                                     //
        var userId = this.userId;                                                                                      // 16
        if (!userId) {                                                                                                 // 23
          throw new _meteor.Meteor.Error(ACCOUNT_REGISTER_TEAM, 'Must be logged in to create team.');                  // 24
        }                                                                                                              //
        _meteor.Meteor.call('account.setTranslationLanguage', { langCode: 'en' });                                     // 26
                                                                                                                       //
        // Add users to team and set roles                                                                             //
        var team = new _team2['default']();                                                                            // 16
        team.set({                                                                                                     // 30
          name: teamName,                                                                                              // 31
          userIds: [userId]                                                                                            // 32
        });                                                                                                            //
        team.save();                                                                                                   // 34
        _alanningRoles.Roles.addUsersToRoles(userId, ['admin'], team._id);                                             // 35
                                                                                                                       //
        return { teamId: team._id };                                                                                   // 37
      }                                                                                                                //
                                                                                                                       //
      return accountRegisterCreateTeam;                                                                                //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var ACCOUNT_REGISTER_TEAM_CONVO = 'account.register.createTeamAndConvo';                                             // 41
  _meteor.Meteor.methods({                                                                                             // 42
    'account.register.createTeamAndConvo': function () {                                                               // 43
      function accountRegisterCreateTeamAndConvo(_ref2) {                                                              //
        var teamName = _ref2.teamName;                                                                                 //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 44
          teamName: String                                                                                             // 45
        });                                                                                                            //
                                                                                                                       //
        // Account creation called from client side, so user is logged in already.                                     //
        var userId = this.userId;                                                                                      // 43
        if (!userId) {                                                                                                 // 50
          throw new _meteor.Meteor.Error(ACCOUNT_REGISTER_TEAM_CONVO, 'Must be logged in to create team and convo.');  // 51
        }                                                                                                              //
        _meteor.Meteor.call('account.setTranslationLanguage', { langCode: 'en' });                                     // 53
                                                                                                                       //
        // Add users to team and set roles                                                                             //
        var team = new _team2['default']();                                                                            // 43
        team.set({                                                                                                     // 57
          name: teamName,                                                                                              // 58
          userIds: [userId]                                                                                            // 59
        });                                                                                                            //
        team.save();                                                                                                   // 61
        _alanningRoles.Roles.addUsersToRoles(userId, ['admin'], team._id);                                             // 62
                                                                                                                       //
        var convoId = _meteor.Meteor.call('convos.add', {                                                              // 64
          name: 'Your first chat!',                                                                                    // 65
          userIds: [userId],                                                                                           // 66
          teamId: team._id });                                                                                         // 67
                                                                                                                       //
        return { teamId: team._id, convoId: convoId };                                                                 // 70
      }                                                                                                                //
                                                                                                                       //
      return accountRegisterCreateTeamAndConvo;                                                                        //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var ACCOUNT_REGISTER_NO_PWD = 'account.register.noPassword';                                                         // 74
  _meteor.Meteor.methods({                                                                                             // 75
    'account.register.noPassword': function () {                                                                       // 76
      function accountRegisterNoPassword(_ref3) {                                                                      //
        var email = _ref3.email;                                                                                       //
        var username = _ref3.username;                                                                                 //
        var teamName = _ref3.teamName;                                                                                 //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 77
          email: String,                                                                                               // 78
          username: String,                                                                                            // 79
          teamName: String                                                                                             // 80
        });                                                                                                            //
        _meteor.Meteor.call(ACCOUNT_VALIDATE_EMAIL, { email: email });                                                 // 82
        _meteor.Meteor.call(ACCOUNT_VALIDATE_USERNAME, { username: username });                                        // 83
        _meteor.Meteor.call(ACCOUNT_VALIDATE_TEAMNAME, { teamName: teamName });                                        // 84
                                                                                                                       //
        var password = _random.Random.secret(15);                                                                      // 86
        var userId = Accounts.createUser({ username: username, email: email, password: password });                    // 87
        _meteor.Meteor.users.update(userId, { $set: { isRegistering: true } });                                        // 88
                                                                                                                       //
        // Add users to team and set roles                                                                             //
        var team = new _team2['default']();                                                                            // 76
        team.set({                                                                                                     // 92
          name: teamName,                                                                                              // 93
          userIds: [userId]                                                                                            // 94
        });                                                                                                            //
        team.save();                                                                                                   // 96
        _alanningRoles.Roles.addUsersToRoles(userId, ['admin'], team._id);                                             // 97
        Accounts.sendResetPasswordEmail(userId);                                                                       // 98
                                                                                                                       //
        return { password: password, teamId: team._id };                                                               // 100
      }                                                                                                                //
                                                                                                                       //
      return accountRegisterNoPassword;                                                                                //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var ACCOUNT_LAST_TIME_CONVO = 'account.setLastTimeInConvo';                                                          // 104
  _meteor.Meteor.methods({                                                                                             // 105
    'account.setLastTimeInConvo': function () {                                                                        // 106
      function accountSetLastTimeInConvo(_ref4) {                                                                      //
        var convoId = _ref4.convoId;                                                                                   //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 107
          convoId: String                                                                                              // 108
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 111
        if (!userId) {                                                                                                 // 112
          throw new _meteor.Meteor.Error(ACCOUNT_LAST_TIME_CONVO, 'Must be logged in to set last time in convo.');     // 113
        }                                                                                                              //
        var convo = _collections.Convos.findOne(convoId);                                                              // 115
        if (!convo) {                                                                                                  // 116
          throw new _meteor.Meteor.Error(ACCOUNT_LAST_TIME_CONVO, 'Must set last time in an existing convo.');         // 117
        }                                                                                                              //
        if (!convo.isUserInConvo(userId)) {                                                                            // 119
          throw new _meteor.Meteor.Error(ACCOUNT_LAST_TIME_CONVO, 'Must be member of convo to set last time in it.');  // 120
        }                                                                                                              //
                                                                                                                       //
        var setObj = {};                                                                                               // 123
        setObj['lastTimeInConvo.' + convoId] = {                                                                       // 124
          timestamp: new Date(),                                                                                       // 125
          numMsgs: _collections.Messages.find({ convoId: convoId }).count()                                            // 126
        };                                                                                                             //
        var modifier = { $set: setObj };                                                                               // 128
        _meteor.Meteor.users.update(userId, modifier);                                                                 // 129
      }                                                                                                                //
                                                                                                                       //
      return accountSetLastTimeInConvo;                                                                                //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var ACCOUNT_LAST_TIME_TEAM = 'account.setLastTimeInTeam';                                                            // 133
  _meteor.Meteor.methods({                                                                                             // 134
    'account.setLastTimeInTeam': function () {                                                                         // 135
      function accountSetLastTimeInTeam(_ref5) {                                                                       //
        var teamId = _ref5.teamId;                                                                                     //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 136
          teamId: String                                                                                               // 137
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 140
        if (!userId) {                                                                                                 // 141
          throw new _meteor.Meteor.Error(ACCOUNT_LAST_TIME_TEAM, 'Must be logged in to set last time in team.');       // 142
        }                                                                                                              //
        var team = _collections.Teams.findOne(teamId);                                                                 // 144
        if (!team) {                                                                                                   // 145
          throw new _meteor.Meteor.Error(ACCOUNT_LAST_TIME_TEAM, 'Must set last time in an existing team.');           // 146
        }                                                                                                              //
        if (!team.isUserInTeam(userId)) {                                                                              // 148
          throw new _meteor.Meteor.Error(ACCOUNT_LAST_TIME_TEAM, 'Must be member of team to set last time in it.');    // 149
        }                                                                                                              //
                                                                                                                       //
        var setObj = {};                                                                                               // 152
        setObj['lastTimeInTeam.' + teamId] = new Date();                                                               // 153
        var modifier = { $set: setObj };                                                                               // 154
        _meteor.Meteor.users.update(userId, modifier);                                                                 // 155
      }                                                                                                                //
                                                                                                                       //
      return accountSetLastTimeInTeam;                                                                                 //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var ACCOUNT_VALIDATE_EMAIL = 'account.validateEmail';                                                                // 159
  _meteor.Meteor.methods({                                                                                             // 160
    'account.validateEmail': function () {                                                                             // 161
      function accountValidateEmail(_ref6) {                                                                           //
        var email = _ref6.email;                                                                                       //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 162
          email: String                                                                                                // 163
        });                                                                                                            //
        if (!_emailValidator2['default'].validate(email)) {                                                            // 165
          throw new _meteor.Meteor.Error(ACCOUNT_VALIDATE_EMAIL, 'Please enter a proper email.');                      // 166
        }                                                                                                              //
        var user = Accounts.findUserByEmail(email);                                                                    // 168
        if (user) {                                                                                                    // 169
          throw new _meteor.Meteor.Error(ACCOUNT_VALIDATE_EMAIL, 'The email ' + email + ' is taken. Please enter another one.');
        }                                                                                                              //
      }                                                                                                                //
                                                                                                                       //
      return accountValidateEmail;                                                                                     //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var ACCOUNT_VALIDATE_USERNAME = 'account.validateUsername';                                                          // 176
  _meteor.Meteor.methods({                                                                                             // 177
    'account.validateUsername': function () {                                                                          // 178
      function accountValidateUsername(_ref7) {                                                                        //
        var username = _ref7.username;                                                                                 //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 179
          username: String                                                                                             // 180
        });                                                                                                            //
                                                                                                                       //
        var nameTrim = username.trim();                                                                                // 183
        if (nameTrim === '') {                                                                                         // 184
          throw new _meteor.Meteor.Error(ACCOUNT_VALIDATE_USERNAME, 'Please enter a non-blank username.');             // 185
        }                                                                                                              //
        var user = Accounts.findUserByUsername(username);                                                              // 188
        if (user) {                                                                                                    // 189
          throw new _meteor.Meteor.Error(ACCOUNT_VALIDATE_USERNAME, 'The username ' + username + ' is taken. Please enter another one.');
        }                                                                                                              //
      }                                                                                                                //
                                                                                                                       //
      return accountValidateUsername;                                                                                  //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var ACCOUNT_VALIDATE_TEAMNAME = 'account.validateTeamName';                                                          // 196
  _meteor.Meteor.methods({                                                                                             // 197
    'account.validateTeamName': function () {                                                                          // 198
      function accountValidateTeamName(_ref8) {                                                                        //
        var teamName = _ref8.teamName;                                                                                 //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 199
          teamName: String                                                                                             // 200
        });                                                                                                            //
                                                                                                                       //
        var nameTrim = teamName.trim();                                                                                // 203
        if (nameTrim === '') {                                                                                         // 204
          throw new _meteor.Meteor.Error(ACCOUNT_VALIDATE_USERNAME, 'Please enter a non-blank username.');             // 205
        }                                                                                                              //
      }                                                                                                                //
                                                                                                                       //
      return accountValidateTeamName;                                                                                  //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var ACCOUNT_VALIDATE_PASSWORD = 'account.validatePassword';                                                          // 210
  _meteor.Meteor.methods({                                                                                             // 211
    'account.validatePassword': function () {                                                                          // 212
      function accountValidatePassword(_ref9) {                                                                        //
        var password = _ref9.password;                                                                                 //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 213
          password: String                                                                                             // 214
        });                                                                                                            //
                                                                                                                       //
        var trimPwd = password.trim();                                                                                 // 217
        if (trimPwd === '') {                                                                                          // 218
          throw new _meteor.Meteor.Error(ACCOUNT_VALIDATE_PASSWORD, 'Please enter a non-blank password.');             // 219
        }                                                                                                              //
                                                                                                                       //
        // Other things we want to validate...                                                                         //
      }                                                                                                                // 212
                                                                                                                       //
      return accountValidatePassword;                                                                                  //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var ACCOUNT_FIND_MY_TEAM = 'account.findMyTeam';                                                                     // 226
  _meteor.Meteor.methods({                                                                                             // 227
    'account.findMyTeam': function () {                                                                                // 228
      function accountFindMyTeam(_ref10) {                                                                             //
        var email = _ref10.email;                                                                                      //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 229
          email: String                                                                                                // 230
        });                                                                                                            //
                                                                                                                       //
        if (!_emailValidator2['default'].validate(email)) {                                                            // 233
          throw new _meteor.Meteor.Error(ACCOUNT_FIND_MY_TEAM, 'Enter a proper email.');                               // 234
        }                                                                                                              //
        var existingUser = Accounts.findUserByEmail(email);                                                            // 236
        if (!existingUser) {                                                                                           // 237
          throw new _meteor.Meteor.Error(ACCOUNT_FIND_MY_TEAM, 'No teams found for ' + email + '. Create an account');
        }                                                                                                              //
                                                                                                                       //
        _meteor.Meteor.users.update(existingUser._id, {                                                                // 242
          $set: { findingMyTeam: true }                                                                                // 243
        });                                                                                                            //
        Accounts.sendEnrollmentEmail(existingUser._id);                                                                // 245
      }                                                                                                                //
                                                                                                                       //
      return accountFindMyTeam;                                                                                        //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var ACCOUNT_PROFILE_PIC = 'account.addProfilePic';                                                                   // 249
  _meteor.Meteor.methods({                                                                                             // 250
    'account.addProfilePic': function () {                                                                             // 251
      function accountAddProfilePic(_ref11) {                                                                          //
        var cloudinaryPublicId = _ref11.cloudinaryPublicId;                                                            //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 252
          cloudinaryPublicId: String                                                                                   // 253
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 256
        if (!userId) {                                                                                                 // 257
          throw new _meteor.Meteor.Error(ACCOUNT_PROFILE_PIC, 'Must be logged in to change profile picture.');         // 258
        }                                                                                                              //
        if (_ramda2['default'].isEmpty(cloudinaryPublicId)) {                                                          // 260
          throw new _meteor.Meteor.Error(ACCOUNT_PROFILE_PIC, 'cloudinaryPublicId cannot be an empty string.');        // 261
        }                                                                                                              //
                                                                                                                       //
        _meteor.Meteor.users.update(userId, {                                                                          // 266
          $set: { profileImageUrl: _lepozepoCloudinary.Cloudinary.url(cloudinaryPublicId) }                            // 267
        });                                                                                                            //
      }                                                                                                                //
                                                                                                                       //
      return accountAddProfilePic;                                                                                     //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var ACCOUNT_SET_USERNAME = 'account.setUsername';                                                                    // 272
  _meteor.Meteor.methods({                                                                                             // 273
    'account.setUsername': function () {                                                                               // 274
      function accountSetUsername(_ref12) {                                                                            //
        var username = _ref12.username;                                                                                //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 275
          username: String                                                                                             // 276
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 279
        if (!userId) {                                                                                                 // 280
          throw new _meteor.Meteor.Error(ACCOUNT_SET_USERNAME, 'Must be logged in to change username.');               // 281
        }                                                                                                              //
        _meteor.Meteor.call('account.validateUsername', { username: username });                                       // 283
        Accounts.setUsername(userId, username);                                                                        // 284
      }                                                                                                                //
                                                                                                                       //
      return accountSetUsername;                                                                                       //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var ACCOUNT_SET_EMAIL = 'account.setEmail';                                                                          // 288
  _meteor.Meteor.methods({                                                                                             // 289
    'account.setEmail': function () {                                                                                  // 290
      function accountSetEmail(_ref13) {                                                                               //
        var email = _ref13.email;                                                                                      //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 291
          email: String                                                                                                // 292
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 295
        if (!userId) {                                                                                                 // 296
          throw new _meteor.Meteor.Error(ACCOUNT_SET_EMAIL, 'Must be logged in to change email.');                     // 297
        }                                                                                                              //
        var user = _meteor.Meteor.users.findOne(userId);                                                               // 299
        _meteor.Meteor.call('account.validateEmail', { email: email });                                                // 300
        Accounts.removeEmail(userId, user.emails[0].address);                                                          // 301
        Accounts.addEmail(userId, email); // This does not check for proper email form, only existence in DB           // 302
      }                                                                                                                // 290
                                                                                                                       //
      return accountSetEmail;                                                                                          //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var ACCOUNT_SET_TRANSLATION_LANG = 'account.setTranslationLanguage';                                                 // 306
  _meteor.Meteor.methods({                                                                                             // 307
    'account.setTranslationLanguage': function () {                                                                    // 308
      function accountSetTranslationLanguage(_ref14) {                                                                 //
        var langCode = _ref14.langCode;                                                                                //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 309
          langCode: String                                                                                             // 310
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 313
        if (!userId) {                                                                                                 // 314
          throw new _meteor.Meteor.Error(ACCOUNT_SET_TRANSLATION_LANG, 'Must be logged in to change translation language.');
        }                                                                                                              //
        _meteor.Meteor.users.update(userId, {                                                                          // 318
          $set: { translationLangCode: langCode }                                                                      // 319
        });                                                                                                            //
      }                                                                                                                //
                                                                                                                       //
      return accountSetTranslationLanguage;                                                                            //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  // SERVER ONLY                                                                                                       //
  var ACCOUNT_REMOVE_FROM_TEAM = 'account.removeFromTeam';                                                             // 12
  _meteor.Meteor.methods({                                                                                             // 326
    'account.removeFromTeam': function () {                                                                            // 327
      function accountRemoveFromTeam(_ref15) {                                                                         //
        var _R$merge;                                                                                                  //
                                                                                                                       //
        var removeUserId = _ref15.removeUserId;                                                                        //
        var teamId = _ref15.teamId;                                                                                    //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 328
          removeUserId: String,                                                                                        // 329
          teamId: String                                                                                               // 330
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 333
        if (!userId) {                                                                                                 // 334
          throw new _meteor.Meteor.Error(ACCOUNT_REMOVE_FROM_TEAM, 'Must be logged in to remove user from team.');     // 335
        }                                                                                                              //
        var team = _collections.Teams.findOne(teamId);                                                                 // 337
        if (!team) {                                                                                                   // 338
          throw new _meteor.Meteor.Error(ACCOUNT_REMOVE_FROM_TEAM, 'Must remove user from existing team.');            // 339
        }                                                                                                              //
        if (!team.isUserAdmin(userId)) {                                                                               // 341
          throw new _meteor.Meteor.Error(ACCOUNT_REMOVE_FROM_TEAM, 'Must be an admin to remove user from team.');      // 342
        }                                                                                                              //
                                                                                                                       //
        var convos = _collections.Convos.find({ teamId: teamId }).fetch();                                             // 345
        var convoIdsToUnset = convos.reduce(function (prev, curr) {                                                    // 346
          var _convo;                                                                                                  //
                                                                                                                       //
          var convo = (_convo = {}, _convo['lastTimeInConvo.' + curr._id] = '', _convo);                               // 347
          return _ramda2['default'].merge(prev, convo);                                                                // 350
        }, {});                                                                                                        //
                                                                                                                       //
        var unsetObj = _ramda2['default'].merge((_R$merge = {}, _R$merge['roles.' + teamId] = '', _R$merge['lastTimeInTeam.' + teamId] = '', _R$merge), convoIdsToUnset);
                                                                                                                       //
        _meteor.Meteor.users.update(removeUserId, {                                                                    // 358
          $unset: unsetObj                                                                                             // 359
        });                                                                                                            //
      }                                                                                                                //
                                                                                                                       //
      return accountRemoveFromTeam;                                                                                    //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  // SERVER ONLY                                                                                                       //
  var ACCOUNT_FORGOT_PWD = 'account.forgotPassword';                                                                   // 12
  _meteor.Meteor.methods({                                                                                             // 366
    'account.forgotPassword': function () {                                                                            // 367
      function accountForgotPassword(_ref16) {                                                                         //
        var email = _ref16.email;                                                                                      //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 368
          email: String                                                                                                // 369
        });                                                                                                            //
                                                                                                                       //
        if (!_emailValidator2['default'].validate(email)) {                                                            // 372
          throw new _meteor.Meteor.Error(ACCOUNT_FORGOT_PWD, 'Enter a proper email.');                                 // 373
        }                                                                                                              //
        var existingUser = Accounts.findUserByEmail(email);                                                            // 375
        if (!existingUser) {                                                                                           // 376
          throw new _meteor.Meteor.Error(ACCOUNT_FORGOT_PWD, 'No user found with email: ' + email + '. Create an account.');
        }                                                                                                              //
        Accounts.sendResetPasswordEmail(existingUser._id);                                                             // 380
      }                                                                                                                //
                                                                                                                       //
      return accountForgotPassword;                                                                                    //
    }()                                                                                                                //
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 1
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 2
                                                                                                                       //
var _team = require('/lib/team');                                                                                      // 3
                                                                                                                       //
var _team2 = _interopRequireDefault(_team);                                                                            //
                                                                                                                       //
var _convo2 = require('/lib/convo');                                                                                   // 4
                                                                                                                       //
var _convo3 = _interopRequireDefault(_convo2);                                                                         //
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 5
                                                                                                                       //
var _random = require('meteor/random');                                                                                // 6
                                                                                                                       //
var _alanningRoles = require('meteor/alanning:roles');                                                                 // 7
                                                                                                                       //
var _ramda = require('ramda');                                                                                         // 8
                                                                                                                       //
var _ramda2 = _interopRequireDefault(_ramda);                                                                          //
                                                                                                                       //
var _emailValidator = require('email-validator');                                                                      // 9
                                                                                                                       //
var _emailValidator2 = _interopRequireDefault(_emailValidator);                                                        //
                                                                                                                       //
var _lepozepoCloudinary = require('meteor/lepozepo:cloudinary');                                                       // 10
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"convos.js":["babel-runtime/helpers/toConsumableArray","meteor/meteor","/lib/collections","/lib/convo","/lib/note","/lib/section","meteor/check","ramda",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/methods/convos.js                                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');                                          //
                                                                                                                       //
var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);                                                 //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var CONVOS_ADD = 'convos.add';                                                                                       // 12
  _meteor.Meteor.methods({                                                                                             // 13
    'convos.add': function () {                                                                                        // 14
      function convosAdd(_ref) {                                                                                       //
        var name = _ref.name;                                                                                          //
        var userIds = _ref.userIds;                                                                                    //
        var teamId = _ref.teamId;                                                                                      //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 15
          name: String,                                                                                                // 16
          userIds: [String],                                                                                           // 17
          teamId: String                                                                                               // 18
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 21
        if (!userId) {                                                                                                 // 22
          throw new _meteor.Meteor.Error(CONVOS_ADD, 'Must be logged in to insert convo.');                            // 23
        }                                                                                                              //
        var team = _collections.Teams.findOne(teamId);                                                                 // 25
        if (!team) {                                                                                                   // 26
          throw new _meteor.Meteor.Error(CONVOS_ADD, 'Must add convo to existing team.');                              // 27
        }                                                                                                              //
        if (!team.isUserInTeam(userId)) {                                                                              // 29
          throw new _meteor.Meteor.Error(CONVOS_ADD, 'Must be a member of team to add new convo.');                    // 30
        }                                                                                                              //
        if (!team.isUserInTeam(userIds)) {                                                                             // 32
          throw new _meteor.Meteor.Error(CONVOS_ADD, 'Only users in the team can be added to the convo.');             // 33
        }                                                                                                              //
                                                                                                                       //
        var convo = new _convo2['default']();                                                                          // 36
        var newUserIds = [userId].concat((0, _toConsumableArray3['default'])(userIds));                                // 37
        var uniqueUserIds = _ramda2['default'].uniq(newUserIds);                                                       // 38
        var recentUserIds = _ramda2['default'].takeLast(2, uniqueUserIds);                                             // 39
        var recentUsers = _meteor.Meteor.users.find({ _id: { $in: recentUserIds } }).fetch();                          // 40
        var recentUsernames = recentUsers.map(function (x) {                                                           // 41
          return x.username;                                                                                           //
        });                                                                                                            //
                                                                                                                       //
        convo.set({                                                                                                    // 43
          name: name,                                                                                                  // 44
          userIds: uniqueUserIds,                                                                                      // 45
          recentUserIds: recentUserIds,                                                                                // 46
          recentUsernames: recentUsernames,                                                                            // 47
          teamId: teamId });                                                                                           // 48
        convo.save();                                                                                                  // 49
        var convoId = convo._id;                                                                                       // 50
                                                                                                                       //
        _meteor.Meteor.call('notes.add', { convoId: convoId });                                                        // 52
                                                                                                                       //
        return convoId;                                                                                                // 54
      }                                                                                                                //
                                                                                                                       //
      return convosAdd;                                                                                                //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var CONVOS_ADD_MEMBERS = 'convos.addMembers';                                                                        // 58
  _meteor.Meteor.methods({                                                                                             // 59
    'convos.addMembers': function () {                                                                                 // 60
      function convosAddMembers(_ref2) {                                                                               //
        var convoId = _ref2.convoId;                                                                                   //
        var userIds = _ref2.userIds;                                                                                   //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 61
        (0, _check.check)(arguments[0], {                                                                              // 62
          convoId: String,                                                                                             // 63
          userIds: [String]                                                                                            // 64
        });                                                                                                            //
                                                                                                                       //
        if (!userId) {                                                                                                 // 67
          throw new _meteor.Meteor.Error(CONVOS_ADD_MEMBERS, 'Must be logged in to add members to convo.');            // 68
        }                                                                                                              //
        var convo = _collections.Convos.findOne(convoId);                                                              // 70
        if (!convo) {                                                                                                  // 71
          throw new _meteor.Meteor.Error(CONVOS_ADD_MEMBERS, 'Must add members to an existing convo.');                // 72
        }                                                                                                              //
        if (!convo.isUserInConvo(userId)) {                                                                            // 74
          throw new _meteor.Meteor.Error(CONVOS_ADD_MEMBERS, 'Must already be a member of convo to add new members.');
        }                                                                                                              //
        var team = _collections.Teams.findOne(convo.teamId);                                                           // 78
        if (!team.isUserInTeam(userIds)) {                                                                             // 79
          throw new _meteor.Meteor.Error(CONVOS_ADD_MEMBERS, 'Only users in the team can be added to the convo.');     // 80
        }                                                                                                              //
                                                                                                                       //
        var newUserIds = [].concat((0, _toConsumableArray3['default'])(convo.userIds), (0, _toConsumableArray3['default'])(userIds));
        var uniqueUserIds = _ramda2['default'].uniq(newUserIds);                                                       // 85
        var recentUserIds = _ramda2['default'].takeLast(2, uniqueUserIds);                                             // 86
        var recentUsers = _meteor.Meteor.users.find({ _id: { $in: recentUserIds } }).fetch();                          // 87
        var recentUsernames = recentUsers.map(function (x) {                                                           // 88
          return x.username;                                                                                           //
        });                                                                                                            //
                                                                                                                       //
        convo.set({                                                                                                    // 90
          userIds: uniqueUserIds,                                                                                      // 91
          recentUserIds: recentUserIds,                                                                                // 92
          recentUsernames: recentUsernames                                                                             // 93
        });                                                                                                            //
        convo.save();                                                                                                  // 95
                                                                                                                       //
        return convo;                                                                                                  // 97
      }                                                                                                                //
                                                                                                                       //
      return convosAddMembers;                                                                                         //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  // SERVER ONLY                                                                                                       //
  var CONVOS_REMOVE_USER_FROM_TEAM = 'convos.removeUserFromTeam';                                                      // 11
  _meteor.Meteor.methods({                                                                                             // 103
    'convos.removeUserFromTeam': function () {                                                                         // 104
      function convosRemoveUserFromTeam(_ref3) {                                                                       //
        var removeUserId = _ref3.removeUserId;                                                                         //
        var teamId = _ref3.teamId;                                                                                     //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 105
          removeUserId: String,                                                                                        // 106
          teamId: String                                                                                               // 107
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 110
        if (!userId) {                                                                                                 // 111
          throw new _meteor.Meteor.Error(CONVOS_REMOVE_USER_FROM_TEAM, 'Must be logged in to remove users from convo.');
        }                                                                                                              //
        var team = _collections.Teams.findOne(teamId);                                                                 // 115
        if (!team) {                                                                                                   // 116
          throw new _meteor.Meteor.Error(CONVOS_REMOVE_USER_FROM_TEAM, 'Must remove users from existing team.');       // 117
        }                                                                                                              //
        if (!team.isUserAdmin(userId)) {                                                                               // 120
          throw new _meteor.Meteor.Error(CONVOS_REMOVE_USER_FROM_TEAM, 'Must be an admin to remove users from all convos in team.');
        }                                                                                                              //
                                                                                                                       //
        var convos = _collections.Convos.find({ userIds: removeUserId }).fetch();                                      // 125
        convos.forEach(function (convo) {                                                                              // 126
          convo.set({ userIds: _ramda2['default'].filter(function (id) {                                               // 127
              return id !== removeUserId;                                                                              //
            }, convo.userIds) });                                                                                      //
          convo.save();                                                                                                // 128
        });                                                                                                            //
      }                                                                                                                //
                                                                                                                       //
      return convosRemoveUserFromTeam;                                                                                 //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  // SERVER ONLY                                                                                                       //
  var CONVOS_IS_MEMBER = 'convos.isMember';                                                                            // 11
  _meteor.Meteor.methods({                                                                                             // 135
    'convos.isMember': function () {                                                                                   // 136
      function convosIsMember(_ref4) {                                                                                 //
        var convoId = _ref4.convoId;                                                                                   //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 137
          convoId: String                                                                                              // 138
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 141
        if (!userId) {                                                                                                 // 142
          throw new _meteor.Meteor.Error(CONVOS_IS_MEMBER, 'Must be logged in to view convo.');                        // 143
        }                                                                                                              //
        var convo = _collections.Convos.findOne(convoId);                                                              // 145
        if (!convo) {                                                                                                  // 146
          throw new _meteor.Meteor.Error(CONVOS_IS_MEMBER, 'Must be a member of existing convo.');                     // 147
        }                                                                                                              //
        _meteor.Meteor.call('teams.isMember', { teamId: convo.teamId });                                               // 149
        if (!convo.isUserInConvo(userId)) {                                                                            // 150
          throw new _meteor.Meteor.Error(CONVOS_IS_MEMBER, 'User is not a member of convo.');                          // 151
        }                                                                                                              //
                                                                                                                       //
        return convo.isUserInConvo(userId);                                                                            // 154
      }                                                                                                                //
                                                                                                                       //
      return convosIsMember;                                                                                           //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var CONVOS_SET_NAME = 'convos.setName';                                                                              // 158
  _meteor.Meteor.methods({                                                                                             // 159
    'convos.setName': function () {                                                                                    // 160
      function convosSetName(_ref5) {                                                                                  //
        var convoId = _ref5.convoId;                                                                                   //
        var name = _ref5.name;                                                                                         //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 161
          convoId: String,                                                                                             // 162
          name: String                                                                                                 // 163
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 166
        if (!userId) {                                                                                                 // 167
          throw new _meteor.Meteor.Error(CONVOS_SET_NAME, 'Must be logged in to set chat name.');                      // 168
        }                                                                                                              //
        var convo = _collections.Convos.findOne(convoId);                                                              // 170
        if (!convo) {                                                                                                  // 171
          throw new _meteor.Meteor.Error(CONVOS_SET_NAME, 'Must set the name of an existing chat.');                   // 172
        }                                                                                                              //
        if (!convo.isUserAdmin(userId)) {                                                                              // 174
          throw new _meteor.Meteor.Error(CONVOS_SET_NAME, 'Must be an admin of chat to set the chat name.');           // 175
        }                                                                                                              //
                                                                                                                       //
        convo.set({ name: name });                                                                                     // 178
        convo.save();                                                                                                  // 179
      }                                                                                                                //
                                                                                                                       //
      return convosSetName;                                                                                            //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  // SERVER ONLY                                                                                                       //
  var CONVOS_REMOVE = 'convos.remove';                                                                                 // 11
  _meteor.Meteor.methods({                                                                                             // 185
    'convos.remove': function () {                                                                                     // 186
      function convosRemove(_ref6) {                                                                                   //
        var _unsetObj;                                                                                                 //
                                                                                                                       //
        var convoId = _ref6.convoId;                                                                                   //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 187
          convoId: String                                                                                              // 188
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 191
        if (!userId) {                                                                                                 // 192
          throw new _meteor.Meteor.Error(CONVOS_REMOVE, 'Must be logged in to remove convo.');                         // 193
        }                                                                                                              //
        var convo = _collections.Convos.findOne(convoId);                                                              // 195
        if (!convo) {                                                                                                  // 196
          throw new _meteor.Meteor.Error(CONVOS_REMOVE, 'Must remove an existing convo.');                             // 197
        }                                                                                                              //
        var team = _collections.Teams.findOne(convo.teamId);                                                           // 199
        if (!team) {                                                                                                   // 200
          throw new _meteor.Meteor.Error(CONVOS_REMOVE, 'Must remove a convo from an existing team.');                 // 201
        }                                                                                                              //
        if (!team.isUserAdmin(userId)) {                                                                               // 203
          throw new _meteor.Meteor.Error(CONVOS_REMOVE, 'Must be a team admin to remove a convo.');                    // 204
        }                                                                                                              //
                                                                                                                       //
        // Remove from all convo users last time in convo as well.                                                     //
        var selector = { _id: { $in: convo.userIds } };                                                                // 186
        var unsetObj = (_unsetObj = {}, _unsetObj['lastTimeInConvo.' + convoId] = '', _unsetObj);                      // 209
        var modifier = { $unset: unsetObj };                                                                           // 210
        var options = { multi: true };                                                                                 // 211
        _meteor.Meteor.users.update(selector, modifier, options);                                                      // 212
                                                                                                                       //
        // Remove all associated data for this convo                                                                   //
        _collections.Messages.remove({ convoId: convoId });                                                            // 186
                                                                                                                       //
        var note = _collections.Notes.findOne({ convoId: convoId });                                                   // 217
        _collections.Notes.remove({ convoId: convoId });                                                               // 218
        _collections.Sections.remove({ noteId: note._id });                                                            // 219
                                                                                                                       //
        _collections.Notifications.remove({ convoId: convoId });                                                       // 221
                                                                                                                       //
        // Remove convo                                                                                                //
        convo.remove();                                                                                                // 186
      }                                                                                                                //
                                                                                                                       //
      return convosRemove;                                                                                             //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var CONVOS_LEAVE = 'convos.leave';                                                                                   // 228
  _meteor.Meteor.methods({                                                                                             // 229
    'convos.leave': function () {                                                                                      // 230
      function convosLeave(_ref7) {                                                                                    //
        var _unsetObj2;                                                                                                //
                                                                                                                       //
        var convoId = _ref7.convoId;                                                                                   //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 231
          convoId: String                                                                                              // 232
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 235
        if (!userId) {                                                                                                 // 236
          throw new _meteor.Meteor.Error(CONVOS_LEAVE, 'Must be logged in to leave convo.');                           // 237
        }                                                                                                              //
        var convo = _collections.Convos.findOne(convoId);                                                              // 239
        if (!convo) {                                                                                                  // 240
          throw new _meteor.Meteor.Error(CONVOS_LEAVE, 'Must leave an existing convo.');                               // 241
        }                                                                                                              //
        if (!convo.isUserInConvo(userId)) {                                                                            // 243
          throw new _meteor.Meteor.Error(CONVOS_LEAVE, 'Must leave a convo you are a part of.');                       // 244
        }                                                                                                              //
                                                                                                                       //
        // Update user                                                                                                 //
        var selector = userId;                                                                                         // 230
        var unsetObj = (_unsetObj2 = {}, _unsetObj2['lastTimeInConvo.' + convoId] = '', _unsetObj2);                   // 249
        var modifier = { $unset: unsetObj };                                                                           // 250
        _meteor.Meteor.users.update(selector, modifier);                                                               // 251
                                                                                                                       //
        // Remove id from convo                                                                                        //
        var userIds = convo.userIds;                                                                                   // 230
        convo.set({                                                                                                    // 255
          userIds: _ramda2['default'].filter(function (id) {                                                           // 256
            return id !== userId;                                                                                      //
          }, userIds)                                                                                                  //
        });                                                                                                            //
        convo.save();                                                                                                  // 258
      }                                                                                                                //
                                                                                                                       //
      return convosLeave;                                                                                              //
    }()                                                                                                                //
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 1
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 2
                                                                                                                       //
var _convo = require('/lib/convo');                                                                                    // 5
                                                                                                                       //
var _convo2 = _interopRequireDefault(_convo);                                                                          //
                                                                                                                       //
var _note = require('/lib/note');                                                                                      // 6
                                                                                                                       //
var _note2 = _interopRequireDefault(_note);                                                                            //
                                                                                                                       //
var _section = require('/lib/section');                                                                                // 7
                                                                                                                       //
var _section2 = _interopRequireDefault(_section);                                                                      //
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 8
                                                                                                                       //
var _ramda = require('ramda');                                                                                         // 9
                                                                                                                       //
var _ramda2 = _interopRequireDefault(_ramda);                                                                          //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"images.js":["meteor/meteor",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/methods/images.js                                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  _meteor.Meteor.methods({                                                                                             // 4
    'images.add': function () {                                                                                        // 5
      function imagesAdd() {                                                                                           //
        console.log('cloudinary haha');                                                                                // 6
      }                                                                                                                //
                                                                                                                       //
      return imagesAdd;                                                                                                //
    }()                                                                                                                //
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"index.js":["./_myTest","./account","./teams","./convos","./msgs","./notes","./sections","./notifications","./images","./invites","./translation","./widgets","./locks",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/methods/index.js                                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  (0, _myTest2['default'])();                                                                                          // 16
  (0, _account2['default'])();                                                                                         // 17
  (0, _teams2['default'])();                                                                                           // 18
  (0, _convos2['default'])();                                                                                          // 19
  (0, _msgs2['default'])();                                                                                            // 20
  (0, _notes2['default'])();                                                                                           // 21
  (0, _sections2['default'])();                                                                                        // 22
  (0, _notifications2['default'])();                                                                                   // 23
  (0, _images2['default'])();                                                                                          // 24
  (0, _invites2['default'])();                                                                                         // 25
  (0, _translation2['default'])();                                                                                     // 26
  (0, _widgets2['default'])();                                                                                         // 27
  (0, _locks2['default'])();                                                                                           // 28
};                                                                                                                     //
                                                                                                                       //
var _myTest = require('./_myTest');                                                                                    // 1
                                                                                                                       //
var _myTest2 = _interopRequireDefault(_myTest);                                                                        //
                                                                                                                       //
var _account = require('./account');                                                                                   // 2
                                                                                                                       //
var _account2 = _interopRequireDefault(_account);                                                                      //
                                                                                                                       //
var _teams = require('./teams');                                                                                       // 3
                                                                                                                       //
var _teams2 = _interopRequireDefault(_teams);                                                                          //
                                                                                                                       //
var _convos = require('./convos');                                                                                     // 4
                                                                                                                       //
var _convos2 = _interopRequireDefault(_convos);                                                                        //
                                                                                                                       //
var _msgs = require('./msgs');                                                                                         // 5
                                                                                                                       //
var _msgs2 = _interopRequireDefault(_msgs);                                                                            //
                                                                                                                       //
var _notes = require('./notes');                                                                                       // 6
                                                                                                                       //
var _notes2 = _interopRequireDefault(_notes);                                                                          //
                                                                                                                       //
var _sections = require('./sections');                                                                                 // 7
                                                                                                                       //
var _sections2 = _interopRequireDefault(_sections);                                                                    //
                                                                                                                       //
var _notifications = require('./notifications');                                                                       // 8
                                                                                                                       //
var _notifications2 = _interopRequireDefault(_notifications);                                                          //
                                                                                                                       //
var _images = require('./images');                                                                                     // 9
                                                                                                                       //
var _images2 = _interopRequireDefault(_images);                                                                        //
                                                                                                                       //
var _invites = require('./invites');                                                                                   // 10
                                                                                                                       //
var _invites2 = _interopRequireDefault(_invites);                                                                      //
                                                                                                                       //
var _translation = require('./translation');                                                                           // 11
                                                                                                                       //
var _translation2 = _interopRequireDefault(_translation);                                                              //
                                                                                                                       //
var _widgets = require('./widgets');                                                                                   // 12
                                                                                                                       //
var _widgets2 = _interopRequireDefault(_widgets);                                                                      //
                                                                                                                       //
var _locks = require('./locks');                                                                                       // 13
                                                                                                                       //
var _locks2 = _interopRequireDefault(_locks);                                                                          //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"invites.js":["meteor/meteor","/lib/collections","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/methods/invites.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var INVITES_REMOVE = 'invites.remove';                                                                               // 6
  _meteor.Meteor.methods({                                                                                             // 7
    'invites.remove': function () {                                                                                    // 8
      function invitesRemove(_ref) {                                                                                   //
        var teamId = _ref.teamId;                                                                                      //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 9
          teamId: String                                                                                               // 10
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 13
        if (!userId) {                                                                                                 // 14
          throw new _meteor.Meteor.Error(INVITES_REMOVE, 'Must be logged in to select invite.');                       // 15
        }                                                                                                              //
        var invite = _collections.Invites.findOne({ teamId: teamId });                                                 // 17
        if (!invite) {                                                                                                 // 18
          throw new _meteor.Meteor.Error(INVITES_REMOVE, 'Must select a existing invite.');                            // 19
        }                                                                                                              //
                                                                                                                       //
        invite.remove();                                                                                               // 22
      }                                                                                                                //
                                                                                                                       //
      return invitesRemove;                                                                                            //
    }()                                                                                                                //
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 1
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 2
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"locks.js":["meteor/meteor","/lib/collections","ramda","meteor/check","/lib/lock",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/methods/locks.js                                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  _meteor.Meteor.methods({                                                                                             // 8
    'locks.requestAndRelease': function () {                                                                           // 9
      function locksRequestAndRelease(_ref) {                                                                          //
        var noteId = _ref.noteId;                                                                                      //
        var requestedWidgetId = _ref.requestedWidgetId;                                                                //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 10
          noteId: String,                                                                                              // 11
          requestedWidgetId: String                                                                                    // 12
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 15
                                                                                                                       //
        var lock = _collections.Locks.findOne(requestedWidgetId);                                                      // 17
        var getCanTakeOver = function () {                                                                             // 18
          function getCanTakeOver() {                                                                                  // 18
            if (lock) {                                                                                                // 19
              var timeout = 5000;                                                                                      // 20
              var timeDiff = new Date() - lock.updatedAt;                                                              // 21
              return timeDiff >= timeout;                                                                              // 22
            }                                                                                                          //
            return true;                                                                                               // 24
          }                                                                                                            //
                                                                                                                       //
          return getCanTakeOver;                                                                                       //
        }();                                                                                                           //
        var canTakeOver = getCanTakeOver();                                                                            // 26
                                                                                                                       //
        if (!lock || canTakeOver) {                                                                                    // 28
          var newLock = new _lock2['default']();                                                                       // 29
          newLock.set({                                                                                                // 30
            noteId: noteId,                                                                                            // 31
            widgetId: requestedWidgetId,                                                                               // 32
            userId: userId                                                                                             // 33
          });                                                                                                          //
          newLock.save();                                                                                              // 35
        }                                                                                                              //
        // Meteor.call('releaseLocks', {rawId, user, blockKeys: releaseBlockKeys});                                    //
      }                                                                                                                // 9
                                                                                                                       //
      return locksRequestAndRelease;                                                                                   //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  // Meteor.methods({                                                                                                  //
  //   releaseLocks({rawId, blockKeys, user}) {                                                                        //
  //     const userId = user._id;                                                                                      //
  //     Locks.remove({                                                                                                //
  //       userId,                                                                                                     //
  //       rawId,                                                                                                      //
  //       blockKey: { $in: blockKeys }                                                                                //
  //     });                                                                                                           //
  //   }                                                                                                               //
  // });                                                                                                               //
                                                                                                                       //
  // Meteor.methods({                                                                                                  //
  //   releaseAllLocks({user}) {                                                                                       //
  //     if (user) {                                                                                                   //
  //       const userId = user._id;                                                                                    //
  //       Locks.remove({ userId });                                                                                   //
  //     }                                                                                                             //
  //     else { Locks.remove({}); }                                                                                    //
                                                                                                                       //
  //   }                                                                                                               //
  // });                                                                                                               //
                                                                                                                       //
  // Meteor.methods({                                                                                                  //
  //   releaseOtherLocks({rawId, blockKeys, user}) {                                                                   //
  //     const userId = user._id;                                                                                      //
  //     Locks.remove({                                                                                                //
  //       userId,                                                                                                     //
  //       rawId,                                                                                                      //
  //       blockKey: { $nin: blockKeys }                                                                               //
  //     });                                                                                                           //
  //   }                                                                                                               //
  // });                                                                                                               //
                                                                                                                       //
  // Meteor.methods({                                                                                                  //
  //   editBlock({rawId, user, rawDraftContentState, block}) {                                                         //
  //     // console.log(block);                                                                                        //
                                                                                                                       //
  //     // RawDraftContentStates.update(rawId, rawDraftContentState);                                                 //
  //     const lock = Locks.findOne({blockKey: block.key, userId: user._id});                                          //
  //     if (lock) {                                                                                                   //
  //       Locks.update(lock._id, {                                                                                    //
  //         $set: { updatedAt: new Date() }                                                                           //
  //       });                                                                                                         //
  //     }                                                                                                             //
  //   }                                                                                                               //
  // });                                                                                                               //
};                                                                                                                     // 7
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 1
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 2
                                                                                                                       //
var _ramda = require('ramda');                                                                                         // 3
                                                                                                                       //
var _ramda2 = _interopRequireDefault(_ramda);                                                                          //
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 4
                                                                                                                       //
var _lock = require('/lib/lock');                                                                                      // 5
                                                                                                                       //
var _lock2 = _interopRequireDefault(_lock);                                                                            //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"msgs.js":["babel-runtime/helpers/toConsumableArray","meteor/meteor","/lib/convo","/lib/msg","/lib/notification","/lib/collections","meteor/check","ramda",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/methods/msgs.js                                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');                                          //
                                                                                                                       //
var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);                                                 //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var MSGS_ADD = 'msgs.add';                                                                                           // 10
  _meteor.Meteor.methods({                                                                                             // 11
    'msgs.add': function () {                                                                                          // 12
      function msgsAdd(_ref) {                                                                                         //
        var text = _ref.text;                                                                                          //
        var convoId = _ref.convoId;                                                                                    //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 13
          text: String,                                                                                                // 14
          convoId: String                                                                                              // 15
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 18
        if (!userId) {                                                                                                 // 19
          throw new _meteor.Meteor.Error(MSGS_ADD, 'Must be logged in to insert msgs.');                               // 20
        }                                                                                                              //
        var user = _meteor.Meteor.users.findOne(userId);                                                               // 22
                                                                                                                       //
        var convo = _convo2['default'].findOne(convoId);                                                               // 24
        if (!convo) {                                                                                                  // 25
          throw new _meteor.Meteor.Error(MSGS_ADD, 'Must post messages to an existing convo.');                        // 26
        }                                                                                                              //
        if (!convo.isUserInConvo(userId)) {                                                                            // 28
          throw new _meteor.Meteor.Error(MSGS_ADD, 'Must be a part of convo to add msgs');                             // 29
        }                                                                                                              //
                                                                                                                       //
        var msg = new _msg2['default']();                                                                              // 32
        msg.set({ text: text, userId: userId, username: user.username, convoId: convoId, convoName: convo.name });     // 33
        msg.save();                                                                                                    // 34
                                                                                                                       //
        // Update convo with last msg text                                                                             //
        var uniqueRecentUserIds = _ramda2['default'].uniq(convo.recentUserIds);                                        // 12
        var oldRecentUserIds = uniqueRecentUserIds.length >= 2 ? _ramda2['default'].takeLast(2, uniqueRecentUserIds) : _ramda2['default'].takeLast(2, convo.userIds);
                                                                                                                       //
        var recentUserIds = _ramda2['default'].takeLast(2, _ramda2['default'].uniq([].concat((0, _toConsumableArray3['default'])(oldRecentUserIds), [userId])));
        var recentUsers = _meteor.Meteor.users.find({ _id: { $in: recentUserIds } });                                  // 42
        var recentUsernames = recentUsers.map(function (recentUser) {                                                  // 43
          return recentUser.username;                                                                                  //
        });                                                                                                            //
                                                                                                                       //
        var getConvoFields = function () {                                                                             // 45
          function getConvoFields() {                                                                                  // 45
            var baseFields = {                                                                                         // 46
              lastMsgText: text,                                                                                       // 47
              lastMsgCreatedAt: msg.createdAt,                                                                         // 48
              recentUserIds: recentUserIds,                                                                            // 49
              recentUsernames: recentUsernames,                                                                        // 50
              numMsgs: _collections.Messages.find({ convoId: convoId }).count() // SERVER ONLY                         // 51
            };                                                                                                         // 46
                                                                                                                       //
            if (_collections.Messages.find({ convoId: convoId }).count() === 1) {                                      // 54
              var firstMsgCreatedAt = msg.createdAt;                                                                   // 55
              return _ramda2['default'].merge(baseFields, { firstMsgCreatedAt: firstMsgCreatedAt });                   // 56
            }                                                                                                          //
            return baseFields;                                                                                         // 58
          }                                                                                                            //
                                                                                                                       //
          return getConvoFields;                                                                                       //
        }();                                                                                                           //
                                                                                                                       //
        convo.set(getConvoFields());                                                                                   // 61
        convo.save();                                                                                                  // 62
                                                                                                                       //
        // Notify convo users, other than yourself, SERVER ONLY                                                        //
        var otherUserIds = _ramda2['default'].filter(function (otherId) {                                              // 12
          return otherId !== userId;                                                                                   //
        }, convo.userIds);                                                                                             //
        var username = _meteor.Meteor.users.findOne(userId).username;                                                  // 66
                                                                                                                       //
        otherUserIds.map(function (otherId) {                                                                          // 68
          var oldNotif = _collections.Notifications.findOne({                                                          // 69
            userId: otherId,                                                                                           // 70
            teamId: convo.teamId,                                                                                      // 71
            convoId: convo._id                                                                                         // 72
          });                                                                                                          //
          if (!oldNotif) {                                                                                             // 74
            var notif = new _notification2['default']();                                                               // 75
            notif.set({                                                                                                // 76
              userId: otherId,                                                                                         // 77
              teamId: convo.teamId,                                                                                    // 78
              convoId: convo._id,                                                                                      // 79
              convoName: convo.name,                                                                                   // 80
              recentUsernames: [username]                                                                              // 81
            });                                                                                                        //
            notif.save();                                                                                              // 83
          } else {                                                                                                     //
            var oldRecentUsernames = oldNotif.recentUsernames;                                                         // 86
            var notifRecentUsernames = _ramda2['default'].uniq([].concat((0, _toConsumableArray3['default'])(oldRecentUsernames), [username]));
            oldNotif.set({ recentUsernames: notifRecentUsernames });                                                   // 88
            oldNotif.save();                                                                                           // 89
          }                                                                                                            //
        });                                                                                                            //
                                                                                                                       //
        return msg; // Will return _id, and the server side only stuff too                                             // 93
      }                                                                                                                // 12
                                                                                                                       //
      return msgsAdd;                                                                                                  //
    }()                                                                                                                //
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 1
                                                                                                                       //
var _convo = require('/lib/convo');                                                                                    // 2
                                                                                                                       //
var _convo2 = _interopRequireDefault(_convo);                                                                          //
                                                                                                                       //
var _msg = require('/lib/msg');                                                                                        // 3
                                                                                                                       //
var _msg2 = _interopRequireDefault(_msg);                                                                              //
                                                                                                                       //
var _notification = require('/lib/notification');                                                                      // 4
                                                                                                                       //
var _notification2 = _interopRequireDefault(_notification);                                                            //
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 5
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 6
                                                                                                                       //
var _ramda = require('ramda');                                                                                         // 7
                                                                                                                       //
var _ramda2 = _interopRequireDefault(_ramda);                                                                          //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"notes.js":["meteor/meteor","/lib/collections","/lib/note","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/methods/notes.js                                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var NOTES_ADD = 'notes.add';                                                                                         // 7
  _meteor.Meteor.methods({                                                                                             // 8
    'notes.add': function () {                                                                                         // 9
      function notesAdd(_ref) {                                                                                        //
        var convoId = _ref.convoId;                                                                                    //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 10
          convoId: String                                                                                              // 11
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 14
        if (!userId) {                                                                                                 // 15
          throw new _meteor.Meteor.Error(NOTES_ADD, 'Must be logged in to insert note.');                              // 16
        }                                                                                                              //
        var convo = _collections.Convos.findOne(convoId);                                                              // 18
        if (!convo) {                                                                                                  // 19
          throw new _meteor.Meteor.Error(NOTES_ADD, 'Must insert note into existing convo.');                          // 20
        }                                                                                                              //
        if (!convo.isUserInConvo) {                                                                                    // 22
          throw new _meteor.Meteor.Error(NOTES_ADD, 'Must be a member of convo to insert note into it.');              // 23
        }                                                                                                              //
        var team = _collections.Teams.findOne(convo.teamId);                                                           // 25
        if (!team) {                                                                                                   // 26
          throw new _meteor.Meteor.Error(NOTES_ADD, 'Must add note to existing team.');                                // 27
        }                                                                                                              //
        if (!team.isUserInTeam(userId)) {                                                                              // 29
          throw new _meteor.Meteor.Error(NOTES_ADD, 'Must be a member of team to insert new note.');                   // 30
        }                                                                                                              //
                                                                                                                       //
        // Insert a note                                                                                               //
        var note = new _note2['default']();                                                                            // 9
        note.set({ convoId: convo._id });                                                                              // 35
        note.save();                                                                                                   // 36
                                                                                                                       //
        // Insert a widget                                                                                             //
        _meteor.Meteor.call('widgets.add', { noteId: note._id, type: 'editor' });                                      // 9
                                                                                                                       //
        return convo._id;                                                                                              // 41
      }                                                                                                                //
                                                                                                                       //
      return notesAdd;                                                                                                 //
    }()                                                                                                                //
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 1
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 2
                                                                                                                       //
var _note = require('/lib/note');                                                                                      // 3
                                                                                                                       //
var _note2 = _interopRequireDefault(_note);                                                                            //
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 4
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"notifications.js":["meteor/meteor","/lib/collections","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/methods/notifications.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var NOTIFICATIONS_REMOVE = 'notifications.remove';                                                                   // 6
  _meteor.Meteor.methods({                                                                                             // 7
    'notifications.remove': function () {                                                                              // 8
      function notificationsRemove(_ref) {                                                                             //
        var convoId = _ref.convoId;                                                                                    //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 9
          convoId: String                                                                                              // 10
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 13
        if (!userId) {                                                                                                 // 14
          throw new _meteor.Meteor.Error(NOTIFICATIONS_REMOVE, 'Must be logged in to remove notifications.');          // 15
        }                                                                                                              //
        var notif = _collections.Notifications.findOne({ userId: userId, convoId: convoId });                          // 17
        if (notif) {                                                                                                   // 18
          if (!notif.belongsToUser(userId)) {                                                                          // 19
            throw new _meteor.Meteor.Error(NOTIFICATIONS_REMOVE, 'Can only remove notifications that belong to yourself.');
          } else {                                                                                                     //
            notif.remove();                                                                                            // 22
          }                                                                                                            //
        }                                                                                                              //
      }                                                                                                                //
                                                                                                                       //
      return notificationsRemove;                                                                                      //
    }()                                                                                                                //
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 1
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 2
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"sections.js":["meteor/meteor","/lib/collections","/lib/section","meteor/check","ramda",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/methods/sections.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var SECTION_ADD = 'sections.add';                                                                                    // 13
  _meteor.Meteor.methods({                                                                                             // 14
    'sections.add': function () {                                                                                      // 15
      function sectionsAdd(_ref) {                                                                                     //
        var noteId = _ref.noteId;                                                                                      //
        var text = _ref.text;                                                                                          //
        var afterSectionId = _ref.afterSectionId;                                                                      //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 16
          noteId: String,                                                                                              // 17
          text: _check.Match.Optional(_check.Match.OneOf(undefined, null, String)),                                    // 18
          afterSectionId: _check.Match.Optional(_check.Match.OneOf(undefined, null, String))                           // 19
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 22
        if (!userId) {                                                                                                 // 23
          throw new _meteor.Meteor.Error(SECTION_ADD, 'Must be logged in to edit note.');                              // 24
        }                                                                                                              //
        var note = _collections.Notes.findOne(noteId);                                                                 // 26
        if (!note) {                                                                                                   // 27
          throw new _meteor.Meteor.Error(SECTION_ADD, 'Must edit only existing notes.');                               // 28
        }                                                                                                              //
        var convo = _collections.Convos.findOne(note.convoId);                                                         // 30
        if (!convo) {                                                                                                  // 31
          throw new _meteor.Meteor.Error(SECTION_ADD, 'Must edit only notes of existing convos.');                     // 32
        }                                                                                                              //
        if (!convo.isUserInConvo(this.userId)) {                                                                       // 34
          throw new _meteor.Meteor.Error(SECTION_ADD, 'Must be a part of convo to edit its note.');                    // 35
        }                                                                                                              //
                                                                                                                       //
        var section = new _section2['default']();                                                                      // 38
        var unlocksAt = dateInXMin(5);                                                                                 // 39
                                                                                                                       //
        section.set({                                                                                                  // 41
          noteId: noteId, text: text,                                                                                  // 42
          editingByUserId: this.userId,                                                                                // 43
          unlocksAt: unlocksAt                                                                                         // 44
        });                                                                                                            //
        section.save();                                                                                                // 46
                                                                                                                       //
        var index = afterSectionId ? note.sectionIds.indexOf(afterSectionId) + 1 : 0;                                  // 48
        var sectionIds = _ramda2['default'].insert(index, section._id, note.sectionIds);                               // 49
                                                                                                                       //
        note.set({ sectionIds: sectionIds });                                                                          // 51
        note.save();                                                                                                   // 52
                                                                                                                       //
        return section;                                                                                                // 54
      }                                                                                                                //
                                                                                                                       //
      return sectionsAdd;                                                                                              //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var SECTION_EDIT = 'sections.edit';                                                                                  // 58
  _meteor.Meteor.methods({                                                                                             // 59
    'sections.edit': function () {                                                                                     // 60
      function sectionsEdit(_ref2) {                                                                                   //
        var sectionId = _ref2.sectionId;                                                                               //
        var text = _ref2.text;                                                                                         //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 61
          sectionId: String,                                                                                           // 62
          text: String                                                                                                 // 63
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 66
        if (!userId) {                                                                                                 // 67
          throw new _meteor.Meteor.Error(SECTION_EDIT, 'Must be logged in to edit section.');                          // 68
        }                                                                                                              //
        var section = _collections.Sections.findOne(sectionId);                                                        // 70
        if (!section) {                                                                                                // 71
          throw new _meteor.Meteor.Error(SECTION_EDIT, 'Must edit only existing sections.');                           // 72
        }                                                                                                              //
        var note = _collections.Notes.findOne(section.noteId);                                                         // 74
        if (!note) {                                                                                                   // 75
          throw new _meteor.Meteor.Error(SECTION_EDIT, 'Must edit only existing notes.');                              // 76
        }                                                                                                              //
        var convo = _collections.Convos.findOne(note.convoId);                                                         // 78
        if (!convo) {                                                                                                  // 79
          throw new _meteor.Meteor.Error(SECTION_ADD, 'Must edit only notes of existing convos.');                     // 80
        }                                                                                                              //
        if (!convo.isUserInConvo(this.userId)) {                                                                       // 82
          throw new _meteor.Meteor.Error(SECTION_ADD, 'Must be a part of convo to edit its note.');                    // 83
        }                                                                                                              //
                                                                                                                       //
        if (section.canEdit(this.userId)) {                                                                            // 86
          var unlocksAt = dateInXMin(5);                                                                               // 87
          section.set({                                                                                                // 88
            text: text,                                                                                                // 89
            editingByUserId: this.userId,                                                                              // 90
            unlocksAt: unlocksAt                                                                                       // 91
          });                                                                                                          //
                                                                                                                       //
          section.save();                                                                                              // 94
        }                                                                                                              //
      }                                                                                                                //
                                                                                                                       //
      return sectionsEdit;                                                                                             //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var SECTION_RELEASE_LOCK = 'sections.releaseLock';                                                                   // 99
  _meteor.Meteor.methods({                                                                                             // 100
    'sections.releaseLock': function () {                                                                              // 101
      function sectionsReleaseLock(_ref3) {                                                                            //
        var sectionId = _ref3.sectionId;                                                                               //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 102
          sectionId: String                                                                                            // 103
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 106
        var section = _collections.Sections.findOne(sectionId);                                                        // 107
        if (!section) {                                                                                                // 108
          throw new _meteor.Meteor.Error(SECTION_RELEASE_LOCK, 'Must unlock an existing section.');                    // 109
        }                                                                                                              //
        if (section.editingByUserId !== userId) {                                                                      // 111
          throw new _meteor.Meteor.Error(SECTION_RELEASE_LOCK, 'Can only unlock a section you are editing.');          // 112
        }                                                                                                              //
                                                                                                                       //
        section.set({                                                                                                  // 115
          editingByUserId: null,                                                                                       // 116
          unlocksAt: new Date(0)                                                                                       // 117
        });                                                                                                            //
        section.save();                                                                                                // 119
        return section;                                                                                                // 120
      }                                                                                                                //
                                                                                                                       //
      return sectionsReleaseLock;                                                                                      //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var SECTION_ACQUIRE_LOCK = 'sections.acquireLock';                                                                   // 124
  _meteor.Meteor.methods({                                                                                             // 125
    'sections.acquireLock': function () {                                                                              // 126
      function sectionsAcquireLock(_ref4) {                                                                            //
        var sectionId = _ref4.sectionId;                                                                               //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 127
          sectionId: String                                                                                            // 128
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 131
        if (!userId) {                                                                                                 // 132
          throw new _meteor.Meteor.Error(SECTION_ACQUIRE_LOCK, 'Must be logged in to acquire section lock.');          // 133
        }                                                                                                              //
        var section = _collections.Sections.findOne(sectionId);                                                        // 135
        if (!section) {                                                                                                // 136
          throw new _meteor.Meteor.Error(SECTION_ACQUIRE_LOCK, 'Can only lock existing sections.');                    // 137
        }                                                                                                              //
        var note = _collections.Notes.findOne(section.noteId);                                                         // 139
        var convo = _collections.Convos.findOne(note.convoId);                                                         // 140
        if (!convo.isUserInConvo(userId)) {                                                                            // 141
          throw new _meteor.Meteor.Error(SECTION_ACQUIRE_LOCK, 'Must be a member of convo to acquire section locks.');
        }                                                                                                              //
                                                                                                                       //
        section.set({                                                                                                  // 145
          editingByUserId: userId,                                                                                     // 146
          unlocksAt: dateInXMin(5)                                                                                     // 147
        });                                                                                                            //
        section.save();                                                                                                // 149
        return section;                                                                                                // 150
      }                                                                                                                //
                                                                                                                       //
      return sectionsAcquireLock;                                                                                      //
    }()                                                                                                                //
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 1
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 2
                                                                                                                       //
var _section = require('/lib/section');                                                                                // 3
                                                                                                                       //
var _section2 = _interopRequireDefault(_section);                                                                      //
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 4
                                                                                                                       //
var _ramda = require('ramda');                                                                                         // 5
                                                                                                                       //
var _ramda2 = _interopRequireDefault(_ramda);                                                                          //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
                                                                                                                       //
var dateInXMin = function dateInXMin(x) {                                                                              // 7
  var minutes = x * 60 * 1000;                                                                                         // 8
  return new Date(Date.now() + minutes);                                                                               // 9
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"teams.js":["babel-runtime/helpers/toConsumableArray","meteor/meteor","/lib/collections","/lib/team","meteor/check","meteor/alanning:roles","ramda","email-validator","/lib/invite",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/methods/teams.js                                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');                                          //
                                                                                                                       //
var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);                                                 //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var TEAMS_ADD = 'teams.add';                                                                                         // 11
  _meteor.Meteor.methods({                                                                                             // 12
    'teams.add': function () {                                                                                         // 13
      function teamsAdd(_ref) {                                                                                        //
        var name = _ref.name;                                                                                          //
        var userIds = _ref.userIds;                                                                                    //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 14
          name: String,                                                                                                // 15
          userIds: [String]                                                                                            // 16
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 19
        if (!userId) {                                                                                                 // 20
          throw new _meteor.Meteor.Error(TEAMS_ADD, 'Must be logged in to insert team.');                              // 21
        }                                                                                                              //
                                                                                                                       //
        var newUserIds = [userId].concat((0, _toConsumableArray3['default'])(userIds));                                // 24
        var uniqueUserIds = _ramda2['default'].uniq(newUserIds);                                                       // 25
                                                                                                                       //
        // Can't use Meteor.setTimeout here                                                                            //
        // Cuz simulation will insert obj, but server looks like it inserted nothing since we didn't block it.         //
        // The simulated insert will revert to nothing. Then X time later the server will actually insert.             //
        // Meteor._sleepForMs(3000);                                                                                   //
                                                                                                                       //
        var team = new _team2['default']();                                                                            // 13
        team.set({ name: name, userIds: uniqueUserIds });                                                              // 33
        team.save();                                                                                                   // 34
                                                                                                                       //
        // Add users to roles                                                                                          //
        _alanningRoles.Roles.addUsersToRoles(userId, ['admin'], team._id);                                             // 13
        _alanningRoles.Roles.addUsersToRoles(userIds, ['member'], team._id);                                           // 38
                                                                                                                       //
        // return team; // Will return _id, and the server side only stuff too                                         //
        return team._id;                                                                                               // 13
      }                                                                                                                //
                                                                                                                       //
      return teamsAdd;                                                                                                 //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var TEAMS_ADD_MEMBERS = 'teams.addMembers';                                                                          // 45
  _meteor.Meteor.methods({                                                                                             // 46
    'teams.addMembers': function () {                                                                                  // 47
      function teamsAddMembers(_ref2) {                                                                                //
        var teamId = _ref2.teamId;                                                                                     //
        var userIds = _ref2.userIds;                                                                                   //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 48
          teamId: String,                                                                                              // 49
          userIds: [String]                                                                                            // 50
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 53
        if (!userId) {                                                                                                 // 54
          throw new _meteor.Meteor.Error(TEAMS_ADD_MEMBERS, 'Must be logged in to insert team.');                      // 55
        }                                                                                                              //
        var team = _collections.Teams.findOne(teamId);                                                                 // 57
        if (!team) {                                                                                                   // 58
          throw new _meteor.Meteor.Error(TEAMS_ADD_MEMBERS, 'Must add members to an existing team.');                  // 59
        }                                                                                                              //
        if (!team.isUserInTeam(userId)) {                                                                              // 61
          throw new _meteor.Meteor.Error(TEAMS_ADD_MEMBERS, 'Must be a part of team to add new members to it.');       // 62
        }                                                                                                              //
                                                                                                                       //
        _alanningRoles.Roles.addUsersToRoles(userIds, ['member'], teamId);                                             // 65
                                                                                                                       //
        var newUserIds = [].concat((0, _toConsumableArray3['default'])(team.userIds), (0, _toConsumableArray3['default'])(userIds));
        var uniqueUserIds = _ramda2['default'].uniq(newUserIds);                                                       // 68
                                                                                                                       //
        team.set({ userIds: uniqueUserIds });                                                                          // 70
        team.save();                                                                                                   // 71
                                                                                                                       //
        return team;                                                                                                   // 73
      }                                                                                                                //
                                                                                                                       //
      return teamsAddMembers;                                                                                          //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var TEAMS_SET_NAME = 'teams.setName';                                                                                // 77
  _meteor.Meteor.methods({                                                                                             // 78
    'teams.setName': function () {                                                                                     // 79
      function teamsSetName(_ref3) {                                                                                   //
        var teamId = _ref3.teamId;                                                                                     //
        var name = _ref3.name;                                                                                         //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 80
          teamId: String,                                                                                              // 81
          name: String                                                                                                 // 82
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 85
        if (!userId) {                                                                                                 // 86
          throw new _meteor.Meteor.Error(TEAMS_SET_NAME, 'Must be logged in to change team name.');                    // 87
        }                                                                                                              //
        var team = _collections.Teams.findOne(teamId);                                                                 // 89
        if (!team) {                                                                                                   // 90
          throw new _meteor.Meteor.Error(TEAMS_SET_NAME, 'Must change name of existing team.');                        // 91
        }                                                                                                              //
        if (!team.isUserAdmin(userId)) {                                                                               // 93
          throw new _meteor.Meteor.Error(TEAMS_SET_NAME, 'Must be admin to change name of team.');                     // 94
        }                                                                                                              //
                                                                                                                       //
        team.set({ name: name });                                                                                      // 97
        team.save();                                                                                                   // 98
      }                                                                                                                //
                                                                                                                       //
      return teamsSetName;                                                                                             //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var TEAMS_SET_INFO = 'teams.setInfo';                                                                                // 102
  _meteor.Meteor.methods({                                                                                             // 103
    'teams.setInfo': function () {                                                                                     // 104
      function teamsSetInfo(_ref4) {                                                                                   //
        var teamId = _ref4.teamId;                                                                                     //
        var info = _ref4.info;                                                                                         //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 105
          teamId: String,                                                                                              // 106
          info: String                                                                                                 // 107
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 110
        if (!userId) {                                                                                                 // 111
          throw new _meteor.Meteor.Error(TEAMS_SET_INFO, 'Must be logged in to set team info.');                       // 112
        }                                                                                                              //
        var team = _collections.Teams.findOne(teamId);                                                                 // 114
        if (!team) {                                                                                                   // 115
          throw new _meteor.Meteor.Error(TEAMS_SET_INFO, 'Must set info of existing team.');                           // 116
        }                                                                                                              //
        if (!team.isUserAdmin(userId)) {                                                                               // 118
          throw new _meteor.Meteor.Error(TEAMS_SET_INFO, 'Must be admin to set info of team.');                        // 119
        }                                                                                                              //
                                                                                                                       //
        team.set({ info: info });                                                                                      // 122
        team.save();                                                                                                   // 123
      }                                                                                                                //
                                                                                                                       //
      return teamsSetInfo;                                                                                             //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var TEAMS_SET_USER_ROLE = 'teams.setUserRole';                                                                       // 127
  _meteor.Meteor.methods({                                                                                             // 128
    'teams.setUserRole': function () {                                                                                 // 129
      function teamsSetUserRole(_ref5) {                                                                               //
        var teamId = _ref5.teamId;                                                                                     //
        var changeUserId = _ref5.changeUserId;                                                                         //
        var role = _ref5.role;                                                                                         //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 130
          teamId: String,                                                                                              // 131
          changeUserId: String,                                                                                        // 132
          role: String                                                                                                 // 133
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 136
        if (!userId) {                                                                                                 // 137
          throw new _meteor.Meteor.Error(TEAMS_SET_USER_ROLE, 'Must be logged in to change user roles.');              // 138
        }                                                                                                              //
        var team = _collections.Teams.findOne(teamId);                                                                 // 140
        if (!team) {                                                                                                   // 141
          throw new _meteor.Meteor.Error(TEAMS_SET_USER_ROLE, 'Must change of role of user in existing team.');        // 142
        }                                                                                                              //
        if (!team.isUserAdmin(userId)) {                                                                               // 145
          throw new _meteor.Meteor.Error(TEAMS_SET_USER_ROLE, 'Must be admin to change roles of team members.');       // 146
        }                                                                                                              //
        if (!team.isUserInTeam(changeUserId)) {                                                                        // 149
          throw new _meteor.Meteor.Error(TEAMS_SET_USER_ROLE, 'Must change role of existing user.');                   // 150
        }                                                                                                              //
                                                                                                                       //
        var cleanRole = _ramda2['default'].toLower(role);                                                              // 154
        var rolesList = ['admin', 'member'];                                                                           // 155
        if (!_ramda2['default'].contains(cleanRole, rolesList)) {                                                      // 156
          throw new _meteor.Meteor.Error(TEAMS_SET_USER_ROLE, 'Must change role to acceptable role. (' + rolesList + ')');
        }                                                                                                              //
                                                                                                                       //
        var teamUsers = _meteor.Meteor.users.find({ _id: { $in: team.userIds } }).fetch();                             // 161
        var getCurrentNumAdmins = function () {                                                                        // 162
          function getCurrentNumAdmins() {                                                                             // 162
            var roles = teamUsers.map(function (teamUser) {                                                            // 163
              return teamUser.roles[teamId];                                                                           //
            });                                                                                                        //
            var count = _ramda2['default'].countBy(function (_role) {                                                  // 164
              return _role;                                                                                            //
            })(roles);                                                                                                 //
            return count['admin'];                                                                                     // 165
          }                                                                                                            //
                                                                                                                       //
          return getCurrentNumAdmins;                                                                                  //
        }();                                                                                                           //
        var changeUser = _meteor.Meteor.users.findOne(changeUserId);                                                   // 167
        var wrongNumAdminsAfterRoleChange = function () {                                                              // 168
          function wrongNumAdminsAfterRoleChange() {                                                                   // 168
            return getCurrentNumAdmins() <= 1 && team.isUserAdmin(changeUser._id) && role === 'member';                // 169
          }                                                                                                            //
                                                                                                                       //
          return wrongNumAdminsAfterRoleChange;                                                                        //
        }();                                                                                                           //
        if (wrongNumAdminsAfterRoleChange()) {                                                                         // 171
          throw new _meteor.Meteor.Error(TEAMS_SET_USER_ROLE, 'Must have at least one admin.');                        // 172
        }                                                                                                              //
                                                                                                                       //
        var oldRoles = team.getRolesForUser(changeUserId);                                                             // 176
        _alanningRoles.Roles.removeUsersFromRoles(changeUserId, oldRoles[0], teamId);                                  // 177
        _alanningRoles.Roles.addUsersToRoles(changeUserId, role, teamId);                                              // 178
      }                                                                                                                //
                                                                                                                       //
      return teamsSetUserRole;                                                                                         //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  // SERVER ONLY                                                                                                       //
  var TEAMS_REMOVE_USER = 'teams.removeUser';                                                                          // 10
  _meteor.Meteor.methods({                                                                                             // 184
    'teams.removeUser': function () {                                                                                  // 185
      function teamsRemoveUser(_ref6) {                                                                                //
        var teamId = _ref6.teamId;                                                                                     //
        var removeUserId = _ref6.removeUserId;                                                                         //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 186
          teamId: String,                                                                                              // 187
          removeUserId: String                                                                                         // 188
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 191
        if (!userId) {                                                                                                 // 192
          throw new _meteor.Meteor.Error(TEAMS_REMOVE_USER, 'Must be logged in to remove user.');                      // 193
        }                                                                                                              //
        var team = _collections.Teams.findOne(teamId);                                                                 // 195
        if (!team) {                                                                                                   // 196
          throw new _meteor.Meteor.Error(TEAMS_REMOVE_USER, 'Must remove from existing team.');                        // 197
        }                                                                                                              //
        if (!team.isUserAdmin(userId)) {                                                                               // 200
          throw new _meteor.Meteor.Error(TEAMS_REMOVE_USER, 'Must be admin to remove team members.');                  // 201
        }                                                                                                              //
        if (!team.isUserInTeam(removeUserId)) {                                                                        // 204
          throw new _meteor.Meteor.Error(TEAMS_REMOVE_USER, 'Must remove existing user.');                             // 205
        }                                                                                                              //
                                                                                                                       //
        var teamUsers = _meteor.Meteor.users.find({ _id: { $in: team.userIds } }).fetch();                             // 209
        var getCurrentNumAdmins = function () {                                                                        // 210
          function getCurrentNumAdmins() {                                                                             // 210
            var roles = teamUsers.map(function (teamUser) {                                                            // 211
              return teamUser.roles[teamId];                                                                           //
            });                                                                                                        //
            var count = _ramda2['default'].countBy(function (_role) {                                                  // 212
              return _role;                                                                                            //
            })(roles);                                                                                                 //
            return count['admin'];                                                                                     // 213
          }                                                                                                            //
                                                                                                                       //
          return getCurrentNumAdmins;                                                                                  //
        }();                                                                                                           //
        var removeUser = _meteor.Meteor.users.findOne(removeUserId);                                                   // 215
        var wrongNumAdminsAfterRemove = function () {                                                                  // 216
          function wrongNumAdminsAfterRemove() {                                                                       // 216
            return getCurrentNumAdmins() <= 1 && team.isUserAdmin(removeUser._id);                                     // 217
          }                                                                                                            //
                                                                                                                       //
          return wrongNumAdminsAfterRemove;                                                                            //
        }();                                                                                                           //
        if (wrongNumAdminsAfterRemove()) {                                                                             // 219
          throw new _meteor.Meteor.Error(TEAMS_REMOVE_USER, 'Must have at least one admin.');                          // 220
        }                                                                                                              //
                                                                                                                       //
        // Remove user from team                                                                                       //
        team.set({                                                                                                     // 185
          userIds: _ramda2['default'].filter(function (id) {                                                           // 226
            return id !== removeUserId;                                                                                //
          }, team.userIds)                                                                                             //
        });                                                                                                            //
        team.save();                                                                                                   // 228
                                                                                                                       //
        _meteor.Meteor.call('account.removeFromTeam', { removeUserId: removeUserId, teamId: teamId });                 // 230
        _meteor.Meteor.call('convos.removeUserFromTeam', { removeUserId: removeUserId, teamId: teamId });              // 231
      }                                                                                                                //
                                                                                                                       //
      return teamsRemoveUser;                                                                                          //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  // SERVER ONLY                                                                                                       //
  var TEAMS_INVITE = 'teams.invite';                                                                                   // 10
  _meteor.Meteor.methods({                                                                                             // 237
    'teams.invite': function () {                                                                                      // 238
      function teamsInvite(_ref7) {                                                                                    //
        var inviteEmails = _ref7.inviteEmails;                                                                         //
        var teamId = _ref7.teamId;                                                                                     //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 239
          inviteEmails: [String],                                                                                      // 240
          teamId: String                                                                                               // 241
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 244
        if (!userId) {                                                                                                 // 245
          throw new _meteor.Meteor.Error(TEAMS_INVITE, 'Must be logged in to invite people.');                         // 246
        }                                                                                                              //
        var user = _meteor.Meteor.users.findOne(userId);                                                               // 248
        var team = _collections.Teams.findOne(teamId);                                                                 // 249
        if (!team) {                                                                                                   // 250
          throw new _meteor.Meteor.Error(TEAMS_INVITE, 'Must invite people to an existing team.');                     // 251
        }                                                                                                              //
        if (!team.isUserAdmin(userId)) {                                                                               // 253
          throw new _meteor.Meteor.Error(TEAMS_INVITE, 'Must be an admin to invite people to team.');                  // 254
        }                                                                                                              //
                                                                                                                       //
        var validatedEmails = _ramda2['default'].filter(function (email) {                                             // 257
          return _emailValidator2['default'].validate(email);                                                          //
        }, inviteEmails);                                                                                              //
                                                                                                                       //
        var existingEmails = _ramda2['default'].filter(function (email) {                                              // 259
          var existingUser = Accounts.findUserByEmail(email);                                                          // 260
          return existingUser;                                                                                         // 261
        }, validatedEmails);                                                                                           //
                                                                                                                       //
        var newEmails = _ramda2['default'].difference(validatedEmails, existingEmails);                                // 264
                                                                                                                       //
        function _create(email) {                                                                                      // 266
          var newId = Accounts.createUser({ username: email, email: email });                                          // 267
          _meteor.Meteor.users.update(newId, { $set: { invitedBy: user.username } }); // This is so we can send the proper email
          return newId;                                                                                                // 266
        }                                                                                                              //
        function _invite(newId) {                                                                                      // 271
          var invite = new _invite3['default']();                                                                      // 272
          invite.set({                                                                                                 // 273
            userId: newId,                                                                                             // 274
            teamId: teamId,                                                                                            // 275
            invitedBy: user.username                                                                                   // 276
          });                                                                                                          //
          invite.save();                                                                                               // 278
        }                                                                                                              //
                                                                                                                       //
        var existingUserIds = existingEmails.map(function (email) {                                                    // 281
          var existingUser = Accounts.findUserByEmail(email);                                                          // 282
          _invite(existingUser._id);                                                                                   // 283
          return existingUser._id;                                                                                     // 284
        });                                                                                                            //
                                                                                                                       //
        var newUserIds = newEmails.map(function (email) {                                                              // 287
          var newId = _create(email);                                                                                  // 288
          _invite(newId);                                                                                              // 289
          return newId;                                                                                                // 290
        });                                                                                                            //
                                                                                                                       //
        // Update team                                                                                                 //
        team.set({                                                                                                     // 238
          userIds: _ramda2['default'].uniq([].concat((0, _toConsumableArray3['default'])(team.userIds), (0, _toConsumableArray3['default'])(newUserIds), (0, _toConsumableArray3['default'])(existingUserIds)))
        });                                                                                                            //
        team.save();                                                                                                   // 297
        _alanningRoles.Roles.addUsersToRoles([].concat((0, _toConsumableArray3['default'])(newUserIds), (0, _toConsumableArray3['default'])(existingUserIds)), ['member'], teamId);
                                                                                                                       //
        // Send out emails                                                                                             //
        newUserIds.forEach(function (id) {                                                                             // 238
          return Accounts.sendEnrollmentEmail(id);                                                                     //
        });                                                                                                            //
        existingEmails.forEach(function (email) {                                                                      // 302
          Email.send({                                                                                                 // 303
            from: 'Olis <contact.aheadstudios@gmail.com>',                                                             // 304
            to: email,                                                                                                 // 305
            subject: 'You have been invited to a new Olis Team.',                                                      // 306
            text: user.username + ' has invited you to join their Olis team ' + team.name + '!\n\n\n            Sign in and accept their invite.'
          });                                                                                                          //
        });                                                                                                            //
      }                                                                                                                //
                                                                                                                       //
      return teamsInvite;                                                                                              //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  // SERVER ONLY                                                                                                       //
  var TEAMS_IS_MEMBER = 'teams.isMember';                                                                              // 10
  _meteor.Meteor.methods({                                                                                             // 316
    'teams.isMember': function () {                                                                                    // 317
      function teamsIsMember(_ref8) {                                                                                  //
        var teamId = _ref8.teamId;                                                                                     //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 318
          teamId: String                                                                                               // 319
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 322
        if (!userId) {                                                                                                 // 323
          throw new _meteor.Meteor.Error(TEAMS_IS_MEMBER, 'Must be logged in to access team route.');                  // 324
        }                                                                                                              //
        var team = _collections.Teams.findOne(teamId);                                                                 // 326
        if (!team) {                                                                                                   // 327
          throw new _meteor.Meteor.Error(TEAMS_IS_MEMBER, 'Must be a member of existing team.');                       // 328
        }                                                                                                              //
        if (!team.isUserMember(userId)) {                                                                              // 330
          throw new _meteor.Meteor.Error(TEAMS_IS_MEMBER, 'User is not a member of team.');                            // 331
        }                                                                                                              //
                                                                                                                       //
        return team.isUserMember(userId);                                                                              // 334
      }                                                                                                                //
                                                                                                                       //
      return teamsIsMember;                                                                                            //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  // SERVER ONLY                                                                                                       //
  var TEAMS_IS_ADMIN = 'teams.isAdmin';                                                                                // 10
  _meteor.Meteor.methods({                                                                                             // 340
    'teams.isAdmin': function () {                                                                                     // 341
      function teamsIsAdmin(_ref9) {                                                                                   //
        var teamId = _ref9.teamId;                                                                                     //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 342
          teamId: String                                                                                               // 343
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 346
        if (!userId) {                                                                                                 // 347
          throw new _meteor.Meteor.Error(TEAMS_IS_ADMIN, 'Must be logged in to access team route.');                   // 348
        }                                                                                                              //
        var team = _collections.Teams.findOne(teamId);                                                                 // 350
        if (!team) {                                                                                                   // 351
          throw new _meteor.Meteor.Error(TEAMS_IS_ADMIN, 'Must be a member of existing team.');                        // 352
        }                                                                                                              //
        if (!team.isUserAdmin(userId)) {                                                                               // 354
          throw new _meteor.Meteor.Error(TEAMS_IS_ADMIN, 'User is not an admin of team.');                             // 355
        }                                                                                                              //
                                                                                                                       //
        return team.isUserAdmin(userId);                                                                               // 358
      }                                                                                                                //
                                                                                                                       //
      return teamsIsAdmin;                                                                                             //
    }()                                                                                                                //
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 1
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 2
                                                                                                                       //
var _team = require('/lib/team');                                                                                      // 3
                                                                                                                       //
var _team2 = _interopRequireDefault(_team);                                                                            //
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 4
                                                                                                                       //
var _alanningRoles = require('meteor/alanning:roles');                                                                 // 5
                                                                                                                       //
var _ramda = require('ramda');                                                                                         // 6
                                                                                                                       //
var _ramda2 = _interopRequireDefault(_ramda);                                                                          //
                                                                                                                       //
var _emailValidator = require('email-validator');                                                                      // 7
                                                                                                                       //
var _emailValidator2 = _interopRequireDefault(_emailValidator);                                                        //
                                                                                                                       //
var _invite2 = require('/lib/invite');                                                                                 // 8
                                                                                                                       //
var _invite3 = _interopRequireDefault(_invite2);                                                                       //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"translation.js":["meteor/meteor","meteor/check","meteor/devian:mstranslate","/lib/collections","/lib/translation",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/methods/translation.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var TRANSLATION_GET = 'translation.get';                                                                             // 8
  _meteor.Meteor.methods({                                                                                             // 9
    'translation.get': function () {                                                                                   // 10
      function translationGet(_ref) {                                                                                  //
        var msgId = _ref.msgId;                                                                                        //
        var langCode = _ref.langCode;                                                                                  //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 11
          msgId: String,                                                                                               // 12
          langCode: String                                                                                             // 13
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 16
        if (!userId) {                                                                                                 // 17
          throw new _meteor.Meteor.Error(TRANSLATION_GET, 'Must be logged in to get a translation.');                  // 18
        }                                                                                                              //
        var msg = _collections.Messages.findOne(msgId);                                                                // 20
        if (!msg) {                                                                                                    // 21
          throw new _meteor.Meteor.Error(TRANSLATION_GET, 'Must translate an existing message.');                      // 22
        }                                                                                                              //
        var existingTrans = _collections.Translations.findOne({ msgId: msgId, langCode: langCode });                   // 24
        if (!existingTrans) {                                                                                          // 25
          var text = msg.text;                                                                                         // 26
          var translated = _devianMstranslate.Microsoft.translate(text, langCode);                                     // 27
                                                                                                                       //
          var translation = new _translation2['default']({                                                             // 29
            msgId: msgId,                                                                                              // 30
            convoId: msg.convoId,                                                                                      // 31
            langCode: langCode,                                                                                        // 32
            text: translated                                                                                           // 33
          });                                                                                                          //
          translation.save();                                                                                          // 35
          return translated;                                                                                           // 36
        }                                                                                                              //
      }                                                                                                                //
                                                                                                                       //
      return translationGet;                                                                                           //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var TRANSLATION_DETECT_LANG = 'translation.detectLang';                                                              // 41
  _meteor.Meteor.methods({                                                                                             // 42
    'translation.detectLang': function () {                                                                            // 43
      function translationDetectLang(_ref2) {                                                                          //
        var text = _ref2.text;                                                                                         //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 44
          text: String                                                                                                 // 45
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 48
        if (!userId) {                                                                                                 // 49
          throw new _meteor.Meteor.Error(TRANSLATION_DETECT_LANG, 'Must be logged in to detect language.');            // 50
        }                                                                                                              //
                                                                                                                       //
        // Some language code like 'en', I assume the translate method will recognize it                               //
        return _devianMstranslate.Microsoft.detect(text);                                                              // 43
      }                                                                                                                //
                                                                                                                       //
      return translationDetectLang;                                                                                    //
    }()                                                                                                                //
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 1
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 2
                                                                                                                       //
var _devianMstranslate = require('meteor/devian:mstranslate');                                                         // 3
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 4
                                                                                                                       //
var _translation = require('/lib/translation');                                                                        // 5
                                                                                                                       //
var _translation2 = _interopRequireDefault(_translation);                                                              //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"widgets.js":["meteor/meteor","/lib/collections","/lib/widget","ramda","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/methods/widgets.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var WIDGETS_ADD = 'widgets.add';                                                                                     // 8
  _meteor.Meteor.methods({                                                                                             // 9
    'widgets.add': function () {                                                                                       // 10
      function widgetsAdd(_ref) {                                                                                      //
        var noteId = _ref.noteId;                                                                                      //
        var type = _ref.type;                                                                                          //
        var data = _ref.data;                                                                                          //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 11
          noteId: String,                                                                                              // 12
          type: String,                                                                                                // 13
          data: _check.Match.Optional(_check.Match.OneOf(undefined, null, Object))                                     // 14
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 17
        if (!userId) {                                                                                                 // 18
          throw new _meteor.Meteor.Error(WIDGETS_ADD, 'Must be logged in to add widgets.');                            // 19
        }                                                                                                              //
        var note = _collections.Notes.findOne(noteId);                                                                 // 21
        if (!note) {                                                                                                   // 22
          throw new _meteor.Meteor.Error(WIDGETS_ADD, 'Must add widget to existing note.');                            // 23
        }                                                                                                              //
        var convo = _collections.Convos.findOne(note.convoId);                                                         // 25
        if (!convo) {                                                                                                  // 26
          throw new _meteor.Meteor.Error(WIDGETS_ADD, 'Must add widgets to an existing convo.');                       // 27
        }                                                                                                              //
        if (!convo.isUserInConvo(userId)) {                                                                            // 29
          throw new _meteor.Meteor.Error(WIDGETS_ADD, 'Must be a part of convo to add widgets.');                      // 30
        }                                                                                                              //
                                                                                                                       //
        // Insert new widget                                                                                           //
        var widget = new _widget2['default']();                                                                        // 10
        widget.set({                                                                                                   // 35
          noteId: noteId,                                                                                              // 36
          type: type,                                                                                                  // 37
          data: data ? data : null                                                                                     // 38
        });                                                                                                            //
        widget.save();                                                                                                 // 40
        var widgetId = widget._id;                                                                                     // 41
                                                                                                                       //
        // Insert widget id into note                                                                                  //
        var newWidgets = _ramda2['default'].append(widgetId, note.widgetIds);                                          // 10
        note.set({                                                                                                     // 45
          widgetIds: newWidgets                                                                                        // 46
        });                                                                                                            //
        note.save();                                                                                                   // 48
      }                                                                                                                //
                                                                                                                       //
      return widgetsAdd;                                                                                               //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  var WIDGETS_REMOVE = 'widgets.remove';                                                                               // 52
  _meteor.Meteor.methods({                                                                                             // 53
    'widgets.remove': function () {                                                                                    // 54
      function widgetsRemove(_ref2) {                                                                                  //
        var noteId = _ref2.noteId;                                                                                     //
        var widgetId = _ref2.widgetId;                                                                                 //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 55
          noteId: String,                                                                                              // 56
          widgetId: String                                                                                             // 57
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 60
        if (!userId) {                                                                                                 // 61
          throw new _meteor.Meteor.Error(WIDGETS_REMOVE, 'Must be logged in to add widgets.');                         // 62
        }                                                                                                              //
        var note = _collections.Notes.findOne(noteId);                                                                 // 64
        if (!note) {                                                                                                   // 65
          throw new _meteor.Meteor.Error(WIDGETS_REMOVE, 'Must add widget to existing note.');                         // 66
        }                                                                                                              //
        var convo = _collections.Convos.findOne(note.convoId);                                                         // 68
        if (!convo) {                                                                                                  // 69
          throw new _meteor.Meteor.Error(WIDGETS_REMOVE, 'Must add widgets to an existing convo.');                    // 70
        }                                                                                                              //
        if (!convo.isUserInConvo(userId)) {                                                                            // 72
          throw new _meteor.Meteor.Error(WIDGETS_REMOVE, 'Must be a part of convo to add widgets.');                   // 73
        }                                                                                                              //
                                                                                                                       //
        _collections.Widgets.remove(widgetId);                                                                         // 76
                                                                                                                       //
        // Update note's widget array                                                                                  //
        var toDeleteIndex = _ramda2['default'].findIndex(function (id) {                                               // 54
          return id === widgetId;                                                                                      //
        }, note.widgetIds);                                                                                            //
        var newWidgets = _ramda2['default'].remove(toDeleteIndex, 1, note.widgetIds);                                  // 80
        note.set({                                                                                                     // 81
          widgetIds: newWidgets                                                                                        // 82
        });                                                                                                            //
        note.save();                                                                                                   // 84
      }                                                                                                                //
                                                                                                                       //
      return widgetsRemove;                                                                                            //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  _meteor.Meteor.methods({                                                                                             // 88
    'widgets.move': function () {                                                                                      // 89
      function widgetsMove(_ref3) {                                                                                    //
        var noteId = _ref3.noteId;                                                                                     //
        var widgetId = _ref3.widgetId;                                                                                 //
        var position = _ref3.position;                                                                                 //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 90
          noteId: String,                                                                                              // 91
          widgetId: String,                                                                                            // 92
          position: Number                                                                                             // 93
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 96
        if (!userId) {                                                                                                 // 97
          throw new _meteor.Meteor.Error(WIDGETS_REMOVE, 'Must be logged in to add widgets.');                         // 98
        }                                                                                                              //
        var note = _collections.Notes.findOne(noteId);                                                                 // 100
        if (!note) {                                                                                                   // 101
          throw new _meteor.Meteor.Error(WIDGETS_REMOVE, 'Must add widget to existing note.');                         // 102
        }                                                                                                              //
        var convo = _collections.Convos.findOne(note.convoId);                                                         // 104
        if (!convo) {                                                                                                  // 105
          throw new _meteor.Meteor.Error(WIDGETS_REMOVE, 'Must add widgets to an existing convo.');                    // 106
        }                                                                                                              //
        if (!convo.isUserInConvo(userId)) {                                                                            // 108
          throw new _meteor.Meteor.Error(WIDGETS_REMOVE, 'Must be a part of convo to add widgets.');                   // 109
        }                                                                                                              //
                                                                                                                       //
        var indexToRemove = _ramda2['default'].findIndex(function (i) {                                                // 112
          return i === widgetId;                                                                                       //
        })(note.widgetIds);                                                                                            //
        var widgetsLessRemoved = _ramda2['default'].remove(indexToRemove, 1, note.widgetIds);                          // 113
        var newOrderedWidgets = _ramda2['default'].insert(position, widgetId, widgetsLessRemoved);                     // 114
                                                                                                                       //
        note.set({                                                                                                     // 116
          widgetIds: newOrderedWidgets                                                                                 // 117
        });                                                                                                            //
        note.save();                                                                                                   // 119
      }                                                                                                                //
                                                                                                                       //
      return widgetsMove;                                                                                              //
    }()                                                                                                                //
  });                                                                                                                  //
                                                                                                                       //
  _meteor.Meteor.methods({                                                                                             // 123
    'widgets.update': function () {                                                                                    // 124
      function widgetsUpdate(_ref4) {                                                                                  //
        var widgetId = _ref4.widgetId;                                                                                 //
        var data = _ref4.data;                                                                                         //
                                                                                                                       //
        (0, _check.check)(arguments[0], {                                                                              // 125
          widgetId: String,                                                                                            // 126
          data: Object                                                                                                 // 127
        });                                                                                                            //
                                                                                                                       //
        var userId = this.userId;                                                                                      // 130
        if (!userId) {                                                                                                 // 131
          throw new _meteor.Meteor.Error(WIDGETS_REMOVE, 'Must be logged in to add widgets.');                         // 132
        }                                                                                                              //
        var widget = _collections.Widgets.findOne(widgetId);                                                           // 134
        if (!widget) {                                                                                                 // 135
          throw new _meteor.Meteor.Error(WIDGETS_REMOVE, 'Must remove an existing widget.');                           // 136
        }                                                                                                              //
        var note = _collections.Notes.findOne(widget.noteId);                                                          // 138
        if (!note) {                                                                                                   // 139
          throw new _meteor.Meteor.Error(WIDGETS_REMOVE, 'Must add widget to existing note.');                         // 140
        }                                                                                                              //
        var convo = _collections.Convos.findOne(note.convoId);                                                         // 142
        if (!convo) {                                                                                                  // 143
          throw new _meteor.Meteor.Error(WIDGETS_REMOVE, 'Must add widgets to an existing convo.');                    // 144
        }                                                                                                              //
        if (!convo.isUserInConvo(userId)) {                                                                            // 146
          throw new _meteor.Meteor.Error(WIDGETS_REMOVE, 'Must be a part of convo to add widgets.');                   // 147
        }                                                                                                              //
                                                                                                                       //
        widget.set({ data: data });                                                                                    // 150
        widget.save();                                                                                                 // 151
                                                                                                                       //
        // To trigger the updated at change                                                                            //
        note.set({                                                                                                     // 124
          updatedAt: new Date()                                                                                        // 155
        });                                                                                                            //
        note.save();                                                                                                   // 157
      }                                                                                                                //
                                                                                                                       //
      return widgetsUpdate;                                                                                            //
    }()                                                                                                                //
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 1
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 2
                                                                                                                       //
var _widget = require('/lib/widget');                                                                                  // 3
                                                                                                                       //
var _widget2 = _interopRequireDefault(_widget);                                                                        //
                                                                                                                       //
var _ramda = require('ramda');                                                                                         // 4
                                                                                                                       //
var _ramda2 = _interopRequireDefault(_ramda);                                                                          //
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 5
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"publications":{"_myTest.js":["/lib/collections","meteor/meteor","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/publications/_myTest.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  _meteor.Meteor.publish('posts.list', function () {                                                                   // 6
    var selector = {};                                                                                                 // 7
    var options = {                                                                                                    // 8
      fields: { _id: 1, title: 1 },                                                                                    // 9
      sort: { createdAt: -1 },                                                                                         // 10
      limit: 10                                                                                                        // 11
    };                                                                                                                 //
                                                                                                                       //
    return _collections.Posts.find(selector, options);                                                                 // 14
  });                                                                                                                  //
                                                                                                                       //
  _meteor.Meteor.publish('posts.single', function (postId) {                                                           // 17
    (0, _check.check)(postId, String);                                                                                 // 18
    var selector = { _id: postId };                                                                                    // 19
    return _collections.Posts.find(selector);                                                                          // 20
  });                                                                                                                  //
                                                                                                                       //
  _meteor.Meteor.publish('posts.comments', function (postId) {                                                         // 23
    (0, _check.check)(postId, String);                                                                                 // 24
    var selector = { postId: postId };                                                                                 // 25
    return _collections.Comments.find(selector);                                                                       // 26
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 1
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 2
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"convos.js":["/lib/collections","meteor/meteor","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/publications/convos.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var CONVOS_LIST = 'convos.list';                                                                                     // 6
  _meteor.Meteor.publish(CONVOS_LIST, function (_ref) {                                                                // 7
    var teamId = _ref.teamId;                                                                                          //
                                                                                                                       //
    (0, _check.check)(arguments[0], {                                                                                  // 8
      teamId: String                                                                                                   // 9
    });                                                                                                                //
                                                                                                                       //
    if (!this.userId) {                                                                                                // 12
      throw new _meteor.Meteor.Error(CONVOS_LIST, 'Must be logged in to get convos list.');                            // 13
    }                                                                                                                  //
    var team = _collections.Teams.findOne(teamId);                                                                     // 15
    if (!team.isUserInTeam(this.userId)) {                                                                             // 16
      throw new _meteor.Meteor.Error(CONVOS_LIST, 'Must be a member of team to get team convos list.');                // 17
    }                                                                                                                  //
                                                                                                                       //
    return _collections.Convos.find({ teamId: teamId, userIds: this.userId });                                         // 20
  });                                                                                                                  //
                                                                                                                       //
  var CONVOS_LIST_MULTI = 'convos.list.multi';                                                                         // 23
  _meteor.Meteor.publish(CONVOS_LIST_MULTI, function (_ref2) {                                                         // 24
    var _this = this;                                                                                                  //
                                                                                                                       //
    var teamIds = _ref2.teamIds;                                                                                       //
                                                                                                                       //
    (0, _check.check)(arguments[0], {                                                                                  // 25
      teamIds: [String]                                                                                                // 26
    });                                                                                                                //
                                                                                                                       //
    if (!this.userId) {                                                                                                // 29
      throw new _meteor.Meteor.Error(CONVOS_LIST_MULTI, 'Must be logged in to get convos list.');                      // 30
    }                                                                                                                  //
    var teams = _collections.Teams.find({ _id: { $in: teamIds } }).fetch();                                            // 32
    teams.forEach(function (team) {                                                                                    // 33
      if (!team.isUserInTeam(_this.userId)) {                                                                          // 34
        throw new _meteor.Meteor.Error(CONVOS_LIST_MULTI, 'Must be a member of team to get team convos list.');        // 35
      }                                                                                                                //
    });                                                                                                                //
    return _collections.Convos.find({ teamId: { $in: teamIds }, userIds: this.userId });                               // 38
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 1
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 2
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"index.js":["./_myTest","./teams","./convos","./msgs","./users","./notes","./sections","./notifications","./invites","./translations","./search",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/publications/index.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  (0, _myTest2['default'])();                                                                                          // 14
  (0, _teams2['default'])();                                                                                           // 15
  (0, _convos2['default'])();                                                                                          // 16
  (0, _msgs2['default'])();                                                                                            // 17
  (0, _users2['default'])();                                                                                           // 18
  (0, _notes2['default'])();                                                                                           // 19
  (0, _sections2['default'])();                                                                                        // 20
  (0, _notifications2['default'])();                                                                                   // 21
  (0, _invites2['default'])();                                                                                         // 22
  (0, _translations2['default'])();                                                                                    // 23
  (0, _search2['default'])();                                                                                          // 24
};                                                                                                                     //
                                                                                                                       //
var _myTest = require('./_myTest');                                                                                    // 1
                                                                                                                       //
var _myTest2 = _interopRequireDefault(_myTest);                                                                        //
                                                                                                                       //
var _teams = require('./teams');                                                                                       // 2
                                                                                                                       //
var _teams2 = _interopRequireDefault(_teams);                                                                          //
                                                                                                                       //
var _convos = require('./convos');                                                                                     // 3
                                                                                                                       //
var _convos2 = _interopRequireDefault(_convos);                                                                        //
                                                                                                                       //
var _msgs = require('./msgs');                                                                                         // 4
                                                                                                                       //
var _msgs2 = _interopRequireDefault(_msgs);                                                                            //
                                                                                                                       //
var _users = require('./users');                                                                                       // 5
                                                                                                                       //
var _users2 = _interopRequireDefault(_users);                                                                          //
                                                                                                                       //
var _notes = require('./notes');                                                                                       // 6
                                                                                                                       //
var _notes2 = _interopRequireDefault(_notes);                                                                          //
                                                                                                                       //
var _sections = require('./sections');                                                                                 // 7
                                                                                                                       //
var _sections2 = _interopRequireDefault(_sections);                                                                    //
                                                                                                                       //
var _notifications = require('./notifications');                                                                       // 8
                                                                                                                       //
var _notifications2 = _interopRequireDefault(_notifications);                                                          //
                                                                                                                       //
var _invites = require('./invites');                                                                                   // 9
                                                                                                                       //
var _invites2 = _interopRequireDefault(_invites);                                                                      //
                                                                                                                       //
var _translations = require('./translations');                                                                         // 10
                                                                                                                       //
var _translations2 = _interopRequireDefault(_translations);                                                            //
                                                                                                                       //
var _search = require('./search');                                                                                     // 11
                                                                                                                       //
var _search2 = _interopRequireDefault(_search);                                                                        //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"invites.js":["/lib/collections","meteor/meteor","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/publications/invites.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var INVITES_LIST = 'invites.list';                                                                                   // 6
  _meteor.Meteor.publish(INVITES_LIST, function () {                                                                   // 7
    var userId = this.userId;                                                                                          // 8
    if (!userId) {                                                                                                     // 9
      throw new _meteor.Meteor.Error(INVITES_LIST, 'Must be logged in to get invites list.');                          // 10
    }                                                                                                                  //
                                                                                                                       //
    return _collections.Invites.find({ userId: userId });                                                              // 13
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 1
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 2
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"msgs.js":["meteor/mongo","/lib/collections","meteor/meteor","meteor/check","ramda","/lib/constants/msgs",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/publications/msgs.js                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var MSGS_LIST = 'msgs.list';                                                                                         // 14
  _meteor.Meteor.publish(MSGS_LIST, function (_ref) {                                                                  // 15
    var convoId = _ref.convoId;                                                                                        //
    var currentNumMsgs = _ref.currentNumMsgs;                                                                          //
                                                                                                                       //
    (0, _check.check)(arguments[0], {                                                                                  // 16
      convoId: String,                                                                                                 // 17
      currentNumMsgs: Number                                                                                           // 18
    });                                                                                                                //
                                                                                                                       //
    if (!this.userId) {                                                                                                // 21
      throw new _meteor.Meteor.Error(MSGS_LIST, 'Must be logged in to get msgs list.');                                // 22
    }                                                                                                                  //
    var convo = _collections.Convos.findOne(convoId);                                                                  // 24
    if (!convo) {                                                                                                      // 25
      throw new _meteor.Meteor.Error(MSGS_LIST, 'Can only retrieve messages from an existing convo.');                 // 26
    }                                                                                                                  //
    if (!convo.isUserInConvo(this.userId)) {                                                                           // 28
      throw new _meteor.Meteor.Error(MSGS_LIST, 'Must be a member of convo to get convo\'s messages.');                // 29
    }                                                                                                                  //
    var team = _collections.Teams.findOne(convo.teamId);                                                               // 31
    if (!team) {                                                                                                       // 32
      throw new _meteor.Meteor.Error(MSGS_LIST, 'Can only get messages from an existing team.');                       // 33
    }                                                                                                                  //
    if (!team.isUserInTeam(this.userId)) {                                                                             // 35
      throw new _meteor.Meteor.Error(MSGS_LIST, 'Must be a member of convo\'s team to get msgs.');                     // 36
    }                                                                                                                  //
                                                                                                                       //
    var selector = { convoId: convoId };                                                                               // 39
    var optionsLimit = {                                                                                               // 40
      sort: [['createdAt', 'desc']],                                                                                   // 41
      limit: currentNumMsgs + _msgs.PUBLISH_INTERVAL                                                                   // 42
    };                                                                                                                 //
    var msgs = _collections.Messages.find(selector, optionsLimit).fetch();                                             // 44
    var oldestDate = !_ramda2['default'].isEmpty(msgs) ? _ramda2['default'].last(msgs).createdAt : new Date(0);        // 45
                                                                                                                       //
    // Selected by timestamp to prevent new msgs pushing previously seen msgs out                                      //
    // when newly created msgs come in                                                                                 //
    var selectorTime = { convoId: convoId, createdAt: { $gte: oldestDate } };                                          // 15
    var options = { sort: [['createdAt', 'asc']] };                                                                    // 50
                                                                                                                       //
    return [_collections.Messages.find(selectorTime, options), _meteor.Meteor.users.find({ _id: { $in: convo.userIds } }, { fields: othersFields })];
  });                                                                                                                  //
                                                                                                                       //
  var MSGS_SEARCH_RESULT_OLDER = 'msgs.searchResult';                                                                  // 58
  _meteor.Meteor.publish(MSGS_SEARCH_RESULT_OLDER, function (_ref2) {                                                  // 59
    var msgId = _ref2.msgId;                                                                                           //
    var oldestMsgId = _ref2.oldestMsgId;                                                                               //
    var newestMsgId = _ref2.newestMsgId;                                                                               //
                                                                                                                       //
    (0, _check.check)(arguments[0], {                                                                                  // 60
      msgId: String,                                                                                                   // 61
      oldestMsgId: _check.Match.Optional(_check.Match.OneOf(undefined, null, String)),                                 // 62
      newestMsgId: _check.Match.Optional(_check.Match.OneOf(undefined, null, String))                                  // 63
    });                                                                                                                //
                                                                                                                       //
    var userId = this.userId;                                                                                          // 66
    if (!userId) {                                                                                                     // 67
      throw new _meteor.Meteor.Error(MSGS_SEARCH_RESULT_OLDER, 'Must be logged in to get search results.');            // 68
    }                                                                                                                  //
    var msg = _collections.Messages.findOne(msgId);                                                                    // 70
    if (!msg) {                                                                                                        // 71
      throw new _meteor.Meteor.Error(MSGS_SEARCH_RESULT_OLDER, 'Must get the results of an existing message.');        // 72
    }                                                                                                                  //
    var convoId = msg.convoId;                                                                                         // 74
    var convo = _collections.Convos.findOne(convoId);                                                                  // 75
    if (!convo) {                                                                                                      // 76
      throw new _meteor.Meteor.Error(MSGS_SEARCH_RESULT_OLDER, 'Must get the results of an existing convo.');          // 77
    }                                                                                                                  //
    if (!convo.isUserInConvo) {                                                                                        // 79
      throw new _meteor.Meteor.Error(MSGS_SEARCH_RESULT_OLDER, 'Must be a member of convo to search it.');             // 80
    }                                                                                                                  //
    var team = _collections.Teams.findOne(convo.teamId);                                                               // 82
    if (!team) {                                                                                                       // 83
      throw new _meteor.Meteor.Error(MSGS_SEARCH_RESULT_OLDER, 'Must get the results of an existing team.');           // 84
    }                                                                                                                  //
    if (!team.isUserInTeam(this.userId)) {                                                                             // 86
      throw new _meteor.Meteor.Error(MSGS_SEARCH_RESULT_OLDER, 'Must be a member of team to search it.');              // 87
    }                                                                                                                  //
    if (oldestMsgId) {                                                                                                 // 89
      if (!_collections.Messages.findOne(oldestMsgId)) {                                                               // 90
        throw new _meteor.Meteor.Error(MSGS_SEARCH_RESULT_OLDER, 'Oldest message id must belong to an existing message.');
      }                                                                                                                //
    }                                                                                                                  //
                                                                                                                       //
    function _getOldestDate() {                                                                                        // 95
      var _getSelector = function () {                                                                                 // 96
        function _getSelector() {                                                                                      // 96
          if (!oldestMsgId) {                                                                                          // 97
            return { convoId: convoId, createdAt: { $lte: msg.createdAt } };                                           // 97
          }                                                                                                            //
                                                                                                                       //
          var oldestMsg = _collections.Messages.findOne(oldestMsgId);                                                  // 99
          return { convoId: convoId, createdAt: { $lte: oldestMsg.createdAt } };                                       // 100
        }                                                                                                              //
                                                                                                                       //
        return _getSelector;                                                                                           //
      }();                                                                                                             //
                                                                                                                       //
      var options = {                                                                                                  // 103
        sort: [['createdAt', 'desc']],                                                                                 // 104
        limit: _msgs.PUBLISH_INTERVAL                                                                                  // 105
      };                                                                                                               //
                                                                                                                       //
      var msgs = _collections.Messages.find(_getSelector(), options).fetch();                                          // 108
      return !_ramda2['default'].isEmpty(msgs) ? _ramda2['default'].last(msgs).createdAt : new Date(0);                // 109
    }                                                                                                                  //
                                                                                                                       //
    function _getNewestDate() {                                                                                        // 112
      var _getSelector = function () {                                                                                 // 113
        function _getSelector() {                                                                                      // 113
          if (!newestMsgId) {                                                                                          // 114
            return { convoId: msg.convoId, createdAt: { $gte: msg.createdAt } };                                       // 114
          }                                                                                                            //
                                                                                                                       //
          var newestMsg = _collections.Messages.findOne(newestMsgId);                                                  // 116
          return { convoId: convoId, createdAt: { $gte: newestMsg.createdAt } };                                       // 117
        }                                                                                                              //
                                                                                                                       //
        return _getSelector;                                                                                           //
      }();                                                                                                             //
      var options = {                                                                                                  // 119
        sort: [['createdAt', 'asc']],                                                                                  // 120
        limit: _msgs.PUBLISH_INTERVAL                                                                                  // 121
      };                                                                                                               //
                                                                                                                       //
      var msgs = _collections.Messages.find(_getSelector(), options).fetch();                                          // 124
      return !_ramda2['default'].isEmpty(msgs) ? _ramda2['default'].last(msgs).createdAt : new Date(0);                // 125
    }                                                                                                                  //
                                                                                                                       //
    // Publish older msgs using time threshold                                                                         //
    var optionsAsc = { sort: [['createdAt', 'asc']] };                                                                 // 59
    var selectorTimeOld = {                                                                                            // 130
      convoId: convoId,                                                                                                // 131
      createdAt: { $gte: _getOldestDate(), $lte: msg.createdAt }                                                       // 132
    };                                                                                                                 //
    _mongo.Mongo.Collection._publishCursor(_collections.Messages.find(selectorTimeOld, optionsAsc), this, 'searchMessages');
                                                                                                                       //
    // Publish newer msgs using time threshold                                                                         //
    var selectorTimeNew = {                                                                                            // 59
      convoId: convoId,                                                                                                // 139
      createdAt: { $lte: _getNewestDate(), $gte: msg.createdAt }                                                       // 140
    };                                                                                                                 //
    _mongo.Mongo.Collection._publishCursor(_collections.Messages.find(selectorTimeNew, optionsAsc), this, 'searchMessages');
                                                                                                                       //
    // Users                                                                                                           //
    var userSelector = { _id: { $in: convo.userIds } };                                                                // 59
    var userOptions = { fields: othersFields };                                                                        // 147
    _mongo.Mongo.Collection._publishCursor(_meteor.Meteor.users.find(userSelector, userOptions), this, 'users');       // 148
                                                                                                                       //
    this.ready();                                                                                                      // 150
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _mongo = require('meteor/mongo');                                                                                  // 1
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 2
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 3
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 4
                                                                                                                       //
var _ramda = require('ramda');                                                                                         // 5
                                                                                                                       //
var _ramda2 = _interopRequireDefault(_ramda);                                                                          //
                                                                                                                       //
var _msgs = require('/lib/constants/msgs');                                                                            // 6
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
                                                                                                                       //
var othersFields = {                                                                                                   // 8
  username: 1,                                                                                                         // 9
  roles: 1                                                                                                             // 10
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"notes.js":["/lib/collections","meteor/meteor","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/publications/notes.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var NOTES_SINGLE = 'notes.single';                                                                                   // 6
  _meteor.Meteor.publish(NOTES_SINGLE, function (_ref) {                                                               // 7
    var convoId = _ref.convoId;                                                                                        //
                                                                                                                       //
    (0, _check.check)(arguments[0], {                                                                                  // 8
      convoId: String                                                                                                  // 9
    });                                                                                                                //
                                                                                                                       //
    if (!this.userId) {                                                                                                // 12
      throw new _meteor.Meteor.Error(NOTES_SINGLE, 'Must be logged in to get note.');                                  // 13
    }                                                                                                                  //
    var convo = _collections.Convos.findOne(convoId);                                                                  // 15
    if (!convo) {                                                                                                      // 16
      throw new _meteor.Meteor.Error(NOTES_SINGLE, 'Must get a note from an existing convo.');                         // 17
    }                                                                                                                  //
    var team = _collections.Teams.findOne(convo.teamId);                                                               // 19
    if (!team) {                                                                                                       // 20
      throw new _meteor.Meteor.Error(NOTES_SINGLE, 'Must get a note from a convo in an existing team.');               // 21
    }                                                                                                                  //
    if (!team.isUserInTeam(this.userId)) {                                                                             // 23
      throw new _meteor.Meteor.Error(NOTES_SINGLE, 'Must be a member of team to get note.');                           // 24
    }                                                                                                                  //
    if (!convo.isUserInConvo(this.userId)) {                                                                           // 26
      throw new _meteor.Meteor.Error(NOTES_SINGLE, 'Must be a member of convo to get the convo\'s note.');             // 27
    }                                                                                                                  //
                                                                                                                       //
    var note = _collections.Notes.findOne({ convoId: convoId });                                                       // 30
    var noteId = note._id;                                                                                             // 31
                                                                                                                       //
    return [_collections.Notes.find({ convoId: convoId }), _collections.Widgets.find({ noteId: noteId }), _collections.Locks.find({ noteId: noteId })];
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 1
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 2
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"notifications.js":["/lib/collections","meteor/meteor","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/publications/notifications.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var NOTIFICATIONS_LIST = 'notifications.list';                                                                       // 6
  _meteor.Meteor.publish(NOTIFICATIONS_LIST, function (_ref) {                                                         // 7
    var teamId = _ref.teamId;                                                                                          //
    var convoId = _ref.convoId;                                                                                        //
                                                                                                                       //
    (0, _check.check)(arguments[0], {                                                                                  // 8
      teamId: String,                                                                                                  // 9
      convoId: _check.Match.Optional(_check.Match.OneOf(undefined, null, String))                                      // 10
    });                                                                                                                //
                                                                                                                       //
    if (!this.userId) {                                                                                                // 13
      throw new _meteor.Meteor.Error(NOTIFICATIONS_LIST, 'Must be logged in to get notifications.');                   // 14
    }                                                                                                                  //
    var team = _collections.Teams.findOne(teamId);                                                                     // 16
    if (!team) {                                                                                                       // 17
      throw new _meteor.Meteor.Error(NOTIFICATIONS_LIST, 'Must be a member of team to get notifications from it.');    // 18
    }                                                                                                                  //
                                                                                                                       //
    return _collections.Notifications.find({                                                                           // 22
      userId: this.userId,                                                                                             // 23
      teamId: teamId,                                                                                                  // 24
      convoId: { $ne: convoId }                                                                                        // 25
    });                                                                                                                //
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 1
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 2
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"search.js":["meteor/mongo","/lib/collections","meteor/meteor","meteor/check","ramda","./users",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/publications/search.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var SEARCH_RESULTS = 'search.results';                                                                               // 16
  _meteor.Meteor.publish(SEARCH_RESULTS, function (_ref) {                                                             // 17
    var _this = this;                                                                                                  //
                                                                                                                       //
    var teamId = _ref.teamId;                                                                                          //
    var text = _ref.text;                                                                                              //
                                                                                                                       //
    (0, _check.check)(arguments[0], {                                                                                  // 18
      teamId: String,                                                                                                  // 19
      text: String                                                                                                     // 20
    });                                                                                                                //
                                                                                                                       //
    var userId = this.userId;                                                                                          // 23
    if (!userId) {                                                                                                     // 24
      throw new _meteor.Meteor.Error(SEARCH_RESULTS, 'Must be logged in to search.');                                  // 25
    }                                                                                                                  //
    var team = _collections.Teams.findOne(teamId);                                                                     // 27
    if (!team) {                                                                                                       // 28
      throw new _meteor.Meteor.Error(SEARCH_RESULTS, 'Must search an existing team.');                                 // 29
    }                                                                                                                  //
    if (!team.isUserMember(userId)) {                                                                                  // 31
      throw new _meteor.Meteor.Error(SEARCH_RESULTS, 'Must be a member of a team to search it.');                      // 32
    }                                                                                                                  //
                                                                                                                       //
    var convosUserIsMember = _collections.Convos.find({ userIds: userId });                                            // 35
    var convoIds = convosUserIsMember.map(function (convo) {                                                           // 36
      return convo._id;                                                                                                //
    });                                                                                                                //
                                                                                                                       //
    var _getMsgs = function () {                                                                                       // 38
      function _getMsgs() {                                                                                            // 38
        var selector = {                                                                                               // 39
          convoId: { $in: convoIds },                                                                                  // 40
          $text: { $search: text }                                                                                     // 41
        };                                                                                                             //
        var options = {                                                                                                // 43
          fields: { score: { $meta: 'textScore' } },                                                                   // 44
          sort: { score: { $meta: 'textScore' } },                                                                     // 45
          limit: 10                                                                                                    // 46
        };                                                                                                             //
        _mongo.Mongo.Collection._publishCursor(_collections.Messages.find(selector, options), _this, 'searchMessages');
      }                                                                                                                //
                                                                                                                       //
      return _getMsgs;                                                                                                 //
    }();                                                                                                               //
                                                                                                                       //
    var _getConvos = function () {                                                                                     // 52
      function _getConvos() {                                                                                          // 52
        var selector = {                                                                                               // 53
          userIds: userId,                                                                                             // 54
          $text: { $search: text }                                                                                     // 55
        };                                                                                                             //
        var options = {                                                                                                // 57
          fields: { score: { $meta: 'textScore' } },                                                                   // 58
          sort: { score: { $meta: 'textScore' } },                                                                     // 59
          limit: 10                                                                                                    // 60
        };                                                                                                             //
        _mongo.Mongo.Collection._publishCursor(_collections.Convos.find(selector, options), _this, 'convos');          // 62
      }                                                                                                                //
                                                                                                                       //
      return _getConvos;                                                                                               //
    }();                                                                                                               //
                                                                                                                       //
    var _getUsers = function () {                                                                                      // 66
      function _getUsers() {                                                                                           // 66
        var _ref2, _ref3;                                                                                              //
                                                                                                                       //
        var regExp = buildRegExp(text);                                                                                // 67
        var selector = {                                                                                               // 68
          $and: [{                                                                                                     // 69
            $or: [(_ref2 = {}, _ref2['roles.' + teamId] = 'admin', _ref2), (_ref3 = {}, _ref3['roles.' + teamId] = 'member', _ref3)]
          }, {                                                                                                         //
            $or: [{ username: regExp }, { 'emails.address': regExp }]                                                  // 77
          }]                                                                                                           //
          // $text: { $search: text }                                                                                  //
        };                                                                                                             // 68
                                                                                                                       //
        var fieldsObj = _ramda2['default'].merge({                                                                     // 86
          // score: { $meta: 'textScore' }                                                                             //
        }, _users.othersFields);                                                                                       //
                                                                                                                       //
        var options = {                                                                                                // 90
          fields: fieldsObj,                                                                                           // 91
          // sort: { score: { $meta: 'textScore' } },                                                                  //
          limit: 10                                                                                                    // 93
        };                                                                                                             //
        _mongo.Mongo.Collection._publishCursor(_meteor.Meteor.users.find(selector, options), _this, 'users');          // 95
      }                                                                                                                //
                                                                                                                       //
      return _getUsers;                                                                                                //
    }();                                                                                                               //
                                                                                                                       //
    _getMsgs();                                                                                                        // 99
    _getConvos();                                                                                                      // 100
    _getUsers();                                                                                                       // 101
                                                                                                                       //
    this.ready();                                                                                                      // 103
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _mongo = require('meteor/mongo');                                                                                  // 1
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 2
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 3
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 4
                                                                                                                       //
var _ramda = require('ramda');                                                                                         // 5
                                                                                                                       //
var _ramda2 = _interopRequireDefault(_ramda);                                                                          //
                                                                                                                       //
var _users = require('./users');                                                                                       // 6
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
                                                                                                                       //
var buildRegExp = function buildRegExp(searchText) {                                                                   // 8
  var words = searchText.trim().split(/[ \-\:]+/);                                                                     // 9
  var exps = words.map(function (word) {                                                                               // 10
    return '(?=.*' + word + ')';                                                                                       //
  });                                                                                                                  //
  var fullExp = exps.join('') + '.+';                                                                                  // 11
  return new RegExp(fullExp, 'i');                                                                                     // 12
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"sections.js":["/lib/collections","meteor/meteor","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/publications/sections.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var SECTIONS = 'sections';                                                                                           // 6
  _meteor.Meteor.publish(SECTIONS, function (_ref) {                                                                   // 7
    var noteId = _ref.noteId;                                                                                          //
                                                                                                                       //
    (0, _check.check)(arguments[0], {                                                                                  // 8
      noteId: String                                                                                                   // 9
    });                                                                                                                //
                                                                                                                       //
    if (!this.userId) {                                                                                                // 12
      throw new _meteor.Meteor.Error(SECTIONS, 'Must be logged in to get note sections.');                             // 13
    }                                                                                                                  //
    var note = _collections.Notes.findOne(noteId);                                                                     // 15
    if (!note) {                                                                                                       // 16
      throw new _meteor.Meteor.Error(SECTIONS, 'Must get sections from existing note.');                               // 17
    }                                                                                                                  //
    var convo = _collections.Convos.findOne(note.convoId);                                                             // 19
    if (!convo) {                                                                                                      // 20
      throw new _meteor.Meteor.Error(SECTIONS, 'Must get a note from an existing convo.');                             // 21
    }                                                                                                                  //
    if (!convo.isUserInConvo(this.userId)) {                                                                           // 23
      throw new _meteor.Meteor.Error(SECTIONS, 'Must be a member of convo to get the convo\'s note.');                 // 24
    }                                                                                                                  //
                                                                                                                       //
    return _collections.Sections.find({ noteId: noteId });                                                             // 27
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 1
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 2
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"teams.js":["/lib/collections","meteor/meteor","meteor/check","ramda",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/publications/teams.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var TEAMS_LIST = 'teams.list';                                                                                       // 13
  _meteor.Meteor.publish(TEAMS_LIST, function (args) {                                                                 // 14
    (0, _check.check)(args, _check.Match.Optional(_check.Match.OneOf(undefined, null, Object))); // Use this until Match.Maybe works, https://github.com/meteor/meteor/issues/3876
    if (args) {                                                                                                        // 14
      (0, _check.check)(args, {                                                                                        // 17
        teamId: _check.Match.Optional(_check.Match.OneOf(undefined, null, String)),                                    // 18
        convoId: _check.Match.Optional(_check.Match.OneOf(undefined, null, String))                                    // 19
      });                                                                                                              //
    }                                                                                                                  //
                                                                                                                       //
    var userId = this.userId;                                                                                          // 23
    if (!userId) {                                                                                                     // 24
      throw new _meteor.Meteor.Error(TEAMS_LIST, 'Must be logged in to get teams list.');                              // 25
    }                                                                                                                  //
                                                                                                                       //
    // Notifications                                                                                                   //
    function mergeTeamId(selectObj) {                                                                                  // 14
      if (!args) {                                                                                                     // 30
        return selectObj;                                                                                              // 30
      }                                                                                                                //
      if (args.teamId) {                                                                                               // 31
        return _ramda2['default'].merge(selectObj, { teamId: { $ne: args.teamId } });                                  // 31
      }                                                                                                                //
      return selectObj;                                                                                                // 32
    }                                                                                                                  //
    function mergeConvoId(selectObj) {                                                                                 // 34
      if (!args) {                                                                                                     // 35
        return selectObj;                                                                                              // 35
      }                                                                                                                //
      if (args.convoId) {                                                                                              // 36
        return _ramda2['default'].merge(selectObj, { convoId: { $ne: args.convoId } });                                // 36
      }                                                                                                                //
      return selectObj;                                                                                                // 37
    }                                                                                                                  //
    var getSelector = _ramda2['default'].compose(mergeConvoId, mergeTeamId);                                           // 39
    var selectUserId = { userId: userId };                                                                             // 40
    var notifsSelector = getSelector(selectUserId);                                                                    // 41
                                                                                                                       //
    return [_collections.Teams.find({ userIds: userId }), _collections.Notifications.find(notifsSelector), _collections.Invites.find()];
  });                                                                                                                  //
                                                                                                                       //
  var TEAMS_SINGLE = 'teams.single';                                                                                   // 50
  _meteor.Meteor.publish(TEAMS_SINGLE, function (_ref) {                                                               // 51
    var _userFields, _userSelector;                                                                                    //
                                                                                                                       //
    var teamId = _ref.teamId;                                                                                          //
                                                                                                                       //
    (0, _check.check)(arguments[0], {                                                                                  // 52
      teamId: String                                                                                                   // 53
    });                                                                                                                //
                                                                                                                       //
    var userId = this.userId;                                                                                          // 56
    if (!userId) {                                                                                                     // 57
      throw new _meteor.Meteor.Error(TEAMS_SINGLE, 'Must be logged in to get team.');                                  // 58
    }                                                                                                                  //
    var team = _collections.Teams.findOne(teamId);                                                                     // 60
    if (!team.isUserInTeam(userId)) {                                                                                  // 61
      throw new _meteor.Meteor.Error(TEAMS_SINGLE, 'Must be a member of team to get team info.');                      // 62
    }                                                                                                                  //
                                                                                                                       //
    var userFields = (_userFields = {                                                                                  // 65
      username: 1                                                                                                      // 66
    }, _userFields['roles.' + teamId] = 1, _userFields.emails = 1, _userFields);                                       //
    var userSelector = (_userSelector = {}, _userSelector['roles.' + teamId] = { $exists: true }, _userSelector);      // 70
                                                                                                                       //
    return [_meteor.Meteor.users.find(userSelector, { fields: userFields }), _collections.Teams.find(teamId), _collections.Invites.find({ teamId: teamId })];
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 1
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 2
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 3
                                                                                                                       //
var _ramda = require('ramda');                                                                                         // 4
                                                                                                                       //
var _ramda2 = _interopRequireDefault(_ramda);                                                                          //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"translations.js":["/lib/collections","meteor/meteor","meteor/check",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/publications/translations.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var TRANSLATIONS_LIST = 'translations.list';                                                                         // 6
  _meteor.Meteor.publish(TRANSLATIONS_LIST, function (_ref) {                                                          // 7
    var msgIds = _ref.msgIds;                                                                                          //
    var convoId = _ref.convoId;                                                                                        //
                                                                                                                       //
    (0, _check.check)(arguments[0], {                                                                                  // 8
      msgIds: [String],                                                                                                // 9
      convoId: String                                                                                                  // 10
    });                                                                                                                //
                                                                                                                       //
    var userId = this.userId;                                                                                          // 13
    if (!userId) {                                                                                                     // 14
      throw new _meteor.Meteor.Error(TRANSLATIONS_LIST, 'Must be logged in to get translations.');                     // 15
    }                                                                                                                  //
    var user = _meteor.Meteor.users.findOne(userId);                                                                   // 17
    var convo = _collections.Convos.findOne(convoId);                                                                  // 18
    if (!convo) {                                                                                                      // 19
      throw new _meteor.Meteor.Error(TRANSLATIONS_LIST, 'Must get translations from an existing convo.');              // 20
    }                                                                                                                  //
    var team = _collections.Teams.findOne(convo.teamId);                                                               // 22
    if (!team) {                                                                                                       // 23
      throw new _meteor.Meteor.Error(TRANSLATIONS_LIST, 'Must get translations from a convo in an existing team.');    // 24
    }                                                                                                                  //
    if (!team.isUserInTeam(this.userId)) {                                                                             // 27
      throw new _meteor.Meteor.Error(TRANSLATIONS_LIST, 'Must be a member of team to get translations.');              // 28
    }                                                                                                                  //
    if (!convo.isUserInConvo(this.userId)) {                                                                           // 30
      throw new _meteor.Meteor.Error(TRANSLATIONS_LIST, 'Must be a member of convo to get the convo\'s translations.');
    }                                                                                                                  //
                                                                                                                       //
    var langCode = user.translationLangCode;                                                                           // 35
    return _collections.Translations.find({ convoId: convoId, msgId: { $in: msgIds }, langCode: langCode });           // 36
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 1
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 2
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"users.js":["meteor/meteor","/lib/collections","meteor/check","ramda",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/publications/users.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
exports.othersFields = undefined;                                                                                      //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  var SELF = 'self';                                                                                                   // 20
  _meteor.Meteor.publish(null, function () {                                                                           // 21
    if (!this.userId) {                                                                                                // 22
      throw new _meteor.Meteor.Error(SELF, 'Must be logged in to get self data.');                                     // 23
    }                                                                                                                  //
                                                                                                                       //
    return _meteor.Meteor.users.find(this.userId, { fields: selfFields });                                             // 26
  });                                                                                                                  //
                                                                                                                       //
  var USERS_LIST = 'users.list';                                                                                       // 29
  _meteor.Meteor.publish(USERS_LIST, function () {                                                                     // 30
    if (!this.userId) {                                                                                                // 31
      throw new _meteor.Meteor.Error(USERS_LIST, 'Must be logged in to get users list.');                              // 32
    }                                                                                                                  //
    return _meteor.Meteor.users.find(null, { fields: othersFields });                                                  // 34
  });                                                                                                                  //
                                                                                                                       //
  var USERS_TEAM = 'users.team';                                                                                       // 37
  _meteor.Meteor.publish(USERS_TEAM, function (_ref) {                                                                 // 38
    var _R$merge, _selector;                                                                                           //
                                                                                                                       //
    var teamId = _ref.teamId;                                                                                          //
                                                                                                                       //
    (0, _check.check)(arguments[0], {                                                                                  // 39
      teamId: String                                                                                                   // 40
    });                                                                                                                //
                                                                                                                       //
    if (!this.userId) {                                                                                                // 43
      throw new _meteor.Meteor.Error(USERS_TEAM, 'Must be logged in to get team users list.');                         // 44
    }                                                                                                                  //
    var team = _collections.Teams.findOne(teamId);                                                                     // 46
    if (!team) {                                                                                                       // 47
      throw new _meteor.Meteor.Error(USERS_TEAM, 'Must get users from an existing team.');                             // 48
    }                                                                                                                  //
    if (!team.isUserInTeam(this.userId)) {                                                                             // 50
      throw new _meteor.Meteor.Error(USERS_TEAM, 'Must be a part of team to get team users list.');                    // 51
    }                                                                                                                  //
                                                                                                                       //
    var fields = _ramda2['default'].merge(othersFields, (_R$merge = {}, _R$merge['roles.' + teamId] = 1, _R$merge));   // 54
    var selector = (_selector = {}, _selector['roles.' + teamId] = { $exists: true }, _selector);                      // 57
    return _meteor.Meteor.users.find(selector, { fields: fields });                                                    // 60
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 1
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 2
                                                                                                                       //
var _check = require('meteor/check');                                                                                  // 3
                                                                                                                       //
var _ramda = require('ramda');                                                                                         // 4
                                                                                                                       //
var _ramda2 = _interopRequireDefault(_ramda);                                                                          //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
                                                                                                                       //
var selfFields = {                                                                                                     // 6
  lastTimeInConvo: 1,                                                                                                  // 7
  lastTimeInTeam: 1,                                                                                                   // 8
  profileImageUrl: 1,                                                                                                  // 9
  translationLangCode: 1                                                                                               // 10
};                                                                                                                     //
                                                                                                                       //
var othersFields = exports.othersFields = {                                                                            // 13
  username: 1,                                                                                                         // 14
  emails: 1,                                                                                                           // 15
  profileImageUrl: 1                                                                                                   // 16
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"SearchSource.js":["meteor/meteor","meteor/meteorhacks:search-source",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/SearchSource.js                                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
exports.buildRegExp = undefined;                                                                                       //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  _meteorhacksSearchSource.SearchSource.defineSource('allUsers', function (searchText, _options) {                     // 12
    var defaultOptions = {                                                                                             // 13
      sort: { username: 1 },                                                                                           // 14
      limit: 10,                                                                                                       // 15
      fields: { username: 1, emails: 1 }                                                                               // 16
    };                                                                                                                 //
    var options = _options ? _options : defaultOptions;                                                                // 18
                                                                                                                       //
    if (searchText) {                                                                                                  // 20
      var regExp = buildRegExp(searchText);                                                                            // 21
      var selector = { $or: [{ username: regExp }, { 'emails.address': regExp }] };                                    // 22
      return _meteor.Meteor.users.find(selector, options).fetch();                                                     // 26
    }                                                                                                                  //
    return [];                                                                                                         // 28
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 1
                                                                                                                       //
var _meteorhacksSearchSource = require('meteor/meteorhacks:search-source');                                            // 2
                                                                                                                       //
var buildRegExp = exports.buildRegExp = function buildRegExp(searchText) {                                             // 4
  var words = searchText.trim().split(/[ \-\:]+/);                                                                     // 5
  var exps = words.map(function (word) {                                                                               // 6
    return '(?=.*' + word + ')';                                                                                       //
  });                                                                                                                  //
  var fullExp = exps.join('') + '.+';                                                                                  // 7
  return new RegExp(fullExp, 'i');                                                                                     // 8
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"cloudinary.js":["meteor/meteor","meteor/lepozepo:cloudinary",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/cloudinary.js                                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  _lepozepoCloudinary.Cloudinary.config({                                                                              // 5
    cloud_name: _meteor.Meteor.settings.cloudinary.cloud_name,                                                         // 6
    api_key: _meteor.Meteor.settings.cloudinary.api_key,                                                               // 7
    api_secret: _meteor.Meteor.settings.cloudinary.api_secret                                                          // 8
  });                                                                                                                  //
};                                                                                                                     //
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 1
                                                                                                                       //
var _lepozepoCloudinary = require('meteor/lepozepo:cloudinary');                                                       // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"email.js":["meteor/meteor","/lib/collections","ramda","lodash",function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/email.js                                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
exports.__esModule = true;                                                                                             //
                                                                                                                       //
exports['default'] = function () {                                                                                     //
  _meteor.Meteor.startup(function () {                                                                                 // 7
    var isLocalhost = _meteor.Meteor.absoluteUrl().indexOf('localhost') > -1;                                          // 8
    console.log('isLocalhost ' + _meteor.Meteor.absoluteUrl() + ' ' + isLocalhost);                                    // 9
    if (!isLocalhost) {                                                                                                // 10
      var username = encodeURIComponent(_meteor.Meteor.settings.mailgun.address);                                      // 11
      var password = encodeURIComponent(_meteor.Meteor.settings.mailgun.password);                                     // 12
      var host = encodeURIComponent('smtp.mailgun.org');                                                               // 13
      var port = 587;                                                                                                  // 14
                                                                                                                       //
      process.env.MAIL_URL = 'smtp://' + username + ':' + password + '@' + host + ':' + port;                          // 16
    }                                                                                                                  //
  });                                                                                                                  //
                                                                                                                       //
  Accounts.urls.enrollAccount = function (token) {                                                                     // 20
    return _meteor.Meteor.absoluteUrl('invite/' + token);                                                              // 21
  };                                                                                                                   //
  Accounts.urls.resetPassword = function (token) {                                                                     // 23
    return _meteor.Meteor.absoluteUrl('reset/' + token);                                                               // 24
  };                                                                                                                   //
                                                                                                                       //
  Accounts.emailTemplates.siteName = 'Olis';                                                                           // 27
  Accounts.emailTemplates.from = 'Olis <contact.aheadstudios@gmail.com>';                                              // 28
                                                                                                                       //
  // Enroll account email                                                                                              //
  Accounts.emailTemplates.enrollAccount.subject = function (user) {                                                    // 6
    console.log('enrollAccount subject');                                                                              // 32
    console.log(user);                                                                                                 // 33
                                                                                                                       //
    // const prepend = `Welcome to Olis, ${user.username}!`;                                                           //
    // const text =                                                                                                    //
    //   user.invitedBy ? `${prepend} An account has been created for you by ${user.invitedBy}.` :                     //
    //   `${prepend}`;                                                                                                 //
    var text = user.invitedBy ? user.invitedBy + ' has invited you to join Olis' : 'Welcome to Olis!';                 // 31
    return text;                                                                                                       // 40
  };                                                                                                                   //
                                                                                                                       //
  Accounts.emailTemplates.enrollAccount.text = function (user, url) {                                                  // 43
    console.log('enrollAccount text');                                                                                 // 44
    console.log(user);                                                                                                 // 45
    var team = _collections.Teams.findOne(_ramda2['default'].keys(user.roles)[0]);                                     // 46
                                                                                                                       //
    var append = 'In order to setup your account, click the link below:\n\n\n      ' + url;                            // 48
                                                                                                                       //
    if (user.invitedBy) {                                                                                              // 52
      _meteor.Meteor.users.update(user._id, {                                                                          // 53
        $unset: { invitedBy: '' }                                                                                      // 54
      });                                                                                                              //
      var text = user.invitedBy + ' has invited you to join ' + team.name + ', their team on Olis. \n\n' + append;     // 56
      return text;                                                                                                     // 57
    }                                                                                                                  //
                                                                                                                       //
    if (user.findingMyTeam) {                                                                                          // 60
      _meteor.Meteor.users.update(user._id, {                                                                          // 61
        $unset: { findingMyTeam: '' }                                                                                  // 62
      });                                                                                                              //
                                                                                                                       //
      var teams = _collections.Teams.find({ userIds: user._id }).fetch();                                              // 65
      var teamsList = teams.reduce(function (prev, curr) {                                                             // 66
        if (prev === '') {                                                                                             // 67
          return curr.name + '\n';                                                                                     // 67
        }                                                                                                              //
        return prev + '\n' + curr.name + '\n';                                                                         // 68
      }, '');                                                                                                          //
                                                                                                                       //
      var _text = 'Here are a list of the teams you belong to:\n\n\n        ' + teamsList + '\n\n        ' + append;   // 71
      return _text;                                                                                                    // 74
    }                                                                                                                  //
    return append;                                                                                                     // 76
  };                                                                                                                   //
                                                                                                                       //
  // Reset password email                                                                                              //
  Accounts.emailTemplates.resetPassword.subject = function (user) {                                                    // 6
    // console.log('resetPassword subject');                                                                           //
    // console.log(user);                                                                                              //
    if (user.isRegistering || !_lodash2['default'].has(user, 'services.password.bcrypt')) {                            // 83
      return 'Welcome to Olis ' + user.username + '! Set Your Olis Account Password.';                                 // 84
    }                                                                                                                  //
    return 'Reset Your Olis Account Password';                                                                         // 86
  };                                                                                                                   //
  Accounts.emailTemplates.resetPassword.text = function (user, url) {                                                  // 88
    // console.log('resetPassword text');                                                                              //
    // console.log(user);                                                                                              //
                                                                                                                       //
    if (user.isRegistering || !_lodash2['default'].has(user, 'services.password.bcrypt')) {                            // 92
      _meteor.Meteor.users.update(user._id, {                                                                          // 93
        $unset: { isRegistering: '' }                                                                                  // 94
      });                                                                                                              //
                                                                                                                       //
      var _text2 = 'To setup your password so that you can log into your account, click the link below:\n\n\n        ' + url;
      return _text2;                                                                                                   // 99
    }                                                                                                                  //
    var text = 'If you did not recently request to reset your password, you can ignore this email.\n\n      To reset your password, click the link below:\n\n\n      ' + url;
    return text;                                                                                                       // 104
  };                                                                                                                   //
};                                                                                                                     //
                                                                                                                       //
var _meteor = require('meteor/meteor');                                                                                // 1
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 2
                                                                                                                       //
var _ramda = require('ramda');                                                                                         // 3
                                                                                                                       //
var _ramda2 = _interopRequireDefault(_ramda);                                                                          //
                                                                                                                       //
var _lodash = require('lodash');                                                                                       // 4
                                                                                                                       //
var _lodash2 = _interopRequireDefault(_lodash);                                                                        //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"main.js":["./publications","./methods","./email","./SearchSource","./cloudinary","/lib/collections",function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/main.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _publications = require('./publications');                                                                         // 1
                                                                                                                       //
var _publications2 = _interopRequireDefault(_publications);                                                            //
                                                                                                                       //
var _methods = require('./methods');                                                                                   // 2
                                                                                                                       //
var _methods2 = _interopRequireDefault(_methods);                                                                      //
                                                                                                                       //
var _email = require('./email');                                                                                       // 3
                                                                                                                       //
var _email2 = _interopRequireDefault(_email);                                                                          //
                                                                                                                       //
var _SearchSource = require('./SearchSource');                                                                         // 4
                                                                                                                       //
var _SearchSource2 = _interopRequireDefault(_SearchSource);                                                            //
                                                                                                                       //
var _cloudinary = require('./cloudinary');                                                                             // 5
                                                                                                                       //
var _cloudinary2 = _interopRequireDefault(_cloudinary);                                                                //
                                                                                                                       //
var _collections = require('/lib/collections');                                                                        // 6
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                      //
                                                                                                                       //
(0, _publications2['default'])();                                                                                      // 8
(0, _methods2['default'])();                                                                                           // 9
(0, _email2['default'])();                                                                                             // 10
(0, _SearchSource2['default'])();                                                                                      // 11
(0, _cloudinary2['default'])();                                                                                        // 12
(0, _collections.buildIndexes)();                                                                                      // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"wallaby.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// wallaby.js                                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = function (wallaby) {                                                                                  // 1
  // There is a weird error with the mui and mantra.                                                                   //
  // See: https://goo.gl/cLH8ib                                                                                        //
  // Using require here seems to be the error.                                                                         //
  // Renaming it into `load` just fixed the issue.                                                                     //
  var load = require;                                                                                                  // 6
                                                                                                                       //
  return {                                                                                                             // 8
    files: ['client/modules/**/components/*.jsx', 'client/modules/**/actions/*.js', 'client/modules/**/containers/*.js', 'client/modules/**/libs/*.js'],
    tests: ['client/**/tests/*.js'],                                                                                   // 15
    compilers: {                                                                                                       // 18
      '**/*.js*': wallaby.compilers.babel({                                                                            // 19
        babel: load('babel-core'),                                                                                     // 20
        presets: ['es2015', 'stage-2', 'react']                                                                        // 21
      })                                                                                                               //
    },                                                                                                                 //
    env: {                                                                                                             // 24
      type: 'node'                                                                                                     // 25
    },                                                                                                                 //
    testFramework: 'mocha'                                                                                             // 27
  };                                                                                                                   //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},{"extensions":[".js",".json",".jsx"]});
require("./lib/constants/lang_codes.js");
require("./lib/constants/msgs.js");
require("./lib/constants/widgets.js");
require("./lib/vendor/WhyDidYouUpdateMixin.js");
require("./lib/vendor/perf.js");
require("./lib/collections.js");
require("./lib/convo.js");
require("./lib/invite.js");
require("./lib/lock.js");
require("./lib/msg.js");
require("./lib/note.js");
require("./lib/notification.js");
require("./lib/section.js");
require("./lib/team.js");
require("./lib/translation.js");
require("./lib/widget.js");
require("./server/methods/_myTest.js");
require("./server/methods/account.js");
require("./server/methods/convos.js");
require("./server/methods/images.js");
require("./server/methods/index.js");
require("./server/methods/invites.js");
require("./server/methods/locks.js");
require("./server/methods/msgs.js");
require("./server/methods/notes.js");
require("./server/methods/notifications.js");
require("./server/methods/sections.js");
require("./server/methods/teams.js");
require("./server/methods/translation.js");
require("./server/methods/widgets.js");
require("./server/publications/_myTest.js");
require("./server/publications/convos.js");
require("./server/publications/index.js");
require("./server/publications/invites.js");
require("./server/publications/msgs.js");
require("./server/publications/notes.js");
require("./server/publications/notifications.js");
require("./server/publications/search.js");
require("./server/publications/sections.js");
require("./server/publications/teams.js");
require("./server/publications/translations.js");
require("./server/publications/users.js");
require("./server/SearchSource.js");
require("./server/cloudinary.js");
require("./server/email.js");
require("./wallaby.js");
require("./server/main.js");
//# sourceMappingURL=app.js.map
