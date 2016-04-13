(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var blocking = Package['peerlibrary:blocking'].blocking;

/* Package-scope variables */
var xml2js;

(function(){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/peerlibrary_xml2js/packages/peerlibrary_xml2js.js             //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/peerlibrary:xml2js/server.js                             //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
xml2js = Npm.require('xml2js');                                      // 1
                                                                     // 2
xml2js.parseStringSync = blocking(xml2js.parseString);               // 3
///////////////////////////////////////////////////////////////////////

}).call(this);

////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['peerlibrary:xml2js'] = {}, {
  xml2js: xml2js
});

})();

//# sourceMappingURL=peerlibrary_xml2js.js.map
