(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var HTTP = Package.http.HTTP;
var HTTPInternals = Package.http.HTTPInternals;
var EJSON = Package.ejson.EJSON;
var xml2js = Package['peerlibrary:xml2js'].xml2js;

/* Package-scope variables */
var getAuthorizationHeader, Microsoft;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/devian_mstranslate/packages/devian_mstranslate.js                                  //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
(function () {

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/devian:mstranslate/authentication.js                                         //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
var accessToken                                                                          // 1
var getAccessToken = requestNewAccesToken                                                // 2
                                                                                         // 3
function requestNewAccesToken() {                                                        // 4
	// request a new acces token from Microsoft                                             // 5
	var response = HTTP.post('https://datamarket.accesscontrol.windows.net/v2/OAuth2-13', { // 6
		params: {                                                                              // 7
			// TODO replace with meteor.settings                                                  // 8
			client_id: Meteor.settings.msTranslator.id,                                           // 9
			client_secret: Meteor.settings.msTranslator.secret,                                   // 10
			scope: "http://api.microsofttranslator.com",                                          // 11
			grant_type: 'client_credentials'                                                      // 12
		}                                                                                      // 13
	})                                                                                      // 14
                                                                                         // 15
	// Parse the JSON response                                                              // 16
	var responseBody = EJSON.parse(response.content)                                        // 17
                                                                                         // 18
	// retreive the actual token from the response                                          // 19
	accessToken = EJSON.parse(response.content).access_token                                // 20
                                                                                         // 21
	// switch the getAccessToken function to requestNewAccesToken when the token expires    // 22
	Meteor.setTimeout(function() {                                                          // 23
		getAccessToken = requestNewAccesToken                                                  // 24
	}, responseBody.expires_in * 1000)                                                      // 25
                                                                                         // 26
	// switch the getAccessToken function to cached version for now                         // 27
	getAccessToken = getCachedAccessToken                                                   // 28
                                                                                         // 29
	return accessToken                                                                      // 30
}                                                                                        // 31
                                                                                         // 32
function getCachedAccessToken() {                                                        // 33
	return accessToken                                                                      // 34
}                                                                                        // 35
                                                                                         // 36
getAuthorizationHeader = function() {                                                    // 37
	return {                                                                                // 38
		Authorization: "Bearer" + " " + getAccessToken()                                       // 39
	}                                                                                       // 40
}                                                                                        // 41
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// packages/devian:mstranslate/mstranslate.js                                            //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
Microsoft = {                                                                            // 1
	translate: translate,                                                                   // 2
	detect: detect                                                                          // 3
}                                                                                        // 4
                                                                                         // 5
function request(path, params) {                                                         // 6
	var response = HTTP.get('http://api.microsofttranslator.com/V2/Http.svc/' + path, {     // 7
		params: _.extend({ appId: ''}, params),                                                // 8
		headers: getAuthorizationHeader()                                                      // 9
	})                                                                                      // 10
                                                                                         // 11
	return xml2js.parseStringSync(response.content).string['_']                             // 12
}                                                                                        // 13
                                                                                         // 14
function translate(text, language) {                                                     // 15
	return request('Translate', {                                                           // 16
		text: text,                                                                            // 17
		to: language,                                                                          // 18
		contentType: 'text/plain'                                                              // 19
	})                                                                                      // 20
}                                                                                        // 21
                                                                                         // 22
function detect(text) {                                                                  // 23
	return request('Detect', { text: text })                                                // 24
}                                                                                        // 25
///////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

/////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['devian:mstranslate'] = {}, {
  Microsoft: Microsoft
});

})();

//# sourceMappingURL=devian_mstranslate.js.map
