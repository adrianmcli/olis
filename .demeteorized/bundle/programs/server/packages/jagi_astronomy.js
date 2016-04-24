(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var _ = Package.underscore._;
var EJSON = Package.ejson.EJSON;
var check = Package.check.check;
var Match = Package.check.Match;

/* Package-scope variables */
var Astronomy, Astro, event, docs, old, modifierPulledValue;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/core/global.js                                                          //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astronomy = {};
Astro = Astronomy;
Astro.classes = {};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/core/config.js                                                          //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.config = {
  verbose: true,
  disableTransform: false,
  triggerEvents: true
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/core/utils.js                                                           //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.utils = {};

Astro.utils.warn = function(warning) {
  if (console && console.warn && Astro.config.verbose) {
    console.warn(warning);
  }
};

Astro.utils.string = {};

Astro.utils.string.ucfirst = function(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

Astro.utils.object = {};

Astro.utils.object.deepMerge = function(target, source, key) {
  var self = this;

  var mergeKey = function(key) {
    var targetValue = target[key];
    var sourceValue = source[key];

    if (_.has(target, key)) {
      result[key] = self.deepMerge(targetValue, sourceValue, key);
    } else {
      if (
        _.isObject(sourceValue) &&
        !_.isArray(sourceValue) &&
        !_.isFunction(sourceValue)
      ) {
        result[key] = self.deepMerge({}, sourceValue, key);
      } else {
        result[key] = sourceValue;
      }
    }
  };

  if (_.isArray(source) && _.isArray(target)) {
    return [].concat(target, source);
  } else if (_.isObject(target) && _.isObject(source)) {
    var result = _.extend({}, target);
    _.each(_.keys(source), mergeKey);
    return result;
  } else {
    return source;
  }
};

Astro.utils.class = {};

Astro.utils.class.transformToClass = function(className) {
  return function(attrs) {
    if (Astro.config.disableTransform) {
      return attrs;
    }

    var Class = Astro.getClass(className);

    if (Class) {
      var typeField = Class.getTypeField();
      if (typeField) {
        var TypeClass = Astro.getClass(attrs[typeField]);
        if (TypeClass) {
          Class = TypeClass;
        }
      }

      var doc = new Class(attrs);
      doc._isNew = false;
      return doc;
    }

    return attrs;
  };
};

Astro.utils.class.inherits = function(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/core/events.js                                                          //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.Events = function() {};

_.extend(Astro.Events.prototype, {
  on: function(eventName, eventHandler) {
    this._events = this._events || {};
    eventName = eventName.toLowerCase();

    this._events[eventName] = this._events[eventName] || [];

    // Add event only if it's not already on the events list.
    if (!_.contains(this._events[eventName], eventHandler)) {
      this._events[eventName].push(eventHandler);
    }
  },

  off: function(eventName, eventHandler) {
    this._events = this._events || {};
    eventName = eventName.toLowerCase();

    if (arguments.length === 1) {
      // Remove all event handlers for given event name.
      delete this._events[eventName];
    } else if (arguments.length === 2) {
      // Remove only one event handler (the passed one) from the events list.
      var index = _.indexOf(this._events[eventName], eventHandler);
      if (index >= 0) {
        this._events[eventName].splice(index, 1);
      }
    }
  },

  has: function(eventName, eventHandler) {
    this._events = this._events || {};
    eventName = eventName.toLowerCase();

    if (arguments.length === 1) {
      return _.has(this._events, eventName);
    } else if (arguments.length === 2) {
      return _.has(this._events, eventName) &&
        _.contains(this._events[eventName], eventHandler);
    }
  },

  emit: function(event) {
    this._events = this._events || {};
    var eventName = event.type;
    var target = event.target;
    eventName = eventName.toLowerCase();

    return _.every(this._events[eventName], function(eventHandler) {
      if (target) {
        eventHandler.call(target, event);
      } else {
        eventHandler(event);
      }
      return !event.stopped;
    });
  },

  each: function(eventName, callback, target) {
    this._events = this._events || {};
    eventName = eventName.toLowerCase();

    _.each(this._events[eventName], function(eventHandler) {
      if (target) {
        callback.call(target, eventHandler);
      } else {
        callback(eventHandler);
      }
    });
  },

  every: function(eventName, callback, target) {
    this._events = this._events || {};
    eventName = eventName.toLowerCase();

    _.every(this._events[eventName], function(eventHandler) {
      if (target) {
        return callback.call(target, eventHandler);
      } else {
        return callback(eventHandler);
      }
    });
  }
});

Astro.Events.mixin = function(obj) {
  if (_.isFunction(obj)) {
    _.each(Astro.Events.prototype, function(method, methodName) {
      obj.prototype[methodName] = method;
    });
  } else {
    _.each(Astro.Events.prototype, function(method, methodName) {
      obj[methodName] = method;
    });
  }
  return obj;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/core/event.js                                                           //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.Event = function(type, data) {
  this.type = type.toLowerCase();
  this.data = data;
};

_.extend(Astro.Event.prototype, {
  type: null,
  data: null,
  stopped: false,
  defaultPrevented: false,

  stopPropagation: function() {
    this.stopped = true;
  },

  preventDefault: function() {
    this.defaultPrevented = true;
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/core/event_manager.js                                                   //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.eventManager = Astro.Events.mixin({});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/core/base_class.js                                                      //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var BaseClass = Astro.BaseClass = function BaseClass(attrs) {
  var doc = this;
  var Class = doc.constructor;
  attrs = attrs || {};

  // Add the private "_modifiers" property to track changes made on the document.
  doc._modifiers = {};

  // Trigger the "beforeInit" event handlers.
  event = new Astro.Event('beforeInit', attrs);
  event.target = doc;
  Class.emitEvent(event);
  // If an event was prevented from the execution, then we stop here.
  if (event.defaultPrevented) {
    return;
  }

  var fieldsNames = Class.getFieldsNames();
  _.each(fieldsNames, function(fieldName) {
    var fieldValue = attrs[fieldName];
    if (_.isUndefined(fieldValue)) {
      // Set a default value.
      doc._setDefault(fieldName);
    } else {
      // Set a value.
      doc._setOne(fieldName, fieldValue, {
        cast: true,
        modifier: false,
        mutable: true
      });
    }
  });

  // Set the "_isNew" flag indicating if an object had been persisted in the
  // collection.
  doc._isNew = true;

  // Trigger the "afterInit" event handlers.
  event = new Astro.Event('afterInit', attrs);
  event.target = doc;
  Class.emitEvent(event);
};

// Add the "_original" property for backward compatibility that will be lazy
// executed.
Object.defineProperty(BaseClass.prototype, '_original', {
  get: function() {
    var doc = this;
    var Class = doc.constructor;

    if (doc._id) {
      var originalDoc = Class.findOne(doc._id);
    } else {
      var originalDoc = new Class();
    }

    var _original = {};
    var fieldsNames = Class.getFieldsNames();
    _.each(fieldsNames, function(fieldName) {
      _original[fieldName] = originalDoc[fieldName];
    });

    return _original;
  },
  enumerable: false,
  configurable: false
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/core/schema.js                                                          //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var checkSchemaDefinition = function(schemaDefinition) {
  // The schema definition has to be an object.
  if (!Match.test(schemaDefinition, Object)) {
    throw new Error('The class definition has to be an object');
  }
  // The class name has to be a string.
  if (!Match.test(schemaDefinition.name, String)) {
    throw new Error('The "name" property has to be a string');
  }
};

Astro.Schema = function Schema(schemaDefinition) {
  var schema = this;

  checkSchemaDefinition.call(schema, schemaDefinition);

  // Store the schema definition.
  schema.definitions = [];

  // Store class name.
  if (_.has(schemaDefinition, 'name')) {
    schema.className = schemaDefinition.name;
  }

  // Store parent class name.
  if (_.has(schemaDefinition, 'inherit')) {
    schema.parentClassName = schemaDefinition.inherit;
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/core/classes.js                                                         //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.getClass = function(className) {
  return Astro.classes[className];
};

var methods = {
  getName: function() {
    return this.schema.className;
  },

  getParent: function() {
    return Astro.getClass(this.schema.parentClassName);
  },

  inherit: function(schemaDefinition) {
    var ParentClass = this;

    schemaDefinition.inherit = ParentClass.getName();

    return Astro.Class(schemaDefinition);
  },

  extend: function(schemaDefinition) {
    var Class = this;
    var schema = Class.schema;

    Astro.eventManager.each('initDefinition', function(eventHandler) {
      eventHandler.call(Class, schemaDefinition);
    });
    // Store the schema definition.
    schema.definitions.push(schemaDefinition);

    // Setup schema with the schema definition.
    Astro.eventManager.each('initSchema', function(eventHandler) {
      eventHandler.call(schema, schemaDefinition);
    });
  }
};

Astro.createClass = Astro.Class = function(schemaDefinition) {
  var Class = function Class() {
    if (!(this instanceof Class)) {
      throw new Error('Use the "new" keyword to create an instance');
    }

    var doc = this;
    var args = arguments;

    // Call default constructor.
    Astro.BaseClass.apply(doc, args);
  };

  // Extend class object with some helper methods.
  _.extend(Class, methods);

  // Initialize a schema and store it in the class object.
  Class.schema = new Astro.Schema(schemaDefinition);

  // Add given class to list of all defined classes.
  Astro.classes[Class.getName()] = Class;

  // Extend base class.
  var ParentClass = Class.getParent();
  // Extend another model class if provided.
  if (ParentClass) {
    Astro.utils.class.inherits(Class, ParentClass);
  } else {
    Astro.utils.class.inherits(Class, Astro.BaseClass);
  }

  // Setup class using the "initClass" event handlers.
  Astro.eventManager.each('initClass', function(eventHandler) {
    eventHandler.call(Class);
  });

  if (ParentClass) {
    _.each(ParentClass.schema.definitions, function(schemaDefinition) {
      Class.extend(schemaDefinition);
    });
  }
  Class.extend(schemaDefinition);

  return Class;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/storage/init_class.js                                                   //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var classMethods = {};

var checkSelector = function(selector, methodName) {
  // If we are not on the server and we are trying to perform non insert
  // operation on a document then it has to be done by ID.
  if (
    !Meteor.isServer && !LocalCollection._selectorIsIdPerhapsAsObject(selector)
  ) {
    throw new Meteor.Error(
      403,
      'Not permitted. Untrusted code may only ' + methodName +
      ' documents by ID.'
    );
  }
};

classMethods.getCollection = function() {
  return this.schema.collection;
};

classMethods.getTypeField = function() {
  return this.schema.typeField;
};

/**
 * @summary Inserts a document into the collection.
 * @locus Anywhere
 * @method insert
 * @memberOf Astro.BaseClass
 * @class
 * @param {Object} [doc] A doc to insert.
 * @param {Function} [callback] Optional. If present, called with an error object as the first argument and, if no error, the _id as the second.
 * @returns {String} Returns an _id of an inserted document.
 */
classMethods.insert = function(doc, callback) {
  var Class = this;

  try {
    var doc = new Class(doc);
    var id = doc.save();
    // Execute a callback function if provided.
    if (_.isFunction(callback)) {
      callback(undefined, id);
      return id;
    }
    // Return result.
    return id;
  } catch (e) {
    if (e instanceof Meteor.Error && _.isFunction(callback)) {
      // Execute a callback function with an error.
      callback(e);
    } else {
      // Throw the error again, if we can not handle it.
      throw e;
    }
  }
};

/**
 * @summary Updates documents in the collection.
 * @return
 * @locus Anywhere
 * @method update
 * @memberOf Astro.BaseClass
 * @class
 * @param {MongoSelector} selector Specifies which documents to modify
 * @param {MongoModifier} modifier Specifies how to modify the documents
 * @param {Object} [options]
 * @param {Boolean} options.multi True to modify all matching documents; false to only modify one of the matching documents (the default).
 * @param {Boolean} options.upsert True to insert a document if no matching documents are found.
 * @param {Function} [callback] Optional. If present, called with an error object as the first argument and, if no error, the number of affected documents as the second.
 * @returns {String|Number} Returns an inserted document ID or number of document that have been updated.
 */
classMethods.update = function(selector, modifier, options, callback) {
  var Class = this;
  var Collection = Class.getCollection();

  // The options argument is optional and if there are only three arguments,
  // then it may mean that the last argument is a callback function.
  if (arguments.length === 3 && _.isFunction(options)) {
    callback = options;
    options = {};
  }
  // Make sure that options object is created.
  options = options || {};
  // Check validity of selector.
  if (Collection._name) {
    checkSelector(selector, 'update');
  }

  try {
    // We select one or many documents depending on the "multi" flag.
    var docs;
    if (options.multi) {
      docs = Collection.find(selector);
    } else {
      docs = Collection.find(selector, {
        limit: 1,
      });
    }

    // INSERT.
    if (docs.count() === 0 && options.upsert) {

      // If there are no matching documents and the "upsert" option was set,
      // then we have to insert a new document.
      var doc = new Class();
      // If a selector is ID, then set it on a document.
      if (_.isString(selector)) {
        doc.set('_id', selector);
      // If selector is object, then set all fields from the selector on a
      // document.
      } else if (_.isObject(selector)) {
        doc.set(selector);
      }
      // Execute a modifier on the document.
      doc._executeModifier(modifier);
      // Insert a document.
      doc.save();
      // Execute a callback function if provided.
      if (_.isFunction(callback)) {
        callback(undefined, doc._id);
      }
      // Return result.
      return doc._id;

    // UPDATE.
    } else {

      // Execute a modifier on each document.
      var count = 0;
      docs.forEach(function(doc, i) {
        // Execute a modifier on the document.
        doc._executeModifier(modifier);
        // Run the "forEach" function if exists, i.
        if (_.isFunction(options.forEach) && !options.forEach(doc, i)) {
          return;
        }
        // Update a document.
        count += doc.save();
      });
      // Execute a callback function if provided.
      if (_.isFunction(callback)) {
        callback(undefined, count);
      }
      // Return result.
      return count;

    }
  } catch (e) {
    if (e instanceof Meteor.Error && _.isFunction(callback)) {
      // Execute a callback function with an error.
      callback(e);
    } else {
      // Throw the error again, if we can not handle it.
      throw e;
    }
  }
};

/**
 * @summary Modify one or more documents in the collection, or insert one if no matching documents were found.
 * @locus Anywhere
 * @method upsert
 * @memberOf Astro.BaseClass
 * @class
 * @param {MongoSelector} selector Specifies which documents to modify
 * @param {MongoModifier} modifier Specifies how to modify the documents
 * @param {Object} [options]
 * @param {Boolean} options.multi True to modify all matching documents; false to only modify one of the matching documents (the default).
 * @param {Function} [callback] Optional. If present, called with an error object as the first argument and, if no error, the number of affected documents as the second.
 * @returns {String|Number} Returns an inserted document ID or number of document that have been updated.
 */
classMethods.upsert = function(selector, modifier, options, callback) {
  var Class = this;

  return Class.update(
    selector,
    modifier,
    _.extend({}, options, {upsert: true}),
    callback
  );
};

/**
 * @summary Remove documents from the collection
 * @locus Anywhere
 * @method remove
 * @memberOf Astro.BaseClass
 * @class
 * @param {MongoSelector} selector Specifies which documents to remove
 * @param {Function} [callback] Optional. If present, called with an error object as its argument.
 * @returns {Number} Returns number of removed documents.
 */
classMethods.remove = function(selector, callback) {
  var Class = this;
  var Collection = Class.getCollection();

  // Check validity of selector.
  if (Collection._name) {
    checkSelector(selector, 'remove');
  }

  // Select all documents matching selector.
  docs = Collection.find(selector);

  // Try removing each document.
  try {
    var count = 0;
    docs.forEach(function(doc, i) {
      // Remove a document.
      count += doc.remove();
    });
    // Execute a callback function if provided.
    if (_.isFunction(callback)) {
      callback(undefined, count);
    }
    // Return result.
    return count;
  } catch (e) {
    if (e instanceof Meteor.Error && _.isFunction(callback)) {
      // Execute a callback function with an error.
      callback(e);
    } else {
      // Throw the error again, if we can not handle it.
      throw e;
    }
  }
};

_.each(['find', 'findOne'], function(methodName) {
  classMethods[methodName] = function(selector, options) {
    var Class = this;
    var schema = Class.schema;
    var Collection = Class.getCollection();

    if (_.isString(selector)) {
      selector = {
        _id: selector
      };
    }
    selector = selector || {};
    options = options || {};
    options.transform = schema.transform ||
      Astro.utils.class.transformToClass(Class.getName());

    // Modify selector and options using the "beforeFind" event handlers.
    var event = new Astro.Event('beforeFind', {
      selector: selector,
      options: options
    });
    event.target = Class;
    Class.emitEvent(event);
    // If a default operation was prevented, then we have to stop here.
    if (event.defaultPrevented) {
      return;
    }

    // If it's an inherited class, then get only documents being instances of
    // the subclass.
    var typeField = Class.getTypeField();
    if (typeField) {
      selector[typeField] = Class.getName();
    }

    var result = Collection[methodName](selector, options);

    // Modify a query result using the "afterFind" event handlers.
    var event = new Astro.Event('afterFind', {
      selector: selector,
      options: options,
      result: result
    });
    event.target = Class;
    Class.emitEvent(event);

    return result;
  };
});

Astro.eventManager.on(
  'initClass', function onInitClassStorage(schemaDefinition) {
    var Class = this;

    // Add storage methods to the class.
    _.extend(Class, classMethods);
  }
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/storage/init_definition.js                                              //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var prototypeMethods = {};

/**
 * @summary Inserts or updates a document into the collection. Returns document _id on insert or modified documents count on update.
 * @locus Anywhere
 * @method save
 * @memberOf Astro.BaseClass
 * @instance
 * @param {Array} [fieldsNames] The list of fields that should only be saved into the collection.
 * @param {Function} [callback] Optional. If present, called with an error object as the first argument and, if no error, the _id or modified documents count as the second.
 */
prototypeMethods.save = function(fieldsNames, callback) {
  var doc = this;
  var Class = doc.constructor;
  var Collection = Class.getCollection();

  // Handle arguments' types detection.
  if (arguments.length === 1) {
    if (_.isFunction(fieldsNames)) {
      callback = fieldsNames;
    }
  }
  if (_.isString(fieldsNames)) {
    fieldsNames = [fieldsNames];
  } else if (!_.isArray(fieldsNames)) {
    fieldsNames = Class.getFieldsNames();
  }

  // Set the flag indicating whether we are updating or instering a document.
  var inserting = doc._isNew;

  // Trigger "beforeSave" event handlers.
  var event = new Astro.Event('beforeSave');
  event.target = doc;
  Class.emitEvent(event);
  // If user prevented default operation, then we have to stop here.
  if (event.defaultPrevented) {
    return inserting ? undefined : 0;
  }
  // Trigger "beforeInsert" or "beforeUpdate" event handlers.
  event = new Astro.Event(inserting ? 'beforeInsert' : 'beforeUpdate');
  event.target = doc;
  Class.emitEvent(event);
  // If user prevented default operation, then we have to stop here.
  if (event.defaultPrevented) {
    return inserting ? undefined : 0;
  }

  // Prepare a variable for storing a Mongo query result.
  var result;

  // Catch any error that may be cause by unability to save a document. It may
  // be a Mongo exception for an index uniqueness etc. The returned error can be
  // handled in the `saveError` event.
  try {
    if (inserting) {
      // Inserting.

      // Get plain values of all fields.
      var values = doc._rawAll({
        transient: false
      });
      // If, we are inserting a document with the null "_id", then we have to
      // remove it.
      if (_.isNull(values._id)) {
        values = _.omit(values, '_id');
      }
      // Pick only these values that we want to save.
      values = _.pick(values, fieldsNames);
      // Insert a document.
      result = doc._id = Collection.insert(values, callback);

    } else {
      // Updating.

      // Get a modifier.
      var modifier = doc._getModifiers();
      // Get a document's id.
      var id = doc._id;
      // Update a document only if there is anything to update.
      if (_.size(modifier) > 0) {
        result = Collection.update(id, modifier, callback);
      } else {
        if (_.isFunction(callback)) {
          callback(undefined, 0);
        }
        return 0;
      }
    }
  } catch (e) {
    if (e.name === 'MongoError') {
      var event = new Astro.Event('saveError', {
        error: e
      });
      event.target = doc;
      Class.emitEvent(event);
      if (event.defaultPrevented) {
        return;
      }
    }

    throw e;
  }

  // Change the "_isNew" flag to "false". Now a document is not new.
  doc._isNew = false;

  // Trigger "afterInsert" or "afterUpdate" event handlers.
  var event = new Astro.Event(inserting ? 'afterInsert' : 'afterUpdate');
  event.target = doc;
  Class.emitEvent(event);
  // Trigger "afterSave" event handlers.
  var event = new Astro.Event('afterSave');
  event.target = doc;
  Class.emitEvent(event);

  // Clear a modifier.
  doc._clearModifiers();

  // Return result of executing a Mongo query.
  return result;
};

/**
 * @summary Removes a document from the collection. Returns an amount of removed documents.
 * @locus Anywhere
 * @method remove
 * @memberOf Astro.BaseClass
 * @instance
 * @param {Function} [callback] Optional. If present, called with an error object as the first argument and, if no error, the an amount of removed documents as the second.
 */
prototypeMethods.remove = function(callback) {
  var doc = this;
  var Class = doc.constructor;
  var Collection = Class.getCollection();

  // Remove only when document has the "_id" field (it's persisted).
  if (!doc._id) {
    return 0;
  }

  // Trigger "beforeRemove" event handlers on the current and parent classes.
  var event = new Astro.Event('beforeRemove');
  event.target = doc;
  Class.emitEvent(event);
  // If user prevented default operation, then we have to stop here.
  if (event.defaultPrevented) {
    return 0;
  }

  // Remove document and save result.
  var result = Collection.remove(doc._id, callback);

  // Trigger "afterRemove" event handlers on the current and parent classes.
  var event = new Astro.Event('afterRemove');
  event.target = doc;
  Class.emitEvent(event);

  // Clear the "_id" attribute.
  doc._id = null;

  // Clear a modifier.
  doc._clearModifiers();

  // Set document as a new, so it will be possible to save document again.
  doc._isNew = true;

  // Return result of removing document.
  return result;
};

prototypeMethods.reload = function() {
  var doc = this;
  var Class = doc.constructor;
  var Collection = Class.getCollection();

  // The document has to be already saved in the collection.
  if (doc._id) {
    // Get a document from the collection without the transformation.
    var plainDoc = Collection.findOne(doc._id, {
      transform: null,
    });

    // Init instance with the new values from the collection.
    Astro.BaseClass.call(doc, plainDoc);

    // Set the "_isNew" flag back to false.
    doc._isNew = false;
  }
};

prototypeMethods.copy = function(save) {
  var doc = this;
  save = save || false;

  // Use EJSON to clone object.
  var copy = EJSON.clone(doc);

  // Remove the "_id" value and set the "_isNew" flag to false so that it will
  // save the object as a new document instead updating the old one.
  copy._id = null;
  copy._isNew = true;

  if (save) {
    copy.save();
  }

  return copy;
};

var events = {};

events.afterInit = function(attrs) {
  var doc = this;
  var Class = doc.constructor;

  doc.set(Class.getTypeField(), Class.getName());
};

var checkSchemaDefinition = function(schemaDefinition) {
  var Class = this;

  // The collection has to be an instance of the Mongo.Collection class.
  if (_.has(schemaDefinition, 'collection') &&
    !(schemaDefinition.collection instanceof Mongo.Collection)
  ) {
    throw new Error(
      'The "collection" property has to be an instance of the ' +
      '"Mongo.Collection" in the "' + Class.getName() + '" class'
    );
  }
  // The "typeField" property has to be a string.
  if (_.has(schemaDefinition, 'typeField') &&
    !_.isString(schemaDefinition.typeField)
  ) {
    throw new Error(
      'The "typeField" property has to be a string in the "' +
      Class.getName() + '" class'
    );
  }
};

Astro.eventManager.on(
  'initDefinition', function onInitDefinitionStorage(schemaDefinition) {
    var Class = this;
    var schema = Class.schema;

    checkSchemaDefinition.call(Class, schemaDefinition);

    // If there is no collection for the class, then we can stop class
    // initialization for the module.
    if (_.has(schemaDefinition, 'collection')) {
      schema.collection = schemaDefinition.collection;
    }

    // If there is no collection related with a class, then we can not continue.
    var Collection = Class.getCollection();
    if (!Collection) {
      return;
    }

    var transform = schemaDefinition.transform;
    if (_.isUndefined(schema.transform) || _.isNull(transform)) {
      if (_.isFunction(transform)) {
        // Apply custom transformation function.
        schema.transform = function(attrs) {
          if (Astro.config.disableTransform) {
            return attrs;
          }
          return transform(attrs);
        };
        Collection._transform = LocalCollection.wrapTransform(schema.transform);
      } else if (_.isUndefined(transform)) {
        // Apply standard transformation function, if the transform function was
        // not provided and the collection does not have the transform function
        // yet.
        schema.transform = Astro.utils.class.transformToClass(Class.getName());
        Collection._transform = LocalCollection.wrapTransform(
          schema.transform
        );
      } else if (_.isNull(transform)) {
        Collection._transform = schema.transform = null;
      }
    }

    // We only add fields to the class if there is a collection provided in a
    // class definition.
    if (!_.has(schemaDefinition, 'collection')) {
      return;
    }

    // Prepare an object for storing fields definitions and events list that
    // will extend the current schema.
    var extendDefinition = {
      fields: {
        // Add the "_id" field.
        _id: {
          type: 'null'
        }
      }
    };

    // Add the "type" field, to distinguish to what class we have to cast a
    // document fetched from the collection.
    var typeField = schemaDefinition.typeField;
    if (typeField) {
      schema.typeField = typeField;
      extendDefinition.fields[typeField] = {
        type: 'string'
      };

      // Add the "afterInit" event handler that sets a type field.
      extendDefinition.events = {
        afterInit: [events.afterInit]
      };
    }

    // Extend the current schema definition.
    Class.extend(extendDefinition);

    // Add storage methods to the class prototype.
    _.extend(Class.prototype, prototypeMethods);
  }
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/behaviors/global.js                                                     //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.behaviors = {};

Astro.getBehavior = function(behaviorName) {
  return Astro.behaviors[behaviorName];
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/behaviors/behavior.js                                                   //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var checkArguments = function(behaviorDefinition) {
  // Check parameters validity.
  if (!_.isObject(behaviorDefinition)) {
    throw new Error('The behavior definition has to be an object');
  }

  // Check if behavior name is provided.
  if (!_.has(behaviorDefinition, 'name')) {
    throw new Error('The behavior name can not be empty');
  }

  // Check if behavior name is a string.
  if (!_.isString(behaviorDefinition.name)) {
    throw new Error('The behavior name has to be a string');
  }

  // Check if behavior with given name already exists.
  if (_.has(Astro.behaviors, behaviorDefinition.name)) {
    throw new Error(
      'Behavior with the "' + behaviorDefinition.name + '" name already exists'
    );
  }
};

Astro.Behavior = function Behavior(behaviorDefinition) {
  checkArguments.apply(this, arguments);

  this.name = behaviorDefinition.name;
  this.options = behaviorDefinition.options || {};
  this.methods = behaviorDefinition.methods || {};
  this.createSchemaDefinition = behaviorDefinition.createSchemaDefinition ||
    function createSchemaDefinition() {
      return {};
    };
};

Astro.Behavior.prototype.createGenerator = function() {
  var behavior = this;

  return function classBehaviorGenerator(options) {
    return new Astro.ClassBehavior({
      behavior: behavior,
      options: _.extend({}, behavior.options, options)
    });
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/behaviors/class_behavior.js                                             //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.ClassBehavior = function ClassBehavior(classBehaviorDefinition) {
  this.behavior = classBehaviorDefinition.behavior;
  this.options = classBehaviorDefinition.options;
  this.definition = this.behavior.createSchemaDefinition(this.options);
  _.extend(this, this.behavior.methods);
};

Astro.ClassBehavior.prototype.callMethod = function(methodName, doc) {
  var method = this.behavior.methods[methodName];
  if (!_.isFunction(method)) {
    throw new Error(
      'The "' + methodName + '" method in the "' +
      this.behavior.name + '" behavior does not exist '
    );
  }

  return method.call(doc);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/behaviors/create_behavior.js                                            //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.createBehavior = function(behaviorDefinition) {
  var behavior = new Astro.Behavior(behaviorDefinition);
  return Astro.behaviors[behavior.name] = behavior.createGenerator();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/behaviors/init_class.js                                                 //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var classMethods = {};

classMethods.hasBehavior = function(behaviorName) {
  return _.has(this.schema.behaviors, behaviorName);
};

classMethods.getBehavior = function(behaviorName) {
  return this.schema.behaviors[behaviorName];
};

classMethods.getBehaviors = function() {
  return this.schema.behaviors;
};

Astro.eventManager.on(
  'initClass', function onInitClassBehaviors() {
    var Class = this;
    var schema = Class.schema;

    _.extend(Class, classMethods);

    schema.behaviors = schema.behaviors || {};
  }
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/behaviors/init_definition.js                                            //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var checkBehaviorData = function(behaviorData, behaviorName, className) {
  if (!Match.test(behaviorData, Match.OneOf(Object, null, undefined))) {
    throw new Error(
      'The behavior data in the "' + className +
      '" class schema has to be an object or left empty'
    );
  }
  if (!Match.test(behaviorName, String)) {
    throw new Error(
      'The behavior name in the "' + className +
      '" class schema has to be a string'
    );
  }
  if (!_.has(Astro.behaviors, behaviorName)) {
    throw new Error(
      'The "' + behaviorName + '" behavior in "' + className +
      '" class schema does not exist'
    );
  }
};

Astro.eventManager.on(
  'initDefinition', function onInitDefinitionBehaviors(schemaDefinition) {
    var Class = this;
    var schema = Class.schema;
    var behaviorsDefinitions = {};

    if (_.has(schemaDefinition, 'behaviors')) {
      _.each(schemaDefinition.behaviors, function(behaviorData, behaviorName) {
        var behavior;

        if (_.isObject(behaviorData)) {
          behavior = behaviorData;
        } else if (_.isString(behaviorData)) {
          behaviorName = behaviorData;
          behavior = {};
        }

        if (behavior) {
          // Check validity of the class behavior.
          checkBehaviorData(behavior, behaviorName, Class.getName());
          behaviorsDefinitions[behaviorName] = behavior;
        }
      });
    }

    if (_.size(behaviorsDefinitions) > 0) {
      _.each(behaviorsDefinitions, function(behaviorOptions, behaviorName) {
        // Get a behavior generator.
        var classBehaviorGenerator = Astro.getBehavior(behaviorName);
        var classBehavior = classBehaviorGenerator(behaviorOptions);
        behaviorsDefinitions[behaviorName] = classBehavior;
        Class.extend(classBehavior.definition);
      });

      // Add behaviors to the schema.
      _.extend(schema.behaviors, behaviorsDefinitions);
    }
  }
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/events/init_class.js                                                    //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var classMethods = {};

classMethods.hasEvent = function(eventName, eventHandler) {
  var Class = this;

  return Class.schema.eventManager.has.apply(
    Class.schema.eventManager, arguments
  );
};

classMethods.emitEvent = function(event) {
  if (!Astro.config.triggerEvents) {
    return;
  }

  if (!event) {
    return;
  }

  var Class = this;
  var eventName = event.type;
  var target = event.target;

  Class.schema.eventManager.emit(event);

  if (!event.stopped) {
    return Astro.eventManager.emit(event);
  }

  return !event.stopped;
};

Astro.eventManager.on(
  'initClass', function onInitClassEvents(schemaDefinition) {
    var Class = this;
    var schema = Class.schema;

    _.extend(Class, classMethods);

    // Add an event manger to the schema.
    schema.eventManager = schema.eventManager || Astro.Events.mixin({});
  }
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/events/init_definition.js                                               //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var checkEventDefinition = function(eventDefinition, eventName, className) {
  // Check if the event name is a string.
  if (!Match.test(eventName, String)) {
    throw new Error(
      'The event name in the "' + className +
      '" class has to be a string'
    );
  }
  // Check if the event definition is an array of functions.
  if (!Match.test(eventDefinition, [Function])) {
    throw new Error(
      'The event handler for the "' + eventName + '" event in the "' +
      className + '" class has to be a function'
    );
  }
};

Astro.eventManager.on(
  'initDefinition', function onInitDefinitionEvents(schemaDefinition) {
    var Class = this;
    var schema = Class.schema;
    var eventsDefinitions = {};

    if (_.has(schemaDefinition, 'events')) {
      _.each(schemaDefinition.events, function(eventHandlers, eventName) {
        var eventDefinition;

        if (_.isArray(eventHandlers)) {
          eventDefinition = eventHandlers;
        } else if (_.isFunction(eventHandlers)) {
          eventDefinition = [eventHandlers];
        }

        if (eventDefinition) {
          // Check validity of the event definition.
          checkEventDefinition(eventDefinition, eventName, Class.getName());
          eventsDefinitions[eventName] = eventDefinition;
        }
      });
    }

    if (_.size(eventsDefinitions) > 0) {
      // Add events to the event manager in a schema.
      _.each(eventsDefinitions, function(eventHandlers, eventName) {
        _.each(eventHandlers, function(eventHandler) {
          schema.eventManager.on(eventName, eventHandler);
        });
      });
    }
  }
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/ejson/init_module.js                                                    //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var methods = {};

methods.typeName = function() {
  return 'Astronomy';
};

methods.toJSONValue = function(args) {
  var doc = this;
  var Class = doc.constructor;

  var json = {
    class: Class.getName(),
    isNew: doc._isNew
  };

  var event = new Astro.Event('toJSONValue', json);
  event.target = doc;
  Astro.eventManager.emit(event);

  return json;
};

EJSON.addType('Astronomy', function(json) {
  var Class = Astro.getClass(json.class);
  var doc = new Class();
  doc._isNew = json.isNew;

  var event = new Astro.Event('fromJSONValue', json);
  event.target = doc;
  Astro.eventManager.emit(event);

  return doc;
});

_.extend(Astro.BaseClass.prototype, methods);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/methods/init_class.js                                                   //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var classMethods = {};

classMethods.hasMethod = function(methodName) {
  return _.has(this.schema.methods, methodName);
};

classMethods.getMethod = function(methodName) {
  return this.schema.methods[methodName];
};

classMethods.getMethods = function() {
  return this.schema.methods;
};

Astro.eventManager.on(
  'initClass', function onInitClassMethods(schemaDefinition) {
    var Class = this;
    var schema = Class.schema;

    // Extend class with class methods.
    _.extend(Class, classMethods);

    schema.methods = schema.methods || {};
  }
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/methods/init_definition.js                                              //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var checkMethod = function(method, methodName, className) {
  // The method name has to be a string.
  if (!Match.test(methodName, String)) {
    throw new Error(
      'The method name in the "' + className + '" class has to be a string'
    );
  }
  // The method has to be a function.
  if (!Match.test(method, Function)) {
    throw new Error(
      'The "' + methodName + '" method in the "' + className +
      '" class has to be a function'
    );
  }
};

Astro.eventManager.on(
  'initDefinition', function onInitDefinitionMethods(schemaDefinition) {
    var Class = this;
    var schema = Class.schema;
    var methodsDefinitions = {};

    if (_.has(schemaDefinition, 'methods')) {
      _.each(schemaDefinition.methods, function(method, methodName) {
        if (_.isFunction(method)) {
          methodsDefinitions[methodName] = method;
          // Check validity of the method definition.
          checkMethod(method, methodName, Class.getName());
        }
      });
    }

    if (_.size(methodsDefinitions) > 0) {
      _.each(methodsDefinitions, function(method, methodName) {
        Class.prototype[methodName] = method;
      });

      // Add methods to the schema.
      _.extend(schema.methods, schemaDefinition.methods);
    }
  }
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/global.js                                                        //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.fields = {};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/create_type.js                                                   //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.createType = function(typeDefinition) {
  if (!_.isObject(typeDefinition)) {
    throw new Error('Provide type definition');
  }
  if (!_.has(typeDefinition, 'name')) {
    throw new Error('Type name is required');
  }

  var Type;
  if (
    _.has(typeDefinition, 'constructor') &&
    _.isFunction(typeDefinition.constructor)
  ) {
    Type = typeDefinition.constructor;
  } else {
    Type = function TypeField() {
      Astro.BaseField.apply(this, arguments);
    };
  }
  var ParentType = typeDefinition.inherit ?
    typeDefinition.inherit : Astro.BaseField;

  // Inherit from the BaseClass or a provided class.
  Astro.utils.class.inherits(Type, ParentType);

  if (_.isFunction(typeDefinition.getDefault)) {
    Type.prototype._getDefault = typeDefinition.getDefault;
  }
  if (_.isFunction(typeDefinition.needsCast)) {
    Type.prototype._needsCast = typeDefinition.needsCast;
  }
  if (_.isFunction(typeDefinition.cast)) {
    Type.prototype._cast = typeDefinition.cast;
  }
  if (_.isFunction(typeDefinition.needsPlain)) {
    Type.prototype._needsPlain = typeDefinition.needsCast;
  }
  if (_.isFunction(typeDefinition.plain)) {
    Type.prototype._plain = typeDefinition.plain;
  }

  Astro.fields[typeDefinition.name] = Type;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/base_field.js                                                    //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var BaseField = Astro.BaseField = function BaseField(definition) {
  var self = this;

  definition = _.isUndefined(definition) ? {} : definition;

  this.type = _.isUndefined(definition.type) ?
    null : definition.type;
  this.name = _.isUndefined(definition.name) ?
    null : definition.name;
  this.default = _.isUndefined(definition.default) ?
    null : definition.default;
  this.optional = _.isUndefined(definition.optional) ?
    false : definition.optional;
  this.immutable = _.isUndefined(definition.immutable) ?
    false : definition.immutable;
  this.transient = _.isUndefined(definition.transient) ?
    false : definition.transient;
};

BaseField.prototype.getDefault = function() {
  var defaultValue;

  // Get a default value from the function if provided.
  if (_.isFunction(this.default)) {
    defaultValue = this.default();
  } else if (_.isNull(this.default)) {
    return null;
  } else {
    defaultValue = this.default;
  }

  if (_.isFunction(this._getDefault)) {
    // User defined "getDefault" method is responsible for casting a value.
    return this._getDefault(defaultValue);
  }

  return this.cast(defaultValue);
};

BaseField.prototype.needsCast = function(value) {
  if (_.isUndefined(value) || _.isNull(value)) {
    return false;
  }

  if (_.isFunction(this._needsCast)) {
    return this._needsCast(value);
  }

  return true;
};

BaseField.prototype.cast = function(value) {
  if (this.needsCast(value)) {
    if (_.isFunction(this._cast)) {
      return this._cast(value);
    }
  }

  return value;
};

BaseField.prototype.needsPlain = function(value) {
  if (_.isUndefined(value) || _.isNull(value)) {
    return false;
  }

  if (_.isFunction(this._needsPlain)) {
    return this._needsPlain(value);
  }

  return true;
};

BaseField.prototype.plain = function(value) {
  if (this.needsPlain(value)) {
    if (_.isFunction(this._plain)) {
      return this._plain(value);
    } else {
      return value.valueOf();
    }
  }

  return value;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/types/null_field.js                                              //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.createType({
  name: 'null',
  constructor: function NullField() {
    Astro.BaseField.apply(this, arguments);
  },
  plain: function(value) {
    return value;
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/types/string_field.js                                            //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.createType({
  name: 'string',
  constructor: function StringField() {
    Astro.BaseField.apply(this, arguments);
  },
  needsCast: function(value) {
    return !_.isString(value);
  },
  cast: function(value) {
    return String(value);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/types/number_field.js                                            //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.createType({
  name: 'number',
  constructor: function NumberField() {
    Astro.BaseField.apply(this, arguments);
  },
  needsCast: function(value) {
    return !_.isNumber(value);
  },
  cast: function(value) {
    return Number(value);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/types/boolean_field.js                                           //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.createType({
  name: 'boolean',
  constructor: function BooleanField() {
    Astro.BaseField.apply(this, arguments);
  },
  needsCast: function(value) {
    return !_.isBoolean(value);
  },
  cast: function(value) {
    if (_.isString(value) && value.toLowerCase() === 'false' || value === '0') {
      value = false;
    }
    return Boolean(value);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/types/date_field.js                                              //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.createType({
  name: 'date',
  constructor: function DateField() {
    Astro.BaseField.apply(this, arguments);
  },
  needsCast: function(value) {
    return !_.isDate(value);
  },
  cast: function(value) {
    return new Date(value);
  },
  plain: function(value) {
    return value;
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/types/object_field.js                                            //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.createType({
  name: 'object',
  constructor: function ObjectField(definition) {
    Astro.BaseField.apply(this, arguments);

    this.class = null;

    if (_.isString(definition.nested)) {
      var Class = Astro.getClass(definition.nested);
      if (!Class) {
        throw new Error('The nested class for [' + definition.name + '] does not exist');
      }
      this.class = Class;
      return;
    } else if (_.isObject(definition.nested)) {
      this.class = Astro.Class(definition.nested);
      return;
    }
  },
  getDefault: function(def) {
    if (!_.isObject(def)) {
      def = Object(def);
    }

    return this.cast(def);
  },
  cast: function(value) {
    var Class = this.class;

    if (Class) {
      if (!(value instanceof Class)) {
        value = new Class(value);
      } else {
        value = EJSON.clone(value);
      }
    } else {
      if (_.isObject(value)) {
        value = EJSON.clone(value);
      } else {
        value = new Object(value);
      }
    }

    return value;
  },
  plain: function(value) {
    var Class = this.class;

    if (Class) {
      if (value instanceof Class) {
        value = value.raw();
      } else {
        value = EJSON.clone(value.valueOf());
      }
    } else {
      value = EJSON.clone(value.valueOf());
    }

    return value;
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/types/array_field.js                                             //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.createType({
  name: 'array',
  constructor: function ArrayField(definition) {
    Astro.BaseField.apply(this, arguments);

    this.field = null;
    this.class = null;

    if (_.isString(definition.nested)) {
      var Field = Astro.fields[definition.nested];
      if (Field) {
        this.field = new Field();
        return;
      }

      var Class = Astro.getClass(definition.nested);
      if (!Class) {
        throw new Error('The nested class for [' + definition.name + '] does not exist');
      }
      this.class = Class;
      return;
    } else if (_.isObject(definition.nested)) {
      this.class = Astro.Class(definition.nested);
    } else {
      var Field = Astro.fields.null;
      if (Field) {
        this.field = new Field();
      }
    }
  },
  getDefault: function(def) {
    var self = this;

    if (!_.isArray(def)) {
      def = Array(def);
    }

    // Cast each value of the array.
    _.each(def, function(v, i) {
      def[i] = self.cast(v);
    });

    return def;
  },
  cast: function(values) {
    var Class = this.class;
    var field = this.field;

    if (Class) {
      if (!(values instanceof Class)) {
        values = new Class(values);
      } else {
        values = EJSON.clone(values);
      }
    } else if (field) {
      values = field.cast(values);
    }

    return values;
  },
  plain: function(values) {
    var Class = this.class;
    var field = this.field;

    if (Class) {
      if (values instanceof Class) {
        values = values.raw();
      } else {
        values = EJSON.clone(values);
      }
    } else if (field) {
      values = field.plain(values);
    }

    return values;
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/utils.js                                                         //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
Astro.utils.fields = {};

Astro.utils.fields.isNestedFieldName = function(fieldName) {
  return fieldName.indexOf('.') !== -1 || fieldName.indexOf('$') !== -1;
};

Astro.utils.fields.traverseNestedDocs = function(doc, fieldName, callback) {
  // Method for running callback function with all its arguments.
  var runCallback = function(nestedDoc, nestedFieldName, index) {
    var Class;
    var field;
    if (nestedDoc instanceof Astro.BaseClass) {
      Class = nestedDoc.constructor;
      field = Class.getField(nestedFieldName);
    }
    callback(nestedDoc, nestedFieldName, Class, field, index);
  };

  // Check whether the given field name is pattern.
  if (fieldName.indexOf('.') === -1) {
    // If it's not a pattern, then just invoke callback function.
    runCallback(doc, fieldName);
    return;
  }

  // Split the nested field name pattern by the "." sign.
  var segments = fieldName.split('.');
  var lastIndex = segments.length - 1;
  var oneBeforeLastIndex = lastIndex - 1;

  // Check wheter the last segment is a number. If it is, then we have to change
  // the way how we traverse the last field.
  var lastSegment = segments[lastIndex];
  var lastSegmentIsNumber = /^\d+$/.test(lastSegment);
  if (lastSegmentIsNumber) {
    lastSegment = parseInt(lastSegment, 10);
  }

  // Traverse nested fields until reaching the last one from the pattern.
  var next = function(nestedDoc, segmentIndex) {
    // Get a nested field name under the given index.
    var nestedFieldName = segments[segmentIndex];

    if (segmentIndex === lastIndex) {
      // Ivoke the callback function, if we reached the last nested document.
      runCallback(nestedDoc, nestedFieldName);
    } else if (lastSegmentIsNumber && segmentIndex === oneBeforeLastIndex) {
      runCallback(nestedDoc, nestedFieldName, lastSegment);
    } else {
      // Check if the value of the current nested document is an object, so that
      // we can go deeper.
      if (_.isObject(nestedDoc[nestedFieldName])) {
        var nextNestedDoc = nestedDoc[nestedFieldName];
        var nextSegmentIndex = segmentIndex + 1;
        if (nextNestedDoc instanceof Astro.BaseClass) {
          var remainingFieldName = segments.slice(nextSegmentIndex).join('.');
          Astro.utils.fields.traverseNestedDocs(
            nextNestedDoc,
            remainingFieldName,
            callback
          );
        } else {
          next(nextNestedDoc, nextSegmentIndex);
        }
      } else {
        return;
      }
    }
  };

  // Start traversing nested fields.
  next(doc, 0);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/modifiers.js                                                     //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var proto = Astro.BaseClass.prototype;

var modifiersList = ['$set', '$push', '$pop', '$pullAll', '$inc'];

// Utils.

proto._executeModifier = function(modifier) {
  var doc = this;

  if (_.isObject(modifier.$set)) {
    // For each $set modifier, we assign a given value to a field.
    _.each(modifier.$set, function(fieldValue, fieldName) {
      doc._setOne(fieldName, fieldValue);
    });
  }

  if (_.isObject(modifier.$push)) {
    // For each $push modifier, we push a given value at the end of a field.
    _.each(modifier.$push, function(pushedValue, fieldName) {
      // If the $push modifier contains the $each modifier, then we have push
      // each value of the array.
      if (_.isArray(pushedValue.$each)) {
        _.each(pushedValue.$each, function(element) {
          doc._pushOne(fieldName, element);
        });
      } else {
        doc._pushOne(fieldName, pushedValue);
      }
    });
  }

  if (_.isObject(modifier.$inc)) {
    // For each $inc modifier, we increment a given value to of a field.
    _.each(modifier.$inc, function(incAmount, fieldName) {
      doc._incOne(fieldName, incAmount);
    });
  }

  if (_.isObject(modifier.$pop)) {
    // For each $pop modifier, we pop the first or last value of a field.
    _.each(modifier.$pop, function(popSide, fieldName) {
      doc._popOne(fieldName, popSide);
    });
  }
};

proto._addModifier = function(modifierName, fieldName, fieldValue) {
  var doc = this;

  var modifierFunctions = {
    $set: function() {
      doc._modifiers.$set[fieldName] = fieldValue;
      return true;
    },
    $push: function() {
      // First, we check whether there is already the $push modifier for the
      // given field name.
      if (_.has(doc._modifiers.$push, fieldName)) {
        if (_.has(doc._modifiers.$push[fieldName], '$each')) {
          doc._modifiers.$push[fieldName].$each.push(fieldValue);
        } else {
          doc._modifiers.$push[fieldName] = {
            $each: [
              doc._modifiers.$push[fieldName],
              fieldValue
            ]
          };
        }
      } else {
        doc._modifiers.$push[fieldName] = fieldValue;
      }
      return true;
    },
    $inc: function() {
      // First, we check whether there is already the $inc modifier for a given
      // field name.
      if (_.has(doc._modifiers.$inc, fieldName)) {
        doc._modifiers.$inc[fieldName] += fieldValue;
      } else {
        doc._modifiers.$inc[fieldName] = fieldValue;
      }
      return true;
    },
    $pop: function() {
      // First, we check whether there is already the $pop modifier for a given
      // field name.
      if (_.has(doc._modifiers.$pop, fieldName)) {
        return false;
      }
      doc._modifiers.$pop[fieldName] = fieldValue;
      return true;
    },
    $pullAll: function() {
      if (_.has(doc._modifiers.$pullAll, fieldName)) {
        doc._modifiers.$pullAll[fieldName].push(fieldValue);
      } else {
        doc._modifiers.$pullAll = doc._modifiers.$pullAll || {};
        doc._modifiers.$pullAll[fieldName] = [];
        doc._modifiers.$pullAll[fieldName].push(fieldValue);
      }
      return true;
    }
  };

  // Check whether a given modifier is allowed.
  if (!_.contains(modifiersList, modifierName)) {
    return false;
  }

  // If there is already any modifier for the same field then stop here.
  // In MongoDB we can not execute multiple modifiers for the same field.
  if (_.some(_.without(modifiersList, modifierName), function(modifierName) {
    return doc._hasModifier(modifierName, fieldName);
  })) {
    return false;
  }

  // Create a modifier group if does not exist.
  doc._modifiers[modifierName] = doc._modifiers[modifierName] || {};

  // Execute a modifier function.
  return modifierFunctions[modifierName]();
};

proto._clearUnnecessaryModifiers = function() {
  old = old || false;
  var doc = this;
  var Class = doc.constructor;

  if (doc._id && Class.getCollection()) {
    var originalDoc = Class.findOne(doc._id);
  } else {
    var originalDoc = new Class();
  }

  var modified = {};

  var fields = Class.getFields();
  _.each(fields, function(field, fieldName) {
    if (field.transient) {
      return;
    }
    if (
      field instanceof Astro.fields.object &&
      field.class &&
      doc[fieldName] instanceof Astro.BaseClass
    ) {
      // Get a nested document.
      var nestedDoc = doc[fieldName];
      // Clear modifiers.
      nestedDoc._clearUnnecessaryModifiers();
    } else if (field instanceof Astro.fields.array && field.class) {
      // Get nested documents.
      var nestedDocs = doc[fieldName];
      _.each(nestedDocs, function(nestedDoc, nestedDocIndex) {
        // Clear modifiers.
        nestedDoc._clearUnnecessaryModifiers();
      });
    } else {
      if (EJSON.equals(originalDoc[fieldName], doc[fieldName])) {
        _.each(modifiersList, function(modifierName) {
          if (
            doc._modifiers[modifierName] &&
            _.has(doc._modifiers[modifierName], fieldName)
          ) {
            delete doc._modifiers[modifierName][fieldName];
            if (_.size(doc._modifiers[modifierName]) === 0) {
              delete doc._modifiers[modifierName];
            }
          }
        });
      }
    }
  });

  return modified;
};

proto._clearModifiers = function() {
  var doc = this;
  var Class = doc.constructor;

  doc._modifiers = {};

  // Get modifiers for nested fields.
  var fieldsNames = Class.getFieldsNames();
  // Loop through class fields and for each one check if it is a nested field.
  _.each(fieldsNames, function(fieldName) {
    // Get a definition of a field.
    var field = Class.getField(fieldName);

    // We can not look for a modifier in a nested field that it's empty.
    if (_.isNull(doc[fieldName])) {
      return;
    }

    if (
      field instanceof Astro.fields.object &&
      field.class &&
      doc[fieldName] instanceof Astro.BaseClass
    ) {
      // One nested doc.

      // Get a nested document.
      var nestedDoc = doc[fieldName];
      // Clear nested modifiers.
      nestedDoc._clearModifiers();
    } else if (field instanceof Astro.fields.array && field.class) {
      // Many nested docs.

      // Get nested documents.
      var nestedDocs = doc[fieldName];
      _.each(nestedDocs, function(nestedDoc, nestedDocIndex) {
        // Clear nested modifiers.
        nestedDoc._clearModifiers();
      });
    }
  });
};

proto._hasModifier = function(modifier, fieldName) {
  if (arguments.length === 1) {
    return _.has(this._modifiers, modifier);
  } else if (arguments.length === 2) {
    return _.has(this._modifiers, modifier) &&
      _.has(this._modifiers[modifier], fieldName);
  }
};

proto._getModifier = function(modifierName, fieldName) {
  var doc = this;
  var Class = doc.constructor;

  if (doc._id && Class.getCollection()) {
    var originalDoc = Class.findOne(doc._id);
  } else {
    var originalDoc = new Class();
  }

  var result = {};

  if (!doc._hasModifier.apply(doc, arguments)) {
    return result;
  }

  if (_.isUndefined(fieldName)) {
    _.each(doc._modifiers[modifierName], function(modifierValue, fieldName) {
      // Get an original value of the field.
      var originalValue;
      Astro.utils.fields.traverseNestedDocs(
        originalDoc,
        fieldName,
        function(nestedField, nestedFieldName, Class, field, index) {
          originalValue = _.isUndefined(index) ?
            nestedField[nestedFieldName] : nestedField[nestedFieldName][index];
        }
      );

      // Get a current value of the field.
      var fieldValue;
      Astro.utils.fields.traverseNestedDocs(
        doc,
        fieldName,
        function(nestedField, nestedFieldName, Class, field, index) {
          fieldValue = _.isUndefined(index) ?
            nestedField[nestedFieldName] : nestedField[nestedFieldName][index];
        }
      );

      // If a value has changed then get the modifier.
      if (!doc._isNew && !EJSON.equals(originalValue, fieldValue)) {
        result[fieldName] = modifierValue;
      } else {
        result[fieldName] = modifierValue;
      }
    });
  } else {
    result[fieldName] = doc._modifiers[modifierName][fieldName];
  }

  return result;
};

proto._getModifiers = function(nested) {
  var doc = this;
  var Class = doc.constructor;

  nested = _.isUndefined(nested) ? true : nested;

  var docModifiers = {};

  // Collect all modifiers.
  _.each(modifiersList, function(modifierName) {
    var modifier = doc._getModifier(modifierName);
    if (_.size(modifier) > 0) {
      docModifiers[modifierName] = modifier;
    }
  });

  if (!nested) {
    return docModifiers;
  }

  // Get modifiers for nested fields.
  var fieldsNames = Class.getFieldsNames();
  // Loop through class fields and for each one check if it is a nested field.
  _.each(fieldsNames, function(fieldName) {
    // Get a definition of a field.
    var field = Class.getField(fieldName);

    // We can not look for a modifier in a nested field that it's empty.
    if (_.isNull(doc[fieldName])) {
      return;
    }

    // One nested doc.
    if (
      field instanceof Astro.fields.object &&
      field.class &&
      doc[fieldName] instanceof Astro.BaseClass
    ) {

      // Get a nested document.
      var nestedDoc = doc[fieldName];
      // Get a modifier for a nested document.
      var nestedDocModifier = nestedDoc._getModifiers();
      // We have to loop through modifiers list and check if some modifiers
      // already exist in the parent modifier. If so, then we will try to merge
      // them.
      _.each(nestedDocModifier, function(nestedFieldsValues, modifierName) {
        _.each(nestedFieldsValues, function(nestedFieldValue, nestedFieldName) {
          docModifiers[modifierName] = docModifiers[modifierName] || {};
          var fullFieldName = fieldName + '.' + nestedFieldName;
          docModifiers[modifierName][fullFieldName] = nestedFieldValue;
        });
      });

      // Many nested docs.
    } else if (field instanceof Astro.fields.array && field.class) {

      // Get nested documents.
      var nestedDocs = doc[fieldName];
      _.each(nestedDocs, function(nestedDoc, nestedDocIndex) {
        // Get a modifier for a nested document.
        var nestedDocModifier = nestedDoc._getModifiers();
        // We have to loop through modifiers list and check if some modifiers
        // already exist in the parent modifier. If so, then we will try to
        // merge them.
        _.each(nestedDocModifier, function(nestedFieldsValues, modifierName) {
          _.each(nestedFieldsValues, function(
            nestedFieldValue, nestedFieldName
          ) {
            docModifiers[modifierName] = docModifiers[modifierName] || {};
            var fullFieldName =
              fieldName + '.' + nestedDocIndex + '.' + nestedFieldName;
            docModifiers[modifierName][fullFieldName] = nestedFieldValue;
          });
        });
      });

    }
  });

  return docModifiers;
};

proto._hasModifier = function(modifier, fieldName) {
  if (arguments.length === 1) {
    return _.has(this._modifiers, modifier);
  } else if (arguments.length === 2) {
    return _.has(this._modifiers, modifier) &&
      _.has(this._modifiers[modifier], fieldName);
  }
};

proto._removeModifier = function(modifier, fieldName) {
  // If a modifier is not present, then stop here.
  if (!this._hasModifier.apply(this, arguments)) {
    return;
  }

  if (arguments.length === 1) {
    this._modifiers[modifier] = {};
  } else if (arguments.length === 2) {
    this._modifiers[modifier][fieldName] = {};
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/set_default.js                                                   //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var proto = Astro.BaseClass.prototype;

proto._setDefault = function(fieldName) {
  var doc = this;
  var Class = doc.constructor;

  // Check if a field definition exists.
  var field = Class.getField(fieldName);

  // If there is no field definition, then we can't get a default value.
  if (!field) {
    return;
  }

  // Get a default value, cast to the proper type and assing the field.
  doc[fieldName] = field.getDefault();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/set.js                                                           //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var proto = Astro.BaseClass.prototype;

// Overloaded functions.

proto._setOne = function(fieldName, setValue, options) {
  var doc = this;
  var Class = doc.constructor;
  var event;
  var modifierFieldValue;

  // Don't allow setting undefined value.
  if (_.isUndefined(setValue)) {
    return;
  }

  // Trigger the "beforeChange" event handlers.
  event = new Astro.Event('beforeChange', {
    fieldName: fieldName,
    operation: 'set'
  });
  event.target = doc;
  Class.emitEvent(event);
  // If an event was prevented from the execution, then we stop here.
  if (event.defaultPrevented) {
    return;
  }

  // Trigger the "beforeSet" event handlers.
  event = new Astro.Event('beforeSet', {
    fieldName: fieldName,
    setValue: setValue
  });
  event.target = doc;
  Class.emitEvent(event);
  // If an event was prevented from the execution, then we stop here.
  if (event.defaultPrevented) {
    return;
  }

  // Set default options of the function. By default, we cast value being set.
  options = _.extend({
    cast: true,
    modifier: true,
    mutable: false
  }, options);

  // An indicator for detecting whether a change of a value was necessary.
  var changed = false;

  Astro.utils.fields.traverseNestedDocs(
    doc,
    fieldName,
    function(nestedDoc, nestedFieldName, Class, field, index) {
      if (field) {
        // Check whether the field is immutable, so we can not update it and
        // should stop execution.
        if (field.immutable && !options.mutable) {
          var currFieldValue;
          if (_.isUndefined(index)) {
            currFieldValue = nestedDoc[nestedFieldName];
          } else {
            currFieldValue = nestedDoc[nestedFieldName][index];
          }
          if (!doc._isNew && !_.isNull(currFieldValue)) {
            return;
          }
        }

        // If the field has the "transient" flag set to true, then we have to
        // modify options and turn off the "modifier" flag.
        if (field.transient) {
          options.modifier = false;
        }

        // We are setting a value of a single nested field.
        if (field instanceof Astro.fields.object) {

          // The value being set has to be an object.
          if (!_.isObject(setValue)) {
            return;
          }
          // Try casting the value to the proper type.
          if (options.cast) {
            setValue = field.cast(setValue);
          }
          // Get a plain value of a field for a modifier.
          if (options.modifier) {
            modifierFieldValue = field.plain(setValue);
          }

        }
        // We are setting a value of many nested fields.
        else if (field instanceof Astro.fields.array) {

          // There are two possiblities. We can try setting entire array or a
          // single array element.
          if (_.isUndefined(index)) {

            // The value being set has to be an array.
            if (!_.isArray(setValue)) {
              return;
            }
            if (options.modifier) {
              modifierFieldValue = [];
            }
            _.each(setValue, function(v, i) {
              // Try casting the value to the proper type.
              if (options.cast) {
                setValue[i] = field.cast(v);
              }
              // Get a plain value of a field for a modifier.
              if (options.modifier) {
                modifierFieldValue[i] = field.plain(v);
              }
            });

          } else {

            // Try casting the value to the proper type.
            if (options.cast) {
              setValue = field.cast(setValue);
            }
            // Get a plain value of a field for a modifier.
            if (options.modifier) {
              modifierFieldValue = field.plain(setValue);
            }

          }

        }
        // We are just setting the value.
        else {

          // Try casting the value to the proper type.
          if (options.cast) {
            setValue = field.cast(setValue);
          }

          // Get a plain value of a field for a modifier.
          if (options.modifier) {
            modifierFieldValue = field.plain(setValue);
          }

        }
      } else if (Class) {
        Astro.utils.warn(
          'Trying to set a value of the "' + nestedFieldName +
          '" field that does not exist in the "' + Class.getName() + '" class'
        );
        return;
      }

      // Add modifier.
      if (options.modifier) {
        if (_.isUndefined(modifierFieldValue)) {
          modifierFieldValue = EJSON.clone(setValue);
        }
        if (nestedDoc instanceof Astro.BaseClass) {
          if (_.isUndefined(index)) {
            changed = nestedDoc._addModifier(
              '$set', nestedFieldName, modifierFieldValue
            );
          } else {
            changed = nestedDoc._addModifier(
              '$set', nestedFieldName + '.' + index, modifierFieldValue
            );
          }
        } else {
          changed = doc._addModifier('$set', fieldName, modifierFieldValue);
        }
      } else {
        // If the "modifier" option is not set it means that we just want a
        // given value to be set without checking if it is possible.
        changed = true;
      }

      // If a value change was not possible, then we stop here.
      if (!changed) {
        return;
      }

      // Set the given value on the document but only if the value has changed.
      if (_.isUndefined(index)) {
        if (EJSON.equals(nestedDoc[nestedFieldName], setValue)) {
          return;
        }
        nestedDoc[nestedFieldName] = setValue;
      } else {
        if (EJSON.equals(nestedDoc[nestedFieldName][index], setValue)) {
          return;
        }
        nestedDoc[nestedFieldName][index] = setValue;
      }
    }
  );

  // If a value change did not take place, then we stop here and the following
  // events will not be triggered.
  if (!changed) {
    return;
  }

  // Trigger the "afterSet" event handlers.
  event = new Astro.Event('afterSet', {
    fieldName: fieldName,
    setValue: setValue
  });
  event.target = doc;
  Class.emitEvent(event);

  // Trigger the "afterChange" event handlers.
  event = new Astro.Event('afterChange', {
    fieldName: fieldName,
    operation: 'set'
  });
  event.target = doc;
  Class.emitEvent(event);
};

proto._setMany = function(fieldsValues, options) {
  var doc = this;

  // Set multiple fields.
  _.each(fieldsValues, function(setValue, fieldName) {
    doc._setOne(fieldName, setValue, options);
  });
};

// Public.

proto.set = function(/* arguments */) {
  var doc = this;

  if (arguments.length === 1 && _.isObject(arguments[0])) {
    doc._setMany(arguments[0]);
  } else if (arguments.length === 2 && _.isString(arguments[0])) {
    doc._setOne(arguments[0], arguments[1]);
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/get.js                                                           //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var proto = Astro.BaseClass.prototype;

// Overloaded functions.

proto._getOne = function(fieldName, options) {
  var doc = this;
  var Class = doc.constructor;
  var event;

  // Trigger the "beforeGet" event handlers.
  event = new Astro.Event('beforeGet', {
    fieldName: fieldName
  });
  event.target = doc;
  Class.emitEvent(event);

  // If an event was prevented from the execution, then we stop here.
  if (event.defaultPrevented) {
    return;
  }

  // Set default options of the function. By default, we cast value being get
  // and get default value is none had been provided.
  options = _.extend({
    transient: true
  }, options);

  // An indicator for breaking the "get" method if needed (i.e. trying to get a
  // transient field when the transient option is set to false).
  var stop = false;

  // Field value to be returned.
  var fieldValue;

  Astro.utils.fields.traverseNestedDocs(
    doc,
    fieldName,
    function(nestedField, nestedFieldName, Class, field, index) {
      if (_.isUndefined(index)) {
        fieldValue = nestedField[nestedFieldName];
      } else {
        fieldValue = nestedField[nestedFieldName][index];
      }

      if (field) {
        // Do not get a field if it's transient and the "transient" option was
        // set to false.
        if (!options.transient && field.transient) {
          stop = true;
          return;
        }
      }
    }
  );

  // If the operation was stopped, then we do not want to execute the "afterGet"
  // event.
  if (stop) {
    return;
  }

  // Trigger the "afterGet" event handlers.
  event = new Astro.Event('afterGet', {
    fieldName: fieldName
  });
  event.target = doc;
  Class.emitEvent(event);

  return fieldValue;
};

proto._getMany = function(fieldNames, options) {
  var doc = this;
  var values = {};

  _.each(fieldNames, function(fieldName) {
    var value = doc._getOne(fieldName, options);
    // Do not get "undefined" values.
    if (_.isUndefined(value)) {
      return;
    }
    values[fieldName] = value;
  });

  return values;
};

// Public.

proto.get = function(/* arguments */) {
  var doc = this;

  if (arguments.length === 0) {
    return doc;
  } else if (arguments.length === 1) {
    if (_.isArray(arguments[0])) {
      return doc._getMany(arguments[0]);
    } else if (_.isString(arguments[0])) {
      return doc._getOne(arguments[0]);
    }
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/raw.js                                                           //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var proto = Astro.BaseClass.prototype;

// Overloaded functions.

proto._rawOne = function(fieldName, options) {
  var doc = this;
  var Class = doc.constructor;

  // Set default options of the function. By default, we cast value being get
  // and get default value is none had been provided.
  options = _.extend({
    transient: true
  }, options);

  // An indicator for stopping the "raw" method if needed (i.e. trying to get a
  // transient field when the transient option is set to false).
  var stop = false;

  // Field value to be returned.
  var fieldValue;

  Astro.utils.fields.traverseNestedDocs(
    doc,
    fieldName,
    function(nestedField, nestedFieldName, Class, field, index) {
      if (_.isUndefined(index)) {
        fieldValue = nestedField[nestedFieldName];
      } else {
        fieldValue = nestedField[nestedFieldName][index];
      }

      if (field) {
        // Do not get a field if it's transient and the "transient" option was
        // set to false.
        if (!options.transient && field.transient) {
          stop = true;
          return;
        }

        if (field instanceof Astro.fields.object) {
          if (fieldValue instanceof Astro.BaseClass) {
            fieldValue = fieldValue._rawAll(options);
          }
        } else if (field instanceof Astro.fields.array) {
          if (_.isArray(fieldValue)) {
            var values = fieldValue;
            fieldValue = [];
            _.each(values, function(value, i) {
              if (value instanceof Astro.BaseClass) {
                fieldValue[i] = value._rawAll(options);
              } else {
                fieldValue[i] = EJSON.clone(value);
              }
            });
          } else {
            if (fieldValue instanceof Astro.BaseClass) {
              fieldValue = fieldValue._rawAll(options);
            }
          }
        } else {
          // Otherwise get a plain value.
          fieldValue = field.plain(fieldValue);
        }
      }
    }
  );

  // If the operation was stopped, then we do not return anything.
  if (stop) {
    return;
  }

  return fieldValue;
};

proto._rawMany = function(fieldNames, options) {
  var doc = this;
  var values = {};

  _.each(fieldNames, function(fieldName) {
    var value = doc._rawOne(fieldName, options);
    // Do not get "undefined" values.
    if (_.isUndefined(value)) {
      return;
    }
    values[fieldName] = value;
  });

  return values;
};

proto._rawAll = function(options) {
  var doc = this;
  var Class = doc.constructor;

  // Get list of fields and their values.
  return doc._rawMany(Class.getFieldsNames(), options);
};

// Public.

proto.raw = function(/* arguments */) {
  var doc = this;

  if (arguments.length === 0) {
    return doc._rawAll();
  } else if (arguments.length === 1) {
    if (_.isArray(arguments[0])) {
      return doc._rawMany(arguments[0]);
    } else if (_.isString(arguments[0])) {
      return doc._rawOne(arguments[0]);
    }
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/push.js                                                          //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var proto = Astro.BaseClass.prototype;

// Overloaded functions.

proto._pushOne = function(fieldName, pushValue, options) {
  var doc = this;
  var Class = doc.constructor;
  var event;
  var modifierPushedValue;

  // Don't allow setting undefined value.
  if (_.isUndefined(pushValue)) {
    return;
  }

  // Trigger the "beforeChange" event handlers.
  event = new Astro.Event('beforeChange', {
    fieldName: fieldName,
    operation: 'push'
  });
  event.target = doc;
  Class.emitEvent(event);
  // If an event was prevented from the execution, then we stop here.
  if (event.defaultPrevented) {
    return;
  }

  // Trigger the "beforePush" event handlers.
  event = new Astro.Event('beforePush', {
    fieldName: fieldName,
    pushValue: pushValue
  });
  event.target = doc;
  Class.emitEvent(event);
  // If an event was prevented from the execution, then we stop here.
  if (event.defaultPrevented) {
    return;
  }

  // Set default options of the function. By default, we cast value being set.
  options = _.extend({
    cast: true,
    modifier: true,
    mutable: false
  }, options);

  // An indicator for detecting whether a change of a value was necessary.
  var changed = false;

  Astro.utils.fields.traverseNestedDocs(
    doc,
    fieldName,
    function(nestedDoc, nestedFieldName, Class, field, index) {
      // If we try to push an element not into an array, then we stop execution.
      if (!_.isArray(nestedDoc[nestedFieldName])) {
        return;
      }

      if (field) {
        // Check whether the field is immutable, so we can not update it and
        // should stop execution.
        if (field.immutable && !options.mutable) {
          var currFieldValue;
          if (_.isUndefined(index)) {
            currFieldValue = nestedDoc[nestedFieldName];
          } else {
            currFieldValue = nestedDoc[nestedFieldName][index];
          }
          if (!doc._isNew && !_.isNull(currFieldValue)) {
            return;
          }
        }

        // If the field has the "transient" flag set to true, then we have to
        // modify options and turn off the "modifier" flag.
        if (field.transient) {
          options.modifier = false;
        }

        if (options.cast) {
          // Try casting the value to the proper type.
          pushValue = field.cast(pushValue);
        }

        // Get a plain value of a field for a modifier.
        if (options.modifier) {
          modifierPushedValue = field.plain(pushValue);
        }
      } else if (Class) {
        Astro.utils.warn(
          'Trying to push a value into the "' + nestedFieldName +
          '" field that does not exist in the "' + Class.getName() + '" class'
        );
        return;
      }

      // Add modifier.
      if (options.modifier) {
        if (_.isUndefined(modifierPushedValue)) {
          modifierPushedValue = EJSON.clone(pushValue);
        }
        if (nestedDoc instanceof Astro.BaseClass) {
          if (_.isUndefined(index)) {
            changed = nestedDoc._addModifier(
              '$push', nestedFieldName, modifierPushedValue
            );
          } else {
            changed = nestedDoc._addModifier(
              '$push', nestedFieldName + '.' + index, modifierPushedValue
            );
          }
        } else {
          changed = doc._addModifier(
            '$push', fieldName, modifierPushedValue
          );
        }
      } else {
        // If the "modifier" option is not set it means that we just want a
        // given value to be set without checking if it is possible.
        changed = true;
      }

      // If a value change was not possible, then we stop here.
      if (!changed) {
        return;
      }

      // Set the given value on the document.
      if (pushValue instanceof Astro.BaseClass) {
        pushValue._clearModifiers();
      }
      nestedDoc[nestedFieldName].push(pushValue);
    }
  );

  // If a value change did not take place, then we stop here and the following
  // events will not be triggered.
  if (!changed) {
    return;
  }

  // Trigger the "afterPush" event handlers.
  event = new Astro.Event('afterPush', {
    fieldName: fieldName,
    pushValue: pushValue
  });
  event.target = doc;
  Class.emitEvent(event);

  // Trigger the "afterChange" event handlers.
  event = new Astro.Event('afterChange', {
    fieldName: fieldName,
    operation: 'push'
  });
  event.target = doc;
  Class.emitEvent(event);
};

proto._pushMany = function(pushValues, options) {
  var doc = this;

  // Set multiple fields.
  _.each(pushValues, function(pushValue, fieldName) {
    doc._pushOne(fieldName, pushValue, options);
  });
};

// Public.

proto.push = function(/* arguments */) {
  var doc = this;
  var args = arguments;

  if (args.length === 1 && _.isObject(args[0])) {
    doc._pushMany(args[0]);
  } else if (args.length === 2) {
    doc._pushOne(args[0], args[1]);
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/pop.js                                                           //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var proto = Astro.BaseClass.prototype;

// Overloaded functions.

proto._popOne = function(fieldName, popValue, options) {
  var doc = this;
  var Class = doc.constructor;
  var event;
  var result;

  // Cast the "popValue" argument to a number.
  popValue = Number(popValue);

  // Don not allow the "popValue" value different than -1 and 1.
  if (popValue !== 1 && popValue !== 1) {
    return result;
  }

  // Trigger the "beforeChange" event handlers.
  event = new Astro.Event('beforeChange', {
    fieldName: fieldName,
    operation: 'pop'
  });
  event.target = doc;
  Class.emitEvent(event);
  // If an event was prevented from the execution, then we stop here.
  if (event.defaultPrevented) {
    return result;
  }

  // Trigger the "beforePop" event handlers.
  event = new Astro.Event('beforePop', {
    fieldName: fieldName,
    popValue: popValue
  });
  event.target = doc;
  Class.emitEvent(event);
  // If an event was prevented from the execution, then we stop here.
  if (event.defaultPrevented) {
    return result;
  }

  // Set default options of the function.
  options = _.extend({
    modifier: true,
    mutable: false
  }, options);

  // An indicator for detecting whether a change of a value was necessary.
  var changed = false;

  Astro.utils.fields.traverseNestedDocs(
    doc,
    fieldName,
    function(nestedDoc, nestedFieldName, Class, field, index) {
      // If we try to pop an element not from an array, then we stop execution.
      if (!_.isArray(nestedDoc[nestedFieldName])) {
        return;
      }

      if (field) {
        // Check whether the field is immutable, so we can not update it and
        // should stop execution.
        if (field.immutable && !options.mutable) {
          var currFieldValue;
          if (_.isUndefined(index)) {
            currFieldValue = nestedDoc[nestedFieldName];
          } else {
            currFieldValue = nestedDoc[nestedFieldName][index];
          }
          if (!doc._isNew && !_.isNull(currFieldValue)) {
            return;
          }
        }

        // If the field has the "transient" flag set to true, then we have to
        // modify options and turn off the "modifier" flag.
        if (field.transient) {
          options.modifier = false;
        }
      } else if (Class) {
        Astro.utils.warn(
          'Trying to pop a value from the "' + nestedFieldName + '" field ' +
          'that does not exist in the "' + Class.getName() + '" class'
        );
        return;
      }

      // Add modifier.
      if (options.modifier) {
        if (nestedDoc instanceof Astro.BaseClass) {
          if (_.isUndefined(index)) {
            changed = nestedDoc._addModifier(
              '$pop', nestedFieldName, popValue
            );
          } else {
            changed = nestedDoc._addModifier(
              '$pop', nestedFieldName + '.' + index, popValue
            );
          }
        } else {
          changed = doc._addModifier('$pop', fieldName, popValue);
        }
      } else {
        // If the "modifier" option is not set it means that we just want a
        // given value to be set without checking if it is possible.
        changed = true;
      }

      // If a value change was not possible, then we stop here.
      if (!changed) {
        return;
      }

      // Pop a value from the start or the end of an array.
      if (popValue === 1) {
        result = nestedDoc[nestedFieldName].pop();
      } else {
        result = nestedDoc[nestedFieldName].unshift();
      }
    }
  );

  // If a value change did not take place, then we stop here and the following
  // events will not be triggered.
  if (!changed) {
    return result;
  }

  // Trigger the "afterPop" event handlers.
  event = new Astro.Event('afterPop', {
    fieldName: fieldName,
    popValue: popValue
  });
  event.target = doc;
  Class.emitEvent(event);

  // Trigger the "afterChange" event handlers.
  event = new Astro.Event('afterChange', {
    fieldName: fieldName,
    operation: 'pop'
  });
  event.target = doc;
  Class.emitEvent(event);

  return result;
};

proto._popMany = function(popValues, options) {
  var doc = this;
  var result = {};

  // Set multiple fields.
  _.each(popValues, function(popValue, fieldName) {
    result[fieldName] = doc._popOne(fieldName, popValue, options);
  });

  return result;
};

// Public.

proto.pop = function(/* arguments */) {
  var doc = this;
  var args = arguments;

  if (args.length === 1 && _.isObject(args[0])) {
    return doc._popMany(args[0]);
  } else if (args.length === 2) {
    return doc._popOne(args[0], args[1]);
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/pull.js                                                          //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var proto = Astro.BaseClass.prototype;

// Overloaded functions.

proto._pullOne = function(fieldName, pullValue, options) {
  var doc = this;
  var Class = doc.constructor;
  var event;
  var result = [];

  // Trigger the "beforeChange" event handlers.
  event = new Astro.Event('beforeChange', {
    fieldName: fieldName,
    operation: 'pull'
  });
  event.target = doc;
  Class.emitEvent(event);
  // If an event was prevented from the execution, then we stop here.
  if (event.defaultPrevented) {
    return result;
  }

  // Trigger the "beforePull" event handlers.
  event = new Astro.Event('beforePull', {
    fieldName: fieldName,
    pullValue: pullValue
  });
  event.target = doc;
  Class.emitEvent(event);
  // If an event was prevented from the execution, then we stop here.
  if (event.defaultPrevented) {
    return result;
  }

  // Set default options of the function.
  options = _.extend({
    cast: true,
    modifier: true,
    mutable: false
  }, options);

  // An indicator for detecting whether a change of a value was necessary.
  var changed = false;

  Astro.utils.fields.traverseNestedDocs(
    doc,
    fieldName,
    function(nestedDoc, nestedFieldName, Class, field, index) {
      // If we try to pull an element not from an array, then we stop execution.
      if (!_.isArray(nestedDoc[nestedFieldName])) {
        return;
      }

      if (field) {
        // Check whether the field is immutable, so we can not update it and
        // should stop execution.
        if (field.immutable && !options.mutable) {
          var currFieldValue;
          if (_.isUndefined(index)) {
            currFieldValue = nestedDoc[nestedFieldName];
          } else {
            currFieldValue = nestedDoc[nestedFieldName][index];
          }
          if (!doc._isNew && !_.isNull(currFieldValue)) {
            return;
          }
        }

        // If the field has the "transient" flag set to true, then we have to
        // modify options and turn off the "modifier" flag.
        if (field.transient) {
          options.modifier = false;
        }

        if (options.cast) {
          // Try casting the value to the proper type.
          pullValue = field.cast(pullValue);
        }

        // Get a plain value of a field for comparison and a modifier.
        pullValue = field.plain(pullValue);
        if (options.modifier) {
          modifierPulledValue = pullValue;
        }
      } else if (Class) {
        Astro.utils.warn(
          'Trying to pull a value from the "' + nestedFieldName + '" field ' +
          'that does not exist in the "' + Class.getName() + '" class'
        );
        return;
      }

      // Check if a value is present in an array.
      if (!_.find(nestedDoc[nestedFieldName], function(value) {
        if (field) {
          value = field.plain(value);
        }
        return EJSON.equals(value, pullValue);
      })) {
        return;
      }

      // Add modifier.
      if (options.modifier) {
        if (_.isUndefined(modifierPulledValue)) {
          modifierPulledValue = EJSON.clone(pullValue);
        }
        if (nestedDoc instanceof Astro.BaseClass) {
          if (_.isUndefined(index)) {
            changed = nestedDoc._addModifier(
              '$pullAll', nestedFieldName, modifierPulledValue
            );
          } else {
            changed = nestedDoc._addModifier(
              '$pullAll', nestedFieldName + '.' + index, modifierPulledValue
            );
          }
        } else {
          changed = doc._addModifier(
            '$pullAll', fieldName, modifierPulledValue
          );
        }
      } else {
        // If the "modifier" option is not set it means that we just want a
        // given value to be set without checking if it is possible.
        changed = true;
      }

      // If a value change was not possible, then we stop here.
      if (!changed) {
        return;
      }

      // Pull a value from an array.
      nestedDoc[nestedFieldName] = _.filter(
        nestedDoc[nestedFieldName],
        function(value) {
          if (field) {
            value = field.plain(value);
          }
          if (EJSON.equals(value, pullValue)) {
            if (field) {
              result.push(field.cast(pullValue));
            } else {
              result.push(pullValue);
            }
            return false;
          } else {
            return true;
          }
        }
      );
    }
  );

  // If a value change did not take place, then we stop here and the following
  // events will not be triggered.
  if (!changed) {
    return result;
  }

  // Trigger the "afterPull" event handlers.
  event = new Astro.Event('afterPull', {
    fieldName: fieldName,
    pullValue: pullValue
  });
  event.target = doc;
  Class.emitEvent(event);

  // Trigger the "afterChange" event handlers.
  event = new Astro.Event('afterChange', {
    fieldName: fieldName,
    operation: 'pull'
  });
  event.target = doc;
  Class.emitEvent(event);

  return result;
};

proto._pullMany = function(pullValues, options) {
  var doc = this;
  var result = {};

  // Pull multiple values.
  _.each(pullValues, function(pullValue, fieldName) {
    result[fieldName] = doc._pullOne(fieldName, pullValue, options);
  });

  return result;
};

// Public.

proto.pull = function(/* arguments */) {
  var doc = this;
  var args = arguments;

  if (args.length === 1 && _.isObject(args[0])) {
    return doc._pullMany(args[0]);
  } else if (args.length === 2) {
    return doc._pullOne(args[0], args[1]);
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/inc.js                                                           //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var proto = Astro.BaseClass.prototype;

// Overloaded functions.

proto._incOne = function(fieldName, incValue, options) {
  var doc = this;
  var Class = doc.constructor;
  var event;

  // Cast the "incValue" argument to a number.
  incValue = Number(incValue);

  // Don not allow incrementing by non number value or by 0.
  if (_.isNaN(incValue) || incValue === 0) {
    return;
  }

  // Trigger the "beforeChange" event handlers.
  event = new Astro.Event('beforeChange', {
    fieldName: fieldName,
    operation: 'inc'
  });
  event.target = doc;
  Class.emitEvent(event);
  // If an event was prevented from the execution, then we stop here.
  if (event.defaultPrevented) {
    return;
  }

  // Trigger the "beforeInc" event handlers.
  event = new Astro.Event('beforeInc', {
    fieldName: fieldName,
    incValue: incValue
  });
  event.target = doc;
  Class.emitEvent(event);
  // If an event was prevented from the execution, then we stop here.
  if (event.defaultPrevented) {
    return;
  }

  // Set default options of the function.
  options = _.extend({
    modifier: true,
    mutable: false
  }, options);

  // An indicator for detecting whether a change of a value was necessary.
  var changed = false;

  Astro.utils.fields.traverseNestedDocs(
    doc,
    fieldName,
    function(nestedDoc, nestedFieldName, Class, field, index) {
      // Get a current value of the field.
      var currFieldValue = _.isUndefined(index) ?
        nestedDoc[nestedFieldName] : nestedDoc[nestedFieldName][index];

      // If we try to increment non number value, then we stop execution.
      if (!_.isNumber(currFieldValue)) {
        return;
      }

      if (field) {
        // Check whether the field is immutable, so we can not update it and
        // should stop execution.
        if (
          field.immutable && !options.mutable &&
          !doc._isNew && !_.isNull(currFieldValue)
        ) {
          return;
        }

        // If the field has the "transient" flag set to true, then we have to
        // modify options and turn off the "modifier" flag.
        if (field.transient) {
          options.modifier = false;
        }
      } else if (Class) {
        Astro.utils.warn(
          'Trying to increment a value of the "' + nestedFieldName +
          '" field that does not exist in the "' + Class.getName() + '" class'
        );
        return;
      }

      // Add modifier.
      if (options.modifier) {
        if (nestedDoc instanceof Astro.BaseClass) {
          if (_.isUndefined(index)) {
            changed = nestedDoc._addModifier(
              '$inc', nestedFieldName, incValue
            );
          } else {
            changed = nestedDoc._addModifier(
              '$inc', nestedFieldName + '.' + index, incValue
            );
          }
        } else {
          changed = doc._addModifier('$inc', fieldName, incValue);
        }
      } else {
        // If the "modifier" option is not set it means that we just want a
        // given value to be set without checking if it is possible.
        changed = true;
      }

      // If a value change was not possible, then we stop here.
      if (!changed) {
        return;
      }

      // Increment a value of the field by a given amount.
      if (_.isUndefined(index)) {
        nestedDoc[nestedFieldName] += incValue;
      } else {
        nestedDoc[nestedFieldName][index] += incValue;
      }
    }
  );

  // If a value change did not take place, then we stop here and the following
  // events will not be triggered.
  if (!changed) {
    return;
  }

  // Trigger the "afterInc" event handlers.
  event = new Astro.Event('afterInc', {
    fieldName: fieldName,
    incValue: incValue
  });
  event.target = doc;
  Class.emitEvent(event);

  // Trigger the "afterChange" event handlers.
  event = new Astro.Event('afterChange', {
    fieldName: fieldName,
    operation: 'inc'
  });
  event.target = doc;
  Class.emitEvent(event);
};

proto._incMany = function(fieldsValues, options) {
  var doc = this;

  // Set multiple fields.
  _.each(fieldsValues, function(incValue, fieldName) {
    doc._incOne(fieldName, incValue, options);
  });
};

// Public.

proto.inc = function(/* arguments */) {
  var doc = this;
  var args = arguments;

  if (args.length === 1 && _.isObject(args[0])) {
    doc._incMany(args[0]);
  } else if (args.length === 2) {
    doc._incOne(args[0], args[1]);
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/modified.js                                                      //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var proto = Astro.BaseClass.prototype;

proto.getModified = function(old) {
  old = old || false;
  var doc = this;
  var Class = doc.constructor;

  doc._clearUnnecessaryModifiers();

  if (doc._id && Class.getCollection()) {
    var originalDoc = Class.findOne(doc._id);
  } else {
    var originalDoc = new Class();
  }

  var modified = {};

  var fields = Class.getFields();
  _.each(fields, function(field, fieldName) {
    if (field.transient) {
      return;
    }
    // If a value differs from the value in the original object then it means
    // that fields was modified from the last save.
    if (!EJSON.equals(originalDoc[fieldName], doc[fieldName])) {
      // Take a value before or after modification.
      var fieldValue;
      if (old) {
        fieldValue = originalDoc[fieldName];
      } else {
        fieldValue = doc[fieldName];
      }

      modified[fieldName] = fieldValue;
    }
  });

  return modified;
};

proto.isModified = function() {
  var doc = this;

  // Get a modifier.
  var modifier = doc._getModifiers();
  // If there are any modifiers, then it means that document was modified.
  return _.size(modifier) > 0;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/ejson.js                                                         //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var events = {};

events.toJSONValue = function(e) {
  var doc = this;
  var Class = doc.constructor;

  var values = {};
  _.each(Class.getFieldsNames(), function(fieldName) {
    values[fieldName] = doc[fieldName];
  });

  var json = {
    modifiers: EJSON.stringify(doc._modifiers),
    values: EJSON.stringify(values)
  };

  _.extend(e.data, json);
};

events.fromJSONValue = function(e) {
  var doc = this;
  var json = e.data;

  doc._modifiers = EJSON.parse(json.modifiers);
  _.extend(doc, EJSON.parse(json.values));
};

Astro.eventManager.on('toJSONValue', events.toJSONValue);
Astro.eventManager.on('fromJSONValue', events.fromJSONValue);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/init_class.js                                                    //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var classMethods = {};

classMethods.getFieldsNames = function() {
  return this.schema.fieldsNames;
};

classMethods.hasField = function(fieldName) {
  return _.has(this.schema.fields, fieldName);
};

classMethods.getField = function(fieldName) {
  return this.schema.fields[fieldName];
};

classMethods.getFields = function() {
  return this.schema.fields;
};

Astro.eventManager.on(
  'initClass', function onInitClassFields(schemaDefinition) {
    var Class = this;
    var schema = Class.schema;

    // Add fields methods to the class.
    _.extend(Class, classMethods);

    schema.fields = schema.fields || {};
    schema.fieldsNames = schema.fieldsNames || [];
  }
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/fields/init_definition.js                                               //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var checkFieldDefinition = function(fieldDefinition, className) {
  var fieldName = fieldDefinition.name;

  // FIELD NAME.
  // Field name has to be a string.
  if (!_.isString(fieldName)) {
    throw new TypeError(
      'The field name in the "' + className + '" class has to be a string'
    );
  }
  // Check field validity.
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(fieldName)) {
    throw new Error(
      'The "' + fieldName + '" field name in the "' + className +
      '" class contains not allowed characters'
    );
  }

  // FIELD TYPE.
  if (!Astro.fields[fieldDefinition.type]) {
    throw new Error(
      'The type provided in the definition of the "' + fieldName +
      '" field in the "' + className + '" class does not exist'
    );
  }

  // DEFAULT VALUE.
  // Check if a default value of field have been properly defined.
  if (
    !_.isFunction(fieldDefinition.default) &&
    _.isObject(fieldDefinition.default)
  ) {
    Astro.utils.warn(
      'A non plain default value for the "' + fieldName +
      '" field in the "' + className +
      '" class should be defined and returned in a function'
    );
  }
};

var parseNestedFieldName = function(nestedFieldName, definition) {
  var segments = nestedFieldName.split('.');

  if (segments[0] === '$' || segments[segments.length - 1] === '$') {
    throw new Error(
      'The "$" sign can not be placed at the beginning or end of the "' +
      nestedFieldName + '" nested field pattern'
    );
  }

  var fieldsDefinitions = {};
  var schemaDefinition = fieldsDefinitions;
  var className = '';
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    var nextSegment = segments[i + 1];

    if (i < segments.length - 1) {
      var nestedFieldDefinition = {};
      if (nextSegment === '$') {
        nestedFieldDefinition.type = 'array';
        nestedFieldDefinition.name = segment;
        i++;
      } else {
        nestedFieldDefinition.type = 'object';
        nestedFieldDefinition.name = segment;
      }
      className += Astro.utils.string.ucfirst(segment);
      nestedFieldDefinition.nested = {
        name: className,
        fields: {}
      };
      fieldsDefinitions[segment] = nestedFieldDefinition;
      fieldsDefinitions = nestedFieldDefinition.nested.fields;
    } else {
      fieldsDefinitions[segment] = definition;
    }
  }

  return schemaDefinition[segments[0]];
};

Astro.eventManager.on(
  'initDefinition', function onInitDefinitionFields(schemaDefinition) {
    var Class = this;
    var schema = Class.schema;
    var fieldsDefinitions = {};

    if (_.has(schemaDefinition, 'fields')) {
      if (_.isArray(schemaDefinition.fields)) {
        _.each(schemaDefinition.fields, function(fieldName) {
          var fieldDefinition;

          if (_.isString(fieldName)) {
            if (Astro.utils.fields.isNestedFieldName(fieldName)) {
              fieldName = parseNestedFieldName(fieldName, {
                type: 'null'
              });
            } else {
              fieldDefinition = {
                name: fieldName,
                type: 'null'
              };
            }
          }

          if (fieldDefinition) {
            // Check validity of the field definition.
            checkFieldDefinition(fieldDefinition, Class.getName());
            if (fieldsDefinitions[fieldDefinition.name]) {
              // If a field definition already exists, then try deep merging
              // these definitions.
              fieldsDefinitions[fieldDefinition.name] =
                Astro.utils.object.deepMerge(
                  fieldsDefinitions[fieldDefinition.name], fieldDefinition
                );
            } else {
              fieldsDefinitions[fieldDefinition.name] = fieldDefinition;
            }
          }
        });

      } else if (_.isObject(schemaDefinition.fields)) {

        _.each(schemaDefinition.fields, function(fieldDefinition, fieldName) {
          var fieldDefinition;

          if (_.isString(fieldDefinition)) {

            if (Astro.utils.fields.isNestedFieldName(fieldName)) {
              fieldDefinition = parseNestedFieldName(fieldName, {
                type: fieldDefinition
              });
            } else {
              fieldDefinition = {
                name: fieldName,
                type: fieldDefinition
              };
            }

          } else if (_.isObject(fieldDefinition)) {

            if (Astro.utils.fields.isNestedFieldName(fieldName)) {
              fieldDefinition = parseNestedFieldName(fieldName, _.extend({
                type: 'null'
              }, fieldDefinition));
            } else {
              fieldDefinition = _.extend({
                type: 'null'
              }, fieldDefinition, {
                name: fieldName
              });
            }

          }

          if (fieldDefinition) {
            // Check validity of the field definition.
            checkFieldDefinition(fieldDefinition, Class.getName());
            if (fieldsDefinitions[fieldDefinition.name]) {
              // If a field definition already exists, then try deep merging
              // these definitions.
              fieldsDefinitions[fieldDefinition.name] =
                Astro.utils.object.deepMerge(
                  fieldsDefinitions[fieldDefinition.name], fieldDefinition
                );
            } else {
              fieldsDefinitions[fieldDefinition.name] = fieldDefinition;
            }
          }
        });

      }
    }

    if (_.size(fieldsDefinitions) > 0) {
      _.each(fieldsDefinitions, function(fieldDefinition, fieldName) {
        // Get a field class from the type.
        var Field = Astro.fields[fieldDefinition.type];
        // Create a new field.
        var field = new Field(fieldDefinition);

        fieldsDefinitions[fieldName] = field;
      });

      // Add fields and fields names to the schema.
      _.extend(schema.fields, fieldsDefinitions);
      var fieldsNames = _.keys(fieldsDefinitions);
      schema.fieldsNames = _.union(schema.fieldsNames, fieldsNames);
    }
  }
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/indexes/init_class.js                                                   //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var classMethods = {};

classMethods.hasIndex = function(indexName) {
  return _.has(this.schema.indexes, indexName);
};

classMethods.getIndex = function(indexName) {
  return this.schema.indexes[indexName];
};

classMethods.getIndexes = function() {
  return this.schema.indexes;
};

Astro.eventManager.on(
  'initClass', function onInitClassIndexes(schemaDefinition) {
    var Class = this;
    var schema = Class.schema;

    // Add fields methods to the class.
    _.extend(Class, classMethods);

    schema.indexes = schema.indexes || {};
  }
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/jagi_astronomy/lib/modules/indexes/init_definition.js                                              //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var checkDefinition = function(indexDefinition, indexName, className) {
  if (!Match.test(indexName, String)) {
    throw new TypeError(
      'The index name in the "' + className + '" class has to be a string'
    );
  }
  if (!Match.test(indexDefinition, Object)) {
    throw new TypeError(
      'The index definition in the "' + className +
      '" class has to be an object'
    );
  }
};

Astro.eventManager.on(
  'initDefinition', function onInitDefinitionIndexes(schemaDefinition) {
    var Class = this;
    var schema = Class.schema;
    var indexesDefinitions = {};

    if (_.has(schemaDefinition, 'fields')) {
      _.each(schemaDefinition.fields, function(fieldDefinition, fieldName) {
        if (_.has(fieldDefinition, 'index')) {
          var indexDefinition;

          if (
            fieldDefinition.index === -1 || fieldDefinition.index === 1 ||
            _.isString(fieldDefinition.index)
          ) {
            indexDefinition = {
              fields: {},
              options: {
                name: fieldName
              }
            };
            indexDefinition.fields[fieldName] = fieldDefinition.index;
          }

          if (indexDefinition) {
            // Check validity of the event definition.
            checkDefinition(indexDefinition, fieldName, Class.getName());
            indexesDefinitions[fieldName] = indexDefinition;
          }
        }
      });
    }

    if (_.has(schemaDefinition, 'indexes')) {
      _.each(schemaDefinition.indexes, function(definition, indexName) {
        var indexDefinition;

        // Prepare index definition.
        if (_.isObject(definition)) {
          var indexDefinition = _.pick(definition, ['fields', 'options']);
          indexDefinition.options = indexDefinition.options || {};
          if (!_.has(indexDefinition.options, 'name')) {
            indexDefinition.options.name = indexName;
          }
        }

        // Check validity of the event definition.
        if (indexDefinition) {
          checkDefinition(indexDefinition, indexName, Class.getName());
          indexesDefinitions[indexName] = indexDefinition;
        }
      });
    }

    if (_.size(indexesDefinitions) > 0) {
      var Collection = Class.getCollection();
      if (!Collection) {
        return;
      }
      // Add indexes to the collection
      _.each(indexesDefinitions, function(indexDefinition) {
        Collection._ensureIndex(
          indexDefinition.fields, indexDefinition.options
        );
      });

      // Add indexes to the schema.
      _.extend(schema.indexes, indexesDefinitions);
    }
  }
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['jagi:astronomy'] = {}, {
  Astro: Astro,
  Astronomy: Astronomy
});

})();

//# sourceMappingURL=jagi_astronomy.js.map
