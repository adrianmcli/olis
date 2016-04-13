(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var Picker = Package['meteorhacks:picker'].Picker;

/* Package-scope variables */
var SearchSource;

(function(){

/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
// packages/meteorhacks_search-source/lib/server.js                            //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////
                                                                               //
SearchSource = {};
SearchSource._sources = {};
var bodyParser = Npm.require('body-parser');

SearchSource.defineSource = function(name, callback) {
  SearchSource._sources[name] = callback;
};

Meteor.methods({
  "search.source": function(name, query, options) {
    check(name, String);
    check(query, Match.OneOf(String, null, undefined));
    check(options, Match.OneOf(Object, null, undefined));
    this.unblock();

    // we need to send the context of the method
    // that's why we use .call instead just invoking the function
    return getSourceData.call(this, name, query, options);
  }
});

var postRoutes = Picker.filter(function(req, res) {
  return req.method == "POST";
});

postRoutes.middleware(bodyParser.text({
  type: "text/ejson"
}));

postRoutes.route('/_search-source', function(params, req, res, next) {
  if(req.body) {
    var payload = EJSON.parse(req.body);
    try {
      // supporting the use of Meteor.userId()
      var data = DDP._CurrentInvocation.withValue({userId: null}, function() {
        return getSourceData(payload.source, payload.query, payload.options);
      });
      sendData(res, null, data);
    } catch(ex) {
      if(ex instanceof Meteor.Error) {
        var error = { code: ex.error, message: ex.reason };
      } else {
        var error = { message: ex.message };
      }
      sendData(res, error);
    }
  } else {
    next();
  }
});


function sendData(res, err, data) {
  var payload = {
    error: err,
    data: data
  };

  res.end(EJSON.stringify(payload));
}

function getSourceData(name, query, options) {
  var source = SearchSource._sources[name];
  if(source) {
    return source.call(this, query, options);
  } else {
    throw new Meteor.Error(404, "No such search source: " + name);
  }
}
/////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['meteorhacks:search-source'] = {}, {
  SearchSource: SearchSource
});

})();

//# sourceMappingURL=meteorhacks_search-source.js.map
