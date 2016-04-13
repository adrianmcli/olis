(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var check = Package.check.check;
var Match = Package.check.Match;
var ECMAScript = Package.ecmascript.ECMAScript;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var _ = Package.underscore._;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var Index, Engine, ReactiveEngine, Cursor, SearchCollection, MongoDBEngine, MinimongoEngine, MongoTextIndexEngine, EasySearch;

var require = meteorInstall({"node_modules":{"meteor":{"easysearch:core":{"lib":{"core":{"index.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/createClass",function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/easysearch_core/lib/core/index.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _createClass2 = require('babel-runtime/helpers/createClass');                                                    //
                                                                                                                     //
var _createClass3 = _interopRequireDefault(_createClass2);                                                           //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                    //
                                                                                                                     //
/**                                                                                                                  //
 * An Index represents the main entry point for searching with EasySearch. It relies on                              //
 * the given engine to have the search functionality and defines the data that should be searchable.                 //
 *                                                                                                                   //
 * @type {Index}                                                                                                     //
 */                                                                                                                  //
Index = function () {                                                                                                // 7
  /**                                                                                                                //
   * Constructor                                                                                                     //
   *                                                                                                                 //
   * @param {Object} config Configuration                                                                            //
   *                                                                                                                 //
   * @constructor                                                                                                    //
   */                                                                                                                //
                                                                                                                     //
  function Index(config) {                                                                                           // 15
    (0, _classCallCheck3['default'])(this, Index);                                                                   //
                                                                                                                     //
    check(config, Object);                                                                                           // 16
    check(config.collection, Meteor.Collection);                                                                     // 17
    check(config.fields, [String]);                                                                                  // 18
                                                                                                                     //
    if (!(config.engine instanceof Engine)) {                                                                        // 20
      throw new Meteor.Error('invalid-engine', 'engine needs to be instanceof Engine');                              // 21
    }                                                                                                                //
                                                                                                                     //
    if (!config.name) config.name = (config.collection._name || '').toLowerCase();                                   // 24
                                                                                                                     //
    this.config = _.extend(Index.defaultConfiguration, config);                                                      // 27
    this.defaultSearchOptions = _.defaults({}, this.config.defaultSearchOptions, { limit: 10, skip: 0, props: {} });
                                                                                                                     //
    // Engine specific code on index creation                                                                        //
    config.engine.onIndexCreate(this.config);                                                                        // 15
  }                                                                                                                  //
                                                                                                                     //
  /**                                                                                                                //
   * Default configuration for an index.                                                                             //
   *                                                                                                                 //
   * @returns {Object}                                                                                               //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  /**                                                                                                                //
   * Search the index.                                                                                               //
   *                                                                                                                 //
   * @param {Object|String} searchDefinition Search definition                                                       //
   * @param {Object}        options          Options                                                                 //
   *                                                                                                                 //
   * @returns {Cursor}                                                                                               //
   */                                                                                                                //
                                                                                                                     //
  Index.prototype.search = function () {                                                                             // 7
    function search(searchDefinition) {                                                                              //
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];                         //
                                                                                                                     //
      this.config.engine.checkSearchParam(searchDefinition, this.config);                                            // 55
                                                                                                                     //
      check(options, {                                                                                               // 57
        limit: Match.Optional(Number),                                                                               // 58
        skip: Match.Optional(Number),                                                                                // 59
        props: Match.Optional(Object)                                                                                // 60
      });                                                                                                            //
                                                                                                                     //
      options = {                                                                                                    // 63
        search: this._getSearchOptions(options),                                                                     // 64
        index: this.config                                                                                           // 65
      };                                                                                                             //
                                                                                                                     //
      if (!this.config.permission(options.search)) {                                                                 // 68
        throw new Meteor.Error('not-allowed', "Not allowed to search this index!");                                  // 69
      }                                                                                                              //
                                                                                                                     //
      return this.config.engine.search(searchDefinition, options);                                                   // 72
    }                                                                                                                //
                                                                                                                     //
    return search;                                                                                                   //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Returns the search options based on the given options.                                                          //
   *                                                                                                                 //
   * @param {Object} options Options to use                                                                          //
   *                                                                                                                 //
   * @returns {Object}                                                                                               //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  Index.prototype._getSearchOptions = function () {                                                                  // 7
    function _getSearchOptions(options) {                                                                            //
      return _.defaults(Meteor.userId ? { userId: Meteor.userId() } : {}, options, this.defaultSearchOptions);       // 83
    }                                                                                                                //
                                                                                                                     //
    return _getSearchOptions;                                                                                        //
  }();                                                                                                               //
                                                                                                                     //
  (0, _createClass3['default'])(Index, null, [{                                                                      //
    key: 'defaultConfiguration',                                                                                     //
    get: function () {                                                                                               //
      function get() {                                                                                               //
        return {                                                                                                     // 40
          permission: function () {                                                                                  // 41
            function permission() {                                                                                  // 41
              return true;                                                                                           //
            }                                                                                                        //
                                                                                                                     //
            return permission;                                                                                       //
          }(),                                                                                                       //
          defaultSearchOptions: {}                                                                                   // 42
        };                                                                                                           //
      }                                                                                                              //
                                                                                                                     //
      return get;                                                                                                    //
    }()                                                                                                              //
  }]);                                                                                                               //
  return Index;                                                                                                      //
}();                                                                                                                 //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"engine.js":["babel-runtime/helpers/classCallCheck",function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/easysearch_core/lib/core/engine.js                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                    //
                                                                                                                     //
/**                                                                                                                  //
 * An Engine is the technology used for searching with EasySearch, with                                              //
 * customizable configuration to how it interacts with the data from the Index.                                      //
 *                                                                                                                   //
 * @type {Engine}                                                                                                    //
 */                                                                                                                  //
Engine = function () {                                                                                               // 7
  /**                                                                                                                //
   * Constructor                                                                                                     //
   *                                                                                                                 //
   * @param {Object} config configuration                                                                            //
   *                                                                                                                 //
   * @constructor                                                                                                    //
   */                                                                                                                //
                                                                                                                     //
  function Engine() {                                                                                                // 15
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];                            //
    (0, _classCallCheck3['default'])(this, Engine);                                                                  //
                                                                                                                     //
    if (this.constructor === Engine) {                                                                               // 16
      throw new Error('Cannot initialize instance of Engine');                                                       // 17
    }                                                                                                                //
                                                                                                                     //
    if (!_.isFunction(this.search)) {                                                                                // 20
      throw new Error('Engine needs to implement search method');                                                    // 21
    }                                                                                                                //
                                                                                                                     //
    this.config = _.defaults({}, config, this.defaultConfiguration());                                               // 24
  }                                                                                                                  //
                                                                                                                     //
  /**                                                                                                                //
   * Return default configuration.                                                                                   //
   *                                                                                                                 //
   * @returns {Object}                                                                                               //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  Engine.prototype.defaultConfiguration = function () {                                                              // 7
    function defaultConfiguration() {                                                                                //
      return {};                                                                                                     // 33
    }                                                                                                                //
                                                                                                                     //
    return defaultConfiguration;                                                                                     //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Call a configuration method with the engine scope.                                                              //
   *                                                                                                                 //
   * @param {String} methodName Method name                                                                          //
   * @param {Object} args       Arguments for the method                                                             //
   *                                                                                                                 //
   * @returns {*}                                                                                                    //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  Engine.prototype.callConfigMethod = function () {                                                                  // 7
    function callConfigMethod(methodName) {                                                                          //
      check(methodName, String);                                                                                     // 45
                                                                                                                     //
      var func = this.config[methodName];                                                                            // 47
                                                                                                                     //
      if (func) {                                                                                                    // 49
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {    //
          args[_key - 1] = arguments[_key];                                                                          //
        }                                                                                                            //
                                                                                                                     //
        return func.apply(this, args);                                                                               // 50
      }                                                                                                              //
    }                                                                                                                //
                                                                                                                     //
    return callConfigMethod;                                                                                         //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Check the given search parameter for validity                                                                   //
   *                                                                                                                 //
   * @param search                                                                                                   //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  Engine.prototype.checkSearchParam = function () {                                                                  // 7
    function checkSearchParam(search) {                                                                              //
      check(search, String);                                                                                         // 60
    }                                                                                                                //
                                                                                                                     //
    return checkSearchParam;                                                                                         //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   *Code to run on index creation                                                                                    //
   *                                                                                                                 //
   * @param {Object} indexConfig Index configuraction                                                                //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  Engine.prototype.onIndexCreate = function () {                                                                     // 7
    function onIndexCreate(indexConfig) {                                                                            //
      if (!indexConfig.allowedFields) {                                                                              // 69
        indexConfig.allowedFields = indexConfig.fields;                                                              // 70
      }                                                                                                              //
    }                                                                                                                //
                                                                                                                     //
    return onIndexCreate;                                                                                            //
  }();                                                                                                               //
                                                                                                                     //
  return Engine;                                                                                                     //
}();                                                                                                                 //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"reactive-engine.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits",function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/easysearch_core/lib/core/reactive-engine.js                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require('babel-runtime/helpers/inherits');                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                    //
                                                                                                                     //
/**                                                                                                                  //
 * A ReactiveEngine handles the reactive logic, such as subscribing                                                  //
 * and publishing documents into a self contained collection.                                                        //
 *                                                                                                                   //
 * @type {ReactiveEngine}                                                                                            //
 */                                                                                                                  //
ReactiveEngine = function (_Engine) {                                                                                // 7
  (0, _inherits3['default'])(ReactiveEngine, _Engine);                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Constructor.                                                                                                    //
   *                                                                                                                 //
   * @param {Object} config Configuration                                                                            //
   *                                                                                                                 //
   * @constructor                                                                                                    //
   */                                                                                                                //
                                                                                                                     //
  function ReactiveEngine(config) {                                                                                  // 15
    (0, _classCallCheck3['default'])(this, ReactiveEngine);                                                          //
                                                                                                                     //
    var _this = (0, _possibleConstructorReturn3['default'])(this, _Engine.call(this, config));                       //
                                                                                                                     //
    if (_this === _this.constructor) {                                                                               // 18
      throw new Error('Cannot initialize instance of ReactiveEngine');                                               // 19
    }                                                                                                                //
                                                                                                                     //
    if (!_.isFunction(_this.getSearchCursor)) {                                                                      // 22
      throw new Error('Reactive engine needs to implement getSearchCursor method');                                  // 23
    }                                                                                                                //
    return _this;                                                                                                    //
  }                                                                                                                  //
                                                                                                                     //
  /**                                                                                                                //
   * Return default configuration.                                                                                   //
   *                                                                                                                 //
   * @returns {Object}                                                                                               //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  ReactiveEngine.prototype.defaultConfiguration = function () {                                                      // 7
    function defaultConfiguration() {                                                                                //
      return _.defaults({}, {                                                                                        // 33
        transform: function () {                                                                                     // 34
          function transform(doc) {                                                                                  // 34
            return doc;                                                                                              //
          }                                                                                                          //
                                                                                                                     //
          return transform;                                                                                          //
        }(),                                                                                                         //
        beforePublish: function () {                                                                                 // 35
          function beforePublish(event, doc) {                                                                       // 35
            return doc;                                                                                              //
          }                                                                                                          //
                                                                                                                     //
          return beforePublish;                                                                                      //
        }()                                                                                                          //
      }, _Engine.prototype.defaultConfiguration.call(this));                                                         //
    }                                                                                                                //
                                                                                                                     //
    return defaultConfiguration;                                                                                     //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Code to run on index creation                                                                                   //
   *                                                                                                                 //
   * @param {Object} indexConfig Index configuration                                                                 //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  ReactiveEngine.prototype.onIndexCreate = function () {                                                             // 7
    function onIndexCreate(indexConfig) {                                                                            //
      _Engine.prototype.onIndexCreate.call(this, indexConfig);                                                       // 45
      indexConfig.searchCollection = new SearchCollection(indexConfig, this);                                        // 46
      indexConfig.mongoCollection = indexConfig.searchCollection._collection;                                        // 47
    }                                                                                                                //
                                                                                                                     //
    return onIndexCreate;                                                                                            //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Transform the search definition.                                                                                //
   *                                                                                                                 //
   * @param {String|Object} searchDefinition Search definition                                                       //
   * @param {Object}        options          Search and index options                                                //
   *                                                                                                                 //
   * @returns {Object}                                                                                               //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  ReactiveEngine.prototype.transformSearchDefinition = function () {                                                 // 7
    function transformSearchDefinition(searchDefinition, options) {                                                  //
      if (_.isString(searchDefinition)) {                                                                            // 59
        (function () {                                                                                               //
          var obj = {};                                                                                              // 60
                                                                                                                     //
          _.each(options.index.fields, function (field) {                                                            // 62
            obj[field] = searchDefinition;                                                                           // 63
          });                                                                                                        //
                                                                                                                     //
          searchDefinition = obj;                                                                                    // 66
        })();                                                                                                        //
      }                                                                                                              //
                                                                                                                     //
      return searchDefinition;                                                                                       // 69
    }                                                                                                                //
                                                                                                                     //
    return transformSearchDefinition;                                                                                //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Check the given search parameter for validity                                                                   //
   *                                                                                                                 //
   * @param search                                                                                                   //
   * @param indexOptions                                                                                             //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  ReactiveEngine.prototype.checkSearchParam = function () {                                                          // 7
    function checkSearchParam(search, indexOptions) {                                                                //
      check(search, Match.OneOf(String, Object));                                                                    // 79
                                                                                                                     //
      if (_.isObject(search)) {                                                                                      // 81
        _.each(search, function (val, field) {                                                                       // 82
          check(val, String);                                                                                        // 83
                                                                                                                     //
          if (-1 === _.indexOf(indexOptions.allowedFields, field)) {                                                 // 85
            throw new Meteor.Error('Not allowed to search over field "' + field + '"');                              // 86
          }                                                                                                          //
        });                                                                                                          //
      }                                                                                                              //
    }                                                                                                                //
                                                                                                                     //
    return checkSearchParam;                                                                                         //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Reactively search on the collection.                                                                            //
   *                                                                                                                 //
   * @param {Object} searchDefinition Search definition                                                              //
   * @param {Object} options          Options                                                                        //
   *                                                                                                                 //
   * @returns {Cursor}                                                                                               //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  ReactiveEngine.prototype.search = function () {                                                                    // 7
    function search(searchDefinition, options) {                                                                     //
      if (Meteor.isClient) {                                                                                         // 101
        return options.index.searchCollection.find(searchDefinition, options.search);                                // 102
      } else {                                                                                                       //
        return this.getSearchCursor(this.transformSearchDefinition(searchDefinition, options), options);             // 104
      }                                                                                                              //
    }                                                                                                                //
                                                                                                                     //
    return search;                                                                                                   //
  }();                                                                                                               //
                                                                                                                     //
  return ReactiveEngine;                                                                                             //
}(Engine);                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"cursor.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/createClass",function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/easysearch_core/lib/core/cursor.js                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _createClass2 = require("babel-runtime/helpers/createClass");                                                    //
                                                                                                                     //
var _createClass3 = _interopRequireDefault(_createClass2);                                                           //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
/**                                                                                                                  //
 * A Cursor represents a pointer to the search results. Since it's specific                                          //
 * to EasySearch it can also be used to check for valid return values.                                               //
 *                                                                                                                   //
 * @type {Cursor}                                                                                                    //
 */                                                                                                                  //
Cursor = function () {                                                                                               // 7
  /**                                                                                                                //
   * Constructor                                                                                                     //
   *                                                                                                                 //
   * @param {Mongo.Cursor} mongoCursor   Referenced mongo cursor                                                     //
   * @param {Number}       count         Count of all documents found                                                //
   * @param {Boolean}      isReady       Cursor is ready                                                             //
   * @param {Object}       publishHandle Publish handle to stop if on client                                         //
   *                                                                                                                 //
   * @constructor                                                                                                    //
   *                                                                                                                 //
   */                                                                                                                //
                                                                                                                     //
  function Cursor(mongoCursor, count) {                                                                              // 19
    var isReady = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];                         //
    var publishHandle = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];                   //
    (0, _classCallCheck3["default"])(this, Cursor);                                                                  //
                                                                                                                     //
    check(mongoCursor.fetch, Function);                                                                              // 20
    check(count, Number);                                                                                            // 21
    check(isReady, Match.Optional(Boolean));                                                                         // 22
    check(publishHandle, Match.OneOf(null, Object));                                                                 // 23
                                                                                                                     //
    this._mongoCursor = mongoCursor;                                                                                 // 25
    this._count = count;                                                                                             // 26
    this._isReady = isReady;                                                                                         // 27
    this._publishHandle = publishHandle;                                                                             // 28
  }                                                                                                                  //
                                                                                                                     //
  /**                                                                                                                //
   * Fetch the search results.                                                                                       //
   *                                                                                                                 //
   * @returns {[Object]}                                                                                             //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  Cursor.prototype.fetch = function () {                                                                             // 7
    function fetch() {                                                                                               //
      return this._mongoCursor.fetch();                                                                              // 37
    }                                                                                                                //
                                                                                                                     //
    return fetch;                                                                                                    //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Stop the subscription handle associated with the cursor.                                                        //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  Cursor.prototype.stop = function () {                                                                              // 7
    function stop() {                                                                                                //
      if (this._publishHandle) {                                                                                     // 44
        return this._publishHandle.stop();                                                                           // 45
      }                                                                                                              //
    }                                                                                                                //
                                                                                                                     //
    return stop;                                                                                                     //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Return count of all documents found                                                                             //
   *                                                                                                                 //
   * @returns {Number}                                                                                               //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  Cursor.prototype.count = function () {                                                                             // 7
    function count() {                                                                                               //
      return this._count;                                                                                            // 55
    }                                                                                                                //
                                                                                                                     //
    return count;                                                                                                    //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Return if the cursor is ready.                                                                                  //
   *                                                                                                                 //
   * @returns {Boolean}                                                                                              //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  Cursor.prototype.isReady = function () {                                                                           // 7
    function isReady() {                                                                                             //
      return this._isReady;                                                                                          // 64
    }                                                                                                                //
                                                                                                                     //
    return isReady;                                                                                                  //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Return the raw mongo cursor.                                                                                    //
   *                                                                                                                 //
   * @returns {Mongo.Cursor}                                                                                         //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  (0, _createClass3["default"])(Cursor, [{                                                                           //
    key: "mongoCursor",                                                                                              //
    get: function () {                                                                                               //
      function get() {                                                                                               //
        return this._mongoCursor;                                                                                    // 73
      }                                                                                                              //
                                                                                                                     //
      return get;                                                                                                    //
    }()                                                                                                              //
                                                                                                                     //
    /**                                                                                                              //
     * Return a fake empty cursor, without data.                                                                     //
     *                                                                                                               //
     * @returns {Object}                                                                                             //
     */                                                                                                              //
                                                                                                                     //
  }], [{                                                                                                             //
    key: "emptyCursor",                                                                                              //
    get: function () {                                                                                               //
      function get() {                                                                                               //
        return { fetch: function () {                                                                                // 82
            function fetch() {                                                                                       // 82
              return [];                                                                                             //
            }                                                                                                        //
                                                                                                                     //
            return fetch;                                                                                            //
          }(), observe: function () {                                                                                //
            function observe() {                                                                                     // 82
              return { stop: function () {                                                                           // 82
                  function stop() {                                                                                  // 82
                    return null;                                                                                     //
                  }                                                                                                  //
                                                                                                                     //
                  return stop;                                                                                       //
                }() };                                                                                               //
            }                                                                                                        //
                                                                                                                     //
            return observe;                                                                                          //
          }(), stop: function () {                                                                                   //
            function stop() {}                                                                                       // 82
                                                                                                                     //
            return stop;                                                                                             //
          }() };                                                                                                     //
      }                                                                                                              //
                                                                                                                     //
      return get;                                                                                                    //
    }()                                                                                                              //
  }]);                                                                                                               //
  return Cursor;                                                                                                     //
}();                                                                                                                 //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"search-collection.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/createClass",function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/easysearch_core/lib/core/search-collection.js                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _createClass2 = require('babel-runtime/helpers/createClass');                                                    //
                                                                                                                     //
var _createClass3 = _interopRequireDefault(_createClass2);                                                           //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                    //
                                                                                                                     //
/**                                                                                                                  //
 * A search collection represents a reactive collection on the client,                                               //
 * which is used by the ReactiveEngine for searching.                                                                //
 *                                                                                                                   //
 * @type {SearchCollection}                                                                                          //
 */                                                                                                                  //
SearchCollection = function () {                                                                                     // 7
  /**                                                                                                                //
   * Constructor                                                                                                     //
   *                                                                                                                 //
   * @param {Object}         indexConfiguration Index configuration                                                  //
   * @param {ReactiveEngine} engine             Reactive Engine                                                      //
   *                                                                                                                 //
   * @constructor                                                                                                    //
   */                                                                                                                //
                                                                                                                     //
  function SearchCollection(indexConfiguration, engine) {                                                            // 16
    (0, _classCallCheck3['default'])(this, SearchCollection);                                                        //
                                                                                                                     //
    check(indexConfiguration, Object);                                                                               // 17
    check(indexConfiguration.name, Match.OneOf(String, null));                                                       // 18
                                                                                                                     //
    if (!(engine instanceof ReactiveEngine)) {                                                                       // 20
      throw new Meteor.Error('invalid-engine', 'engine needs to be instanceof ReactiveEngine');                      // 21
    }                                                                                                                //
                                                                                                                     //
    this._indexConfiguration = indexConfiguration;                                                                   // 24
    this._name = indexConfiguration.name + '/easySearch';                                                            // 25
    this._engine = engine;                                                                                           // 26
                                                                                                                     //
    if (Meteor.isClient) {                                                                                           // 28
      this._collection = new Meteor.Collection(this._name);                                                          // 29
    } else if (Meteor.isServer) {                                                                                    //
      this._setUpPublication();                                                                                      // 31
    }                                                                                                                //
  }                                                                                                                  //
                                                                                                                     //
  /**                                                                                                                //
   * Get name                                                                                                        //
   *                                                                                                                 //
   * @returns {String}                                                                                               //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  /**                                                                                                                //
   * Find documents on the client.                                                                                   //
   *                                                                                                                 //
   * @param {Object} searchDefinition Search definition                                                              //
   * @param {Object} options          Options                                                                        //
   *                                                                                                                 //
   * @returns {Cursor}                                                                                               //
   */                                                                                                                //
                                                                                                                     //
  SearchCollection.prototype.find = function () {                                                                    // 7
    function find(searchDefinition, options) {                                                                       //
      if (!Meteor.isClient) {                                                                                        // 62
        throw new Error('find can only be used on client');                                                          // 63
      }                                                                                                              //
                                                                                                                     //
      var publishHandle = Meteor.subscribe(this.name, searchDefinition, options);                                    // 66
                                                                                                                     //
      var count = this._getCount(searchDefinition);                                                                  // 68
      var mongoCursor = this._getMongoCursor(searchDefinition, options);                                             // 69
                                                                                                                     //
      if (!_.isNumber(count)) {                                                                                      // 71
        return new Cursor(mongoCursor, 0, false);                                                                    // 72
      }                                                                                                              //
                                                                                                                     //
      return new Cursor(mongoCursor, count, true, publishHandle);                                                    // 75
    }                                                                                                                //
                                                                                                                     //
    return find;                                                                                                     //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Get the count of the cursor.                                                                                    //
   *                                                                                                                 //
   * @params {Object} searchDefinition Search definition                                                             //
   *                                                                                                                 //
   * @returns {Cursor.count}                                                                                         //
   *                                                                                                                 //
   * @private                                                                                                        //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  SearchCollection.prototype._getCount = function () {                                                               // 7
    function _getCount(searchDefinition) {                                                                           //
      var countDoc = this._collection.findOne('searchCount' + JSON.stringify(searchDefinition));                     // 88
                                                                                                                     //
      if (countDoc) {                                                                                                // 90
        return countDoc.count;                                                                                       // 91
      }                                                                                                              //
    }                                                                                                                //
                                                                                                                     //
    return _getCount;                                                                                                //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Get the mongo cursor.                                                                                           //
   *                                                                                                                 //
   * @param {Object} searchDefinition Search definition                                                              //
   * @param {Object} options          Search options                                                                 //
   *                                                                                                                 //
   * @returns {Cursor}                                                                                               //
   * @private                                                                                                        //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  SearchCollection.prototype._getMongoCursor = function () {                                                         // 7
    function _getMongoCursor(searchDefinition, options) {                                                            //
      var _this = this;                                                                                              //
                                                                                                                     //
      return this._collection.find({ __searchDefinition: JSON.stringify(searchDefinition), __searchOptions: JSON.stringify(options.props) }, {
        transform: function () {                                                                                     // 108
          function transform(doc) {                                                                                  // 108
            delete doc.__searchDefinition;                                                                           // 109
            delete doc.__searchOptions;                                                                              // 110
            delete doc.__sortPosition;                                                                               // 111
                                                                                                                     //
            doc = _this.engine.config.transform(doc);                                                                // 113
                                                                                                                     //
            return doc;                                                                                              // 115
          }                                                                                                          //
                                                                                                                     //
          return transform;                                                                                          //
        }(),                                                                                                         //
        sort: ['__sortPosition']                                                                                     // 117
      });                                                                                                            //
    }                                                                                                                //
                                                                                                                     //
    return _getMongoCursor;                                                                                          //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Return a unique document id for publication.                                                                    //
   *                                                                                                                 //
   * @param {Document} doc                                                                                           //
   *                                                                                                                 //
   * @returns string                                                                                                 //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  SearchCollection.prototype.generateId = function () {                                                              // 7
    function generateId(doc) {                                                                                       //
      return doc._id + doc.__searchDefinition + doc.__searchOptions;                                                 // 130
    }                                                                                                                //
                                                                                                                     //
    return generateId;                                                                                               //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Add custom fields to the given document                                                                         //
   *                                                                                                                 //
   * @param {Document} doc                                                                                           //
   * @param {Object}   data                                                                                          //
   * @returns {*}                                                                                                    //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  SearchCollection.prototype.addCustomFields = function () {                                                         // 7
    function addCustomFields(doc, data) {                                                                            //
      _.forEach(data, function (val, key) {                                                                          // 141
        doc['__' + key] = val;                                                                                       // 142
      });                                                                                                            //
                                                                                                                     //
      return doc;                                                                                                    // 145
    }                                                                                                                //
                                                                                                                     //
    return addCustomFields;                                                                                          //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Set up publication.                                                                                             //
   *                                                                                                                 //
   * @private                                                                                                        //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  SearchCollection.prototype._setUpPublication = function () {                                                       // 7
    function _setUpPublication() {                                                                                   //
      var collectionScope = this,                                                                                    // 154
          collectionName = this.name;                                                                                //
                                                                                                                     //
      Meteor.publish(collectionName, function (searchDefinition, options) {                                          // 157
        var _this2 = this;                                                                                           //
                                                                                                                     //
        check(searchDefinition, Match.OneOf(String, Object));                                                        // 158
        check(options, Object);                                                                                      // 159
                                                                                                                     //
        var definitionString = JSON.stringify(searchDefinition),                                                     // 161
            optionsString = JSON.stringify(options.props);                                                           //
                                                                                                                     //
        options.userId = this.userId;                                                                                // 164
        options.publicationScope = this;                                                                             // 165
                                                                                                                     //
        if (!collectionScope._indexConfiguration.permission(options)) {                                              // 167
          throw new Meteor.Error('not-allowed', "You're not allowed to search this index!");                         // 168
        }                                                                                                            //
                                                                                                                     //
        collectionScope.engine.checkSearchParam(searchDefinition, collectionScope._indexConfiguration);              // 171
                                                                                                                     //
        var cursor = collectionScope.engine.search(searchDefinition, {                                               // 173
          search: options,                                                                                           // 174
          index: collectionScope._indexConfiguration                                                                 // 175
        });                                                                                                          //
                                                                                                                     //
        var count = cursor.count();                                                                                  // 178
                                                                                                                     //
        this.added(collectionName, 'searchCount' + definitionString, { count: count });                              // 180
                                                                                                                     //
        var resultsHandle = cursor.mongoCursor.observe({                                                             // 182
          addedAt: function () {                                                                                     // 183
            function addedAt(doc, atIndex, before) {                                                                 // 183
              doc = collectionScope.engine.config.beforePublish('addedAt', doc, atIndex, before);                    // 184
              doc = collectionScope.addCustomFields(doc, {                                                           // 185
                searchDefinition: definitionString,                                                                  // 186
                searchOptions: optionsString,                                                                        // 187
                sortPosition: atIndex,                                                                               // 188
                originalId: doc._id                                                                                  // 189
              });                                                                                                    //
                                                                                                                     //
              _this2.added(collectionName, collectionScope.generateId(doc), doc);                                    // 192
            }                                                                                                        //
                                                                                                                     //
            return addedAt;                                                                                          //
          }(),                                                                                                       //
          changedAt: function () {                                                                                   // 194
            function changedAt(doc, oldDoc, atIndex) {                                                               // 194
              doc = collectionScope.engine.config.beforePublish('changedAt', doc, oldDoc, atIndex);                  // 195
              doc = collectionScope.addCustomFields(doc, {                                                           // 196
                searchDefinition: definitionString,                                                                  // 197
                searchOptions: optionsString,                                                                        // 198
                sortPosition: atIndex,                                                                               // 199
                originalId: doc._id                                                                                  // 200
              });                                                                                                    //
                                                                                                                     //
              _this2.changed(collectionName, collectionScope.generateId(doc), doc);                                  // 203
            }                                                                                                        //
                                                                                                                     //
            return changedAt;                                                                                        //
          }(),                                                                                                       //
          movedTo: function () {                                                                                     // 205
            function movedTo(doc, fromIndex, toIndex, before) {                                                      // 205
              doc = collectionScope.engine.config.beforePublish('movedTo', doc, fromIndex, toIndex, before);         // 206
              doc = collectionScope.addCustomFields(doc, {                                                           // 207
                searchDefinition: definitionString,                                                                  // 208
                searchOptions: optionsString,                                                                        // 209
                sortPosition: toIndex                                                                                // 210
              });                                                                                                    //
                                                                                                                     //
              var beforeDoc = collectionScope._indexConfiguration.collection.findOne(before);                        // 213
                                                                                                                     //
              if (beforeDoc) {                                                                                       // 215
                beforeDoc = collectionScope.addCustomFields(beforeDoc, {                                             // 216
                  searchDefinition: definitionString,                                                                // 217
                  searchOptions: optionsString,                                                                      // 218
                  sortPosition: fromIndex                                                                            // 219
                });                                                                                                  //
                _this2.changed(collectionName, collectionScope.generateId(beforeDoc), beforeDoc);                    // 221
              }                                                                                                      //
                                                                                                                     //
              _this2.changed(collectionName, collectionScope.generateId(doc), doc);                                  // 224
            }                                                                                                        //
                                                                                                                     //
            return movedTo;                                                                                          //
          }(),                                                                                                       //
          removedAt: function () {                                                                                   // 226
            function removedAt(doc, atIndex) {                                                                       // 226
              doc = collectionScope.engine.config.beforePublish('removedAt', doc, atIndex);                          // 227
              doc = collectionScope.addCustomFields(doc, { searchDefinition: definitionString, searchOptions: optionsString });
              _this2.removed(collectionName, collectionScope.generateId(doc));                                       // 229
            }                                                                                                        //
                                                                                                                     //
            return removedAt;                                                                                        //
          }()                                                                                                        //
        });                                                                                                          //
                                                                                                                     //
        this.onStop(function () {                                                                                    // 233
          resultsHandle.stop();                                                                                      // 234
        });                                                                                                          //
                                                                                                                     //
        this.ready();                                                                                                // 237
      });                                                                                                            //
    }                                                                                                                //
                                                                                                                     //
    return _setUpPublication;                                                                                        //
  }();                                                                                                               //
                                                                                                                     //
  (0, _createClass3['default'])(SearchCollection, [{                                                                 //
    key: 'name',                                                                                                     //
    get: function () {                                                                                               //
      function get() {                                                                                               //
        return this._name;                                                                                           // 41
      }                                                                                                              //
                                                                                                                     //
      return get;                                                                                                    //
    }()                                                                                                              //
                                                                                                                     //
    /**                                                                                                              //
     * Get engine                                                                                                    //
     *                                                                                                               //
     * @returns {ReactiveEngine}                                                                                     //
     */                                                                                                              //
                                                                                                                     //
  }, {                                                                                                               //
    key: 'engine',                                                                                                   //
    get: function () {                                                                                               //
      function get() {                                                                                               //
        return this._engine;                                                                                         // 50
      }                                                                                                              //
                                                                                                                     //
      return get;                                                                                                    //
    }()                                                                                                              //
  }]);                                                                                                               //
  return SearchCollection;                                                                                           //
}();                                                                                                                 //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"engines":{"mongo-db.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits",function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/easysearch_core/lib/engines/mongo-db.js                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require('babel-runtime/helpers/inherits');                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                    //
                                                                                                                     //
/**                                                                                                                  //
 * The MongoDBEngine lets you search the index on the server side with MongoDB. Subscriptions and publications       //
 * are handled within the Engine.                                                                                    //
 *                                                                                                                   //
 * @type {MongoDBEngine}                                                                                             //
 */                                                                                                                  //
MongoDBEngine = function (_ReactiveEngine) {                                                                         // 7
  (0, _inherits3['default'])(MongoDBEngine, _ReactiveEngine);                                                        //
                                                                                                                     //
  function MongoDBEngine() {                                                                                         //
    (0, _classCallCheck3['default'])(this, MongoDBEngine);                                                           //
    return (0, _possibleConstructorReturn3['default'])(this, _ReactiveEngine.apply(this, arguments));                //
  }                                                                                                                  //
                                                                                                                     //
  /**                                                                                                                //
   * Return default configuration.                                                                                   //
   *                                                                                                                 //
   * @returns {Object}                                                                                               //
   */                                                                                                                //
                                                                                                                     //
  MongoDBEngine.prototype.defaultConfiguration = function () {                                                       //
    function defaultConfiguration() {                                                                                //
      return _.defaults({}, MongoDBEngine.defaultMongoConfiguration(this), _ReactiveEngine.prototype.defaultConfiguration.call(this));
    }                                                                                                                //
                                                                                                                     //
    return defaultConfiguration;                                                                                     //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Default mongo configuration, used in constructor and MinimongoEngine to get the configuration.                  //
   *                                                                                                                 //
   * @param {Object} engineScope Scope of the engine                                                                 //
   *                                                                                                                 //
   * @returns {Object}                                                                                               //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  MongoDBEngine.defaultMongoConfiguration = function () {                                                            // 7
    function defaultMongoConfiguration(engineScope) {                                                                //
      return {                                                                                                       // 25
        aggregation: '$or',                                                                                          // 26
        selector: function () {                                                                                      // 27
          function selector(searchObject, options, aggregation) {                                                    //
            var selector = {};                                                                                       // 28
                                                                                                                     //
            selector[aggregation] = [];                                                                              // 30
                                                                                                                     //
            _.each(searchObject, function (searchString, field) {                                                    // 32
              var fieldSelector = engineScope.callConfigMethod('selectorPerField', field, searchString, options);    // 33
                                                                                                                     //
              if (fieldSelector) {                                                                                   // 37
                selector[aggregation].push(fieldSelector);                                                           // 38
              }                                                                                                      //
            });                                                                                                      //
                                                                                                                     //
            return selector;                                                                                         // 42
          }                                                                                                          //
                                                                                                                     //
          return selector;                                                                                           //
        }(),                                                                                                         //
        selectorPerField: function () {                                                                              // 44
          function selectorPerField(field, searchString) {                                                           //
            var selector = {};                                                                                       // 45
                                                                                                                     //
            selector[field] = { '$regex': '.*' + searchString + '.*', '$options': 'i' };                             // 47
                                                                                                                     //
            return selector;                                                                                         // 49
          }                                                                                                          //
                                                                                                                     //
          return selectorPerField;                                                                                   //
        }(),                                                                                                         //
        sort: function () {                                                                                          // 51
          function sort(searchObject, options) {                                                                     //
            return options.index.fields;                                                                             // 52
          }                                                                                                          //
                                                                                                                     //
          return sort;                                                                                               //
        }()                                                                                                          //
      };                                                                                                             //
    }                                                                                                                //
                                                                                                                     //
    return defaultMongoConfiguration;                                                                                //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Return the find options for the mongo find query.                                                               //
   *                                                                                                                 //
   * @param {String} searchDefinition Search definition                                                              //
   * @param {Object} options          Search and index options                                                       //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  MongoDBEngine.prototype.getFindOptions = function () {                                                             // 7
    function getFindOptions(searchDefinition, options) {                                                             //
      return {                                                                                                       // 64
        sort: this.callConfigMethod('sort', searchDefinition, options),                                              // 65
        limit: options.search.limit,                                                                                 // 66
        skip: options.search.skip,                                                                                   // 67
        fields: this.callConfigMethod('fields', searchDefinition, options)                                           // 68
      };                                                                                                             //
    }                                                                                                                //
                                                                                                                     //
    return getFindOptions;                                                                                           //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Return the reactive search cursor.                                                                              //
   *                                                                                                                 //
   * @param {String} searchDefinition Search definition                                                              //
   * @param {Object} options          Search and index options                                                       //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  MongoDBEngine.prototype.getSearchCursor = function () {                                                            // 7
    function getSearchCursor(searchDefinition, options) {                                                            //
      var selector = this.callConfigMethod('selector', searchDefinition, options, this.config.aggregation),          // 79
          findOptions = this.getFindOptions(searchDefinition, options),                                              //
          collection = options.index.collection;                                                                     //
                                                                                                                     //
      check(options, Object);                                                                                        // 83
      check(selector, Object);                                                                                       // 84
      check(findOptions, Object);                                                                                    // 85
                                                                                                                     //
      return new Cursor(collection.find(selector, findOptions), collection.find(selector).count());                  // 87
    }                                                                                                                //
                                                                                                                     //
    return getSearchCursor;                                                                                          //
  }();                                                                                                               //
                                                                                                                     //
  return MongoDBEngine;                                                                                              //
}(ReactiveEngine);                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"minimongo.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits",function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/easysearch_core/lib/engines/minimongo.js                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require('babel-runtime/helpers/inherits');                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                    //
                                                                                                                     //
/**                                                                                                                  //
 * The MinimongEngine lets you search the index on the client-side.                                                  //
 *                                                                                                                   //
 * @type {MinimongoEngine}                                                                                           //
 */                                                                                                                  //
MinimongoEngine = function (_Engine) {                                                                               // 6
  (0, _inherits3['default'])(MinimongoEngine, _Engine);                                                              //
                                                                                                                     //
  function MinimongoEngine() {                                                                                       //
    (0, _classCallCheck3['default'])(this, MinimongoEngine);                                                         //
    return (0, _possibleConstructorReturn3['default'])(this, _Engine.apply(this, arguments));                        //
  }                                                                                                                  //
                                                                                                                     //
  /**                                                                                                                //
   * Return default configuration.                                                                                   //
   *                                                                                                                 //
   * @returns {Object}                                                                                               //
   */                                                                                                                //
                                                                                                                     //
  MinimongoEngine.prototype.defaultConfiguration = function () {                                                     //
    function defaultConfiguration() {                                                                                //
      return _.defaults({}, MongoDBEngine.defaultMongoConfiguration(this), _Engine.prototype.defaultConfiguration.call(this));
    }                                                                                                                //
                                                                                                                     //
    return defaultConfiguration;                                                                                     //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Search the index.                                                                                               //
   *                                                                                                                 //
   * @param {Object} searchDefinition Search definition                                                              //
   * @param {Object} options          Object of options                                                              //
   *                                                                                                                 //
   * @returns {cursor}                                                                                               //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  MinimongoEngine.prototype.search = function () {                                                                   // 6
    function search(searchDefinition, options) {                                                                     //
      if (!Meteor.isClient) {                                                                                        // 25
        throw new Meteor.Error('only-client', 'Minimongo can only be used on the client');                           // 26
      }                                                                                                              //
                                                                                                                     //
      searchDefinition = this.transformSearchDefinition(searchDefinition, options);                                  // 29
                                                                                                                     //
      // check() calls are in getSearchCursor method                                                                 //
      return MongoDBEngine.prototype.getSearchCursor.apply(this, [searchDefinition, options]);                       // 24
    }                                                                                                                //
                                                                                                                     //
    return search;                                                                                                   //
  }();                                                                                                               //
                                                                                                                     //
  return MinimongoEngine;                                                                                            //
}(Engine);                                                                                                           //
                                                                                                                     //
MinimongoEngine.prototype.checkSearchParam = ReactiveEngine.prototype.checkSearchParam;                              // 36
MinimongoEngine.prototype.transformSearchDefinition = ReactiveEngine.prototype.transformSearchDefinition;            // 37
                                                                                                                     //
MinimongoEngine.prototype.getFindOptions = function () {                                                             // 39
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {                             //
    args[_key] = arguments[_key];                                                                                    //
  }                                                                                                                  //
                                                                                                                     //
  var findOptions = MongoDBEngine.prototype.getFindOptions.apply(this, args);                                        // 40
                                                                                                                     //
  findOptions.transform = this.config.transform;                                                                     // 42
                                                                                                                     //
  return findOptions;                                                                                                // 44
};                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"mongo-text-index.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits",function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/easysearch_core/lib/engines/mongo-text-index.js                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');                                              //
                                                                                                                     //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                     //
                                                                                                                     //
var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');                        //
                                                                                                                     //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                               //
                                                                                                                     //
var _inherits2 = require('babel-runtime/helpers/inherits');                                                          //
                                                                                                                     //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                 //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                    //
                                                                                                                     //
/**                                                                                                                  //
 * The MongoTextIndexEngine lets you search the index with Mongo text indexes.                                       //
 *                                                                                                                   //
 * @type {MongoTextIndexEngine}                                                                                      //
 */                                                                                                                  //
MongoTextIndexEngine = function (_ReactiveEngine) {                                                                  // 6
  (0, _inherits3['default'])(MongoTextIndexEngine, _ReactiveEngine);                                                 //
                                                                                                                     //
  function MongoTextIndexEngine() {                                                                                  //
    (0, _classCallCheck3['default'])(this, MongoTextIndexEngine);                                                    //
    return (0, _possibleConstructorReturn3['default'])(this, _ReactiveEngine.apply(this, arguments));                //
  }                                                                                                                  //
                                                                                                                     //
  /**                                                                                                                //
   * Return default configuration.                                                                                   //
   *                                                                                                                 //
   * @returns {Object}                                                                                               //
   */                                                                                                                //
                                                                                                                     //
  MongoTextIndexEngine.prototype.defaultConfiguration = function () {                                                //
    function defaultConfiguration() {                                                                                //
      var mongoConfiguration = MongoDBEngine.defaultMongoConfiguration(this);                                        // 13
                                                                                                                     //
      mongoConfiguration.selector = function (searchString) {                                                        // 15
        if (searchString.trim()) {                                                                                   // 16
          return { $text: { $search: searchString } };                                                               // 17
        }                                                                                                            //
                                                                                                                     //
        return {};                                                                                                   // 20
      };                                                                                                             //
                                                                                                                     //
      return _.defaults({}, mongoConfiguration, _ReactiveEngine.prototype.defaultConfiguration.call(this));          // 23
    }                                                                                                                //
                                                                                                                     //
    return defaultConfiguration;                                                                                     //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Setup the index on creation.                                                                                    //
   *                                                                                                                 //
   * @param {Object} indexConfig Index configuration                                                                 //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  MongoTextIndexEngine.prototype.onIndexCreate = function () {                                                       // 6
    function onIndexCreate(indexConfig) {                                                                            //
      _ReactiveEngine.prototype.onIndexCreate.call(this, indexConfig);                                               // 32
                                                                                                                     //
      if (Meteor.isServer) {                                                                                         // 34
        (function () {                                                                                               //
          var textIndexesConfig = {};                                                                                // 35
                                                                                                                     //
          _.each(indexConfig.fields, function (field) {                                                              // 37
            textIndexesConfig[field] = 'text';                                                                       // 38
          });                                                                                                        //
                                                                                                                     //
          if (indexConfig.weights) {                                                                                 // 41
            textIndexesConfig.weights = options.weights();                                                           // 42
          }                                                                                                          //
                                                                                                                     //
          indexConfig.collection._ensureIndex(textIndexesConfig);                                                    // 45
        })();                                                                                                        //
      }                                                                                                              //
    }                                                                                                                //
                                                                                                                     //
    return onIndexCreate;                                                                                            //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Transform the search definition.                                                                                //
   *                                                                                                                 //
   * @param {String|Object} searchDefinition Search definition                                                       //
   * @param {Object}        options          Search and index options                                                //
   *                                                                                                                 //
   * @returns {Object}                                                                                               //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  MongoTextIndexEngine.prototype.transformSearchDefinition = function () {                                           // 6
    function transformSearchDefinition(searchDefinition, options) {                                                  //
      return searchDefinition;                                                                                       // 58
    }                                                                                                                //
                                                                                                                     //
    return transformSearchDefinition;                                                                                //
  }();                                                                                                               //
                                                                                                                     //
  /**                                                                                                                //
   * Check the given search parameter for validity                                                                   //
   *                                                                                                                 //
   * @param search                                                                                                   //
   */                                                                                                                //
                                                                                                                     //
                                                                                                                     //
  MongoTextIndexEngine.prototype.checkSearchParam = function () {                                                    // 6
    function checkSearchParam(search) {                                                                              //
      check(search, String);                                                                                         // 67
    }                                                                                                                //
                                                                                                                     //
    return checkSearchParam;                                                                                         //
  }();                                                                                                               //
                                                                                                                     //
  return MongoTextIndexEngine;                                                                                       //
}(ReactiveEngine);                                                                                                   //
                                                                                                                     //
// Explicitely inherit getSearchCursor method functionality                                                          //
MongoTextIndexEngine.prototype.getSearchCursor = MongoDBEngine.prototype.getSearchCursor;                            // 72
MongoTextIndexEngine.prototype.getFindOptions = MongoDBEngine.prototype.getFindOptions;                              // 73
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"globals.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/easysearch_core/lib/globals.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
EasySearch = {                                                                                                       // 1
  // Core                                                                                                            //
  Index: Index,                                                                                                      // 3
  Engine: Engine,                                                                                                    // 4
  ReactiveEngine: ReactiveEngine,                                                                                    // 5
  Cursor: Cursor,                                                                                                    // 6
  // Engines                                                                                                         //
  MongoDB: MongoDBEngine,                                                                                            // 8
  Minimongo: MinimongoEngine,                                                                                        // 9
  MongoTextIndex: MongoTextIndexEngine                                                                               // 10
};                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/easysearch:core/lib/core/index.js");
require("./node_modules/meteor/easysearch:core/lib/core/engine.js");
require("./node_modules/meteor/easysearch:core/lib/core/reactive-engine.js");
require("./node_modules/meteor/easysearch:core/lib/core/cursor.js");
require("./node_modules/meteor/easysearch:core/lib/core/search-collection.js");
require("./node_modules/meteor/easysearch:core/lib/engines/mongo-db.js");
require("./node_modules/meteor/easysearch:core/lib/engines/minimongo.js");
require("./node_modules/meteor/easysearch:core/lib/engines/mongo-text-index.js");
require("./node_modules/meteor/easysearch:core/lib/globals.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['easysearch:core'] = {}, {
  EasySearch: EasySearch
});

})();

//# sourceMappingURL=easysearch_core.js.map
