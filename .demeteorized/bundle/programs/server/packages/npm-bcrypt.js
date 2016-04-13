(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var NpmModuleBcrypt;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/npm-bcrypt/wrapper.js                                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
NpmModuleBcrypt = Npm.require('bcrypt');

///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['npm-bcrypt'] = {}, {
  NpmModuleBcrypt: NpmModuleBcrypt
});

})();

//# sourceMappingURL=npm-bcrypt.js.map
