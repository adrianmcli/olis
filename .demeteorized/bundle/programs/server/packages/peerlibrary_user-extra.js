(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var Accounts = Package['accounts-base'].Accounts;
var _ = Package.underscore._;

/* Package-scope variables */
var __coffeescriptShare;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/peerlibrary_user-extra/packages/peerlibrary_user-extra.js                   //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
(function () {

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/peerlibrary:user-extra/server.coffee.js                                  //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var originalPublish, publishCurrentContext,
  __slice = [].slice;

publishCurrentContext = new Meteor.EnvironmentVariable();

originalPublish = Meteor.publish;

Meteor.publish = function(name, func) {
  return originalPublish(name, function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return publishCurrentContext.withValue({
      userId: this.userId
    }, (function(_this) {
      return function() {
        return func.apply(_this, args);
      };
    })(this));
  });
};

Meteor.userId = function() {
  var currentContext, currentInvocation;
  currentInvocation = DDP._CurrentInvocation.get();
  if (currentInvocation) {
    return currentInvocation.userId;
  }
  currentContext = publishCurrentContext.get();
  if (currentContext) {
    return currentContext.userId;
  }
  throw new Error("Meteor.userId() not invoked from a method or publish function.");
};

Meteor.users.deny({
  update: function() {
    return true;
  }
});
///////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/peerlibrary:user-extra/lib.coffee.js                                     //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.user = function(userId, fields) {
  if (!fields && _.isObject(userId)) {
    fields = userId;
    userId = null;
  }
  if (userId == null) {
    userId = Meteor.userId();
  }
  if (fields == null) {
    fields = {};
  }
  if (!userId) {
    return null;
  }
  return Meteor.users.findOne({
    _id: userId
  }, {
    fields: fields
  });
};
///////////////////////////////////////////////////////////////////////////////////////

}).call(this);

//////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['peerlibrary:user-extra'] = {};

})();

//# sourceMappingURL=peerlibrary_user-extra.js.map
