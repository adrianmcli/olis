(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Astro = Package['jagi:astronomy'].Astro;
var Astronomy = Package['jagi:astronomy'].Astronomy;
var ReactiveMap = Package['jagi:reactive-map'].ReactiveMap;
var _ = Package.underscore._;
var check = Package.check.check;
var Match = Package.check.Match;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var EJSON = Package.ejson.EJSON;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var Validators;

(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/module/global.js                       //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.validators = Validators = {};

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/module/validation_error.js             //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
var ValidationError =
Astro.ValidationError = function ValidationError(data) {
  this.name = 'ValidationError';
  this.stack = (new Error()).stack;
  this.document = data.document;
  this.fieldValidator = data.fieldValidator;
  this.fieldName = data.fieldName;
  this.fieldValue = data.fieldValue;
  this.param = data.param;
};

ValidationError.prototype = Object.create(Error.prototype);

ValidationError.prototype.generateMessage = function() {
  var doc = this.document;
  var Class = doc.constructor;

  if (this.fieldValidator.message) {
    // Use the user defined error message in a field validator.
    return this.fieldValidator.message;
  }

  // Prepare an event object for the "validationError" event.
  var event = new Astro.ValidationErrorEvent({
    validator: this.fieldValidator.validator,
    fieldValue: this.fieldValue,
    fieldName: this.fieldName,
    param: this.param,
    message: this.message
  });
  event.target = doc;

  // Generate an error message using the "validationError" event.
  Class.emitEvent(event);
  var message = event.getMessage();
  if (event.stopped) {
    return message;
  }

  // Get a default validation error by executing the "validatioError" event on
  // the validator.
  this.fieldValidator.validator.emit(event);
  var message = event.getMessage();
  if (message) {
    return message;
  }

  // Default validation error.
  return 'The value of the "' + this.fieldName + '" field is invalid';
};

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/module/validation_error_event.js       //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.ValidationErrorEvent = function(data) {
  var type = 'validationError';
  data = _.extend({
    validator: null,
    fieldName: null,
    fieldValue: null,
    param: null,
    message: null
  }, data);

  Astro.Event.call(this, type, data);
};

Astro.utils.class.inherits(Astro.ValidationErrorEvent, Astro.Event);

Astro.ValidationErrorEvent.prototype.setMessage = function(message) {
  this.data.message = message;
};

Astro.ValidationErrorEvent.prototype.getMessage = function() {
  return this.data.message;
};

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/module/validator.js                    //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
var checkValidatorDefinition = function(validatorDefinition) {
  // Check if the validator definition is an object.
  if (!Match.test(validatorDefinition, Object)) {
    throw new Error(
      'The validator definition has to be an object'
    );
  }
  // Check if the validator name is provided.
  if (!_.has(validatorDefinition, 'name')) {
    throw new Error(
      'Provide a validator name'
    );
  }
  // Check if the validator name is a string.
  if (!Match.test(validatorDefinition.name, String)) {
    throw new Error(
      'The validator name has to be a string'
    );
  }
  // Check if the validator with the given name already exists.
  if (_.has(Validators, validatorDefinition.name)) {
    throw new Error(
      'Validator with the name "' + validatorDefinition.name +
      '" is already defined'
    );
  }
  // Check if the validation function is provided.
  if (!_.has(validatorDefinition, 'validate')) {
    throw new Error(
      'Provide the "validate" function'
    );
  }
  // Check if the "validate" attribute is function.
  if (!Match.test(validatorDefinition.validate, Function)) {
    throw new Error(
      'The "validate" attribute has to be a function'
    );
  }
};

var Validator = Astro.Validator = function Validator(validatorDefinition) {
  checkValidatorDefinition.apply(this, arguments);
  var self = this;

  self.name = validatorDefinition.name;
  self.validate = validatorDefinition.validate;

  if (_.has(validatorDefinition, 'events')) {
    _.each(validatorDefinition.events, function(eventHandler, eventName) {
      self.on(eventName, eventHandler);
    });
  }
};

Validator.prototype.createFieldValidatorGenerator = function() {
  var self = this;

  return function fieldValidatorGenerator(param, message) {
    return new Astro.FieldValidator({
      validator: self,
      param: param,
      message: message
    });
  };
};

Astro.Events.mixin(Validator.prototype);

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/module/field_validator.js              //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
var FieldValidator =
Astro.FieldValidator = function FieldValidator(fieldValidatorDefinition) {
  var self = this;

  // self.name = fieldValidatorDefinition.validator.name;
  self.validator = fieldValidatorDefinition.validator;
  self.param = fieldValidatorDefinition.param;
  self.message = fieldValidatorDefinition.message;
};

FieldValidator.prototype.validate = function(doc, fieldName, fieldValue) {
  var self = this;

  // If a function was passed as a validator's param, then it may mean that we
  // want it to evalute to some value.
  var param = _.isFunction(self.param) ? self.param.call(doc) : self.param;

  if (!self.validator.validate.call(doc, fieldValue, fieldName, param)) {
    // Throw error.
    throw new Astro.ValidationError({
      document: doc,
      fieldValidator: self,
      fieldName: fieldName,
      fieldValue: fieldValue,
      param: param
    });
  }

  return true;
};

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/module/create_validator.js             //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator = function(validatorDefinition) {
  var validator = new Astro.Validator(validatorDefinition);
  Validators[validator.name] = validator.createFieldValidatorGenerator();

  return Validators[validator.name];
};

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/module/validate.js                     //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
var methods = {};

methods._validateOne = function(fieldName, stopOnFirstError) {
  var doc = this;
  var result = true;

  Astro.utils.fields.traverseNestedDocs(
    doc,
    fieldName,
    function(nestedDoc, nestedFieldName, Class, field, index) {
      // Get value of the field.
      var nestedFieldValue = nestedDoc.get(nestedFieldName);

      // If value of the field is optional and it's null, then we passed
      // validation. Clear any existing error
      if (_.isNull(nestedFieldValue) && field.optional) {
        nestedDoc._errors.delete(nestedFieldName);
        return;
      }

      try {
        // Get a validator for the given field name and run validation if it
        // exists.
        var nestedFieldValidator = Class.getValidator(nestedFieldName);
        if (nestedFieldValidator) {
          nestedFieldValidator.validate(
            nestedDoc,
            nestedFieldName,
            nestedFieldValue
          );
        }

        // Remove a validator error message when no error occured.
        nestedDoc._errors.delete(nestedFieldName);

        // Depending on the nested field type execute validation on the nested
        // values. The nested field has also have defined class.
        if (nestedFieldValue && field.class) {
          if (field instanceof Astro.fields.object) {
            result = nestedFieldValue.validate(stopOnFirstError);
          } else if (field instanceof Astro.fields.array) {
            if (stopOnFirstError) {
              result = _.every(nestedFieldValue, function(nestedDoc) {
                if (nestedDoc) {
                  return nestedDoc.validate(stopOnFirstError);
                }
                return true;
              });
            } else {
              _.each(nestedFieldValue, function(nestedDoc) {
                if (nestedDoc && !nestedDoc.validate(stopOnFirstError)) {
                  result = false;
                }
              });
            }
          }
        }
      } catch (e) {
        // If the error is not an instance of the Astro.ValidationError then
        // throw error again.
        if (!(e instanceof Astro.ValidationError)) {
          throw e;
        }

        // Generate an error message from the validator that didn't pass.
        var errorMessage = e.generateMessage();

        // Set validation error for the field.
        nestedDoc._errors.set(nestedFieldName, errorMessage);

        result = false;
      }
    }
  );

  return result;
};

methods._validateMany = function(fieldsNames, stopOnFirstError) {
  var doc = this;
  var Class = doc.constructor;

  // Run validation for each field. If the "stopOnFirstError" flag is set, then
  // we stop validating after the first error. Otherwise, we continue until we
  // reach the last validator.
  if (stopOnFirstError) {
    return _.every(fieldsNames, function(fieldName) {
      return doc._validateOne(fieldName, stopOnFirstError);
    });
  } else {
    var valid = true;
    _.each(fieldsNames, function(fieldName) {
      if (!doc._validateOne(fieldName, stopOnFirstError)) {
        valid = false;
      }
    });
    return valid;
  }
};

// Public.

methods.validate = function(fieldsNames, stopOnFirstError) {
  var doc = this;
  var Class = doc.constructor;

  if (arguments.length === 0) {

    // Get list of all fields in the proper validation order.
    fieldsNames = Class.getValidationOrder();

  } else if (arguments.length === 1) {

    if (_.isString(fieldsNames)) {
      fieldsNames = [fieldsNames];
    } else if (_.isBoolean(fieldsNames)) {
      // Rewrite value of the "fieldsNames" argument into the
      // "stopOnFirstError" argument.
      stopOnFirstError = fieldsNames;
      // Get list of all validators.
      fieldsNames = Class.getValidationOrder();
    }

  } else if (arguments.length === 2) {

    if (_.isString(fieldsNames)) {
      fieldsNames = [fieldsNames];
    }

  }

  // Set default value of the "stopOnFirstError" argument.
  if (_.isUndefined(stopOnFirstError)) {
    stopOnFirstError = true;
  }

  return doc._validateMany(fieldsNames, stopOnFirstError);
};

_.extend(Astro.BaseClass.prototype, methods);

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/module/get_error.js                    //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
var methods = {};

methods.getValidationError = function(fieldName) {
  var doc = this;
  var error;

  Astro.utils.fields.traverseNestedDocs(
    doc,
    fieldName,
    function(nestedDoc, nestedFieldName, Class, field, index) {
      if (nestedDoc instanceof Astro.BaseClass) {
        error = nestedDoc._errors.get(nestedFieldName);
      }
    }
  );

  return error;
};

methods.getValidationErrors = function() {
  var doc = this;
  var Class = doc.constructor;

  var errors = this._errors.all();
  var fields = Class.getFields();
  _.each(fields, function(field, fieldName) {
    if (doc[fieldName] && field.class) {
      if (field instanceof Astro.fields.object) {
        var nestedErrors = doc[fieldName].getValidationErrors();
        _.each(nestedErrors, function(nestedError, nestedFieldName) {
          errors[fieldName + '.' + nestedFieldName] = nestedError;
        });
      } else if (field instanceof Astro.fields.array) {
        _.each(doc[fieldName], function(nestedDoc, index) {
          if (nestedDoc) {
            var nestedErrors = nestedDoc.getValidationErrors();
            _.each(nestedErrors, function(nestedError, nestedFieldName) {
              errors[
                fieldName + '.' + index + '.' + nestedFieldName
              ] = nestedError;
            });
          }
        });
      }
    }
  });

  return errors;
};

methods.hasValidationError = function(fieldName) {
  var doc = this;
  var has;

  Astro.utils.fields.traverseNestedDocs(
    doc,
    fieldName,
    function(nestedDoc, nestedFieldName, Class, field, index) {
      if (nestedDoc instanceof Astro.BaseClass) {
        has = nestedDoc._errors.has(nestedFieldName);
      }
    }
  );

  return has;
};

methods.hasValidationErrors = function() {
  var errors = this.getValidationErrors();
  return _.size(errors) > 0;
};

methods.clearValidationErrors = function() {
  var doc = this;
  var Class = doc.constructor;

  doc._errors.clear();

  var fields = Class.getFields();
  _.each(fields, function(field, fieldName) {
    if (
      doc[fieldName] && field instanceof Astro.fields.object && field.class
    ) {
      doc[fieldName]._errors.clear();
    } else if (
      doc[fieldName] && field instanceof Astro.fields.array && field.class
    ) {
      _.each(doc[fieldName], function(nestedDoc, index) {
        if (nestedDoc instanceof Astro.BaseClass) {
          nestedDoc._errors.clear();
        }
      });
    }
  });
};

methods.throwValidationException = function() {
  throw new Meteor.Error('validation-error', this.getValidationErrors());
};

methods.catchValidationException = function(exception) {
  if (!(exception instanceof Meteor.Error) ||
    exception.error !== 'validation-error' ||
    !_.isObject(exception.reason)
  ) {
    return false;
  }

  var doc = this;
  var errors = exception.reason;

  _.each(errors, function(error, fieldName) {
    Astro.utils.fields.traverseNestedDocs(
      doc,
      fieldName,
      function(nestedDoc, nestedFieldName, Class, field, index) {
        if (nestedDoc instanceof Astro.BaseClass) {
          nestedDoc._errors.set(nestedFieldName, error);
        }
      }
    );
  });
  return true;
};

_.extend(Astro.BaseClass.prototype, methods);

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/module/ejson.js                        //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
var events = {};

events.toJSONValue = function(e) {
  var doc = this;
  var json;

  Tracker.nonreactive(function() {
    json = {
      errors: doc._errors.all()
    }
  });

  _.extend(e.data, json);
};

events.fromJSONValue = function(e) {
  var doc = this;
  var json = e.data;

  doc._errors.set(json.errors);
};

Astro.eventManager.on('toJSONValue', events.toJSONValue);
Astro.eventManager.on('fromJSONValue', events.fromJSONValue);

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/module/init_class.js                   //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
var checkFieldName = function(fieldName) {
  if (!this.hasField(fieldName)) {
    throw new Error(
      'The "' + fieldName +
      '" field does not exist in the "' + this.getName() + '" class'
    );
  }
};

var checkValidator = function(fieldName, validator) {
  if (!Match.test(
    validator,
    Match.OneOf(Function, Astro.FieldValidator, [Astro.FieldValidator])
  )) {
    throw new TypeError(
      'The validator for the "' + fieldName +
      '" field in the "' + this.getName() + '" class schema has to be a ' +
      'function or an array of validators or a single validator object'
    );
  }
};

var checkValidatorsList = function(validators) {
  if (!Match.test(validators, Object)) {
    throw new TypeError(
      'The validators definitions in the "' + this.getName() +
      '" class schema has to be an object'
    );
  }
};

var checkValidationOrder = function(validationOrder) {
  if (!Match.test(validationOrder, [String])) {
    throw new TypeError(
      'The validation order definition in the "' + this.getName() +
      '" class schema has to be an array of fields names'
    );
  }
};

var classMethods = {
  getValidator: function(fieldName) {
    return this.schema.validators[fieldName];
  },

  getValidators: function(fieldsNames) {
    if (_.isArray(fieldsNames)) {
      return _.pick(this.schema.validators, fieldsNames);
    }
    return this.schema.validators;
  },

  getValidationOrder: function() {
    var Class = this;

    // Create a list of all fields where the fields from the validation order
    // are at the beginning.
    var order = Class.schema.validationOrder;
    if (order) {
      // Get a list of all fields in the class.
      var allFieldsNames = Class.getFieldsNames();
      // Detect what fields are not in the validation order.
      var diff = _.difference(allFieldsNames, order);
      // If not all fields had been included in the validation order, then add
      // them at the and.
      if (diff.length > 0) {
        order = order.concat(diff);
      }
    } else {
      order = Class.getFieldsNames();
    }

    return order;
  }
};

var events = {};

events.afterSet = function(e) {
  var fieldName = e.data.fieldName;

  // If a validator is defined for given field then clear error message for
  // that field.
  if (this._errors) {
    this._errors.delete(fieldName);
  }
};

events.beforeInit = function() {
  var doc = this;

  doc._errors = new ReactiveMap();
};

Astro.eventManager.on('afterSet', events.afterSet);
Astro.eventManager.on('beforeInit', events.beforeInit)

Astro.eventManager.on(
  'initClass', function onInitClassValidators() {
    var Class = this;
    var schema = Class.schema;

    _.extend(Class, classMethods);

    schema.validators = schema.validators || {};
  }
);

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/module/init_definition.js              //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
var checkValidator = function(
  validator, fieldName, className
) {
  if (!Match.test(
    validator,
    Match.OneOf(Astro.FieldValidator, [Astro.FieldValidator])
  )) {
    throw new TypeError(
      'The validator for the "' + fieldName +
      '" field in the "' + className + '" class schema has to be a ' +
      'function, an array of validators or a single validator'
    );
  }
};

Astro.eventManager.on(
  'initDefinition', function onInitDefinitionValidators(schemaDefinition) {
    var Class = this;
    var schema = Class.schema;
    var validatorsDefinitions = {};
    var validationOrder;

    if (_.has(schemaDefinition, 'validationOrder')) {
      validationOrder = [].concat(schemaDefinition.validationOrder);
    }

    if (_.has(schemaDefinition, 'fields')) {
      _.each(schemaDefinition.fields, function(fieldDefinition, fieldName) {
        if (_.has(fieldDefinition, 'validator')) {
          var validator = fieldDefinition.validator;

          if (_.isArray(validator)) {
            validator = Validators.and(validator);
          }

          if (validator) {
            // Check validity of the validator definition.
            checkValidator(validator, fieldName, Class.getName());
            validatorsDefinitions[fieldName] = validator;
          }
        }
      });
    }

    if (_.has(schemaDefinition, 'validators')) {
      _.each(schemaDefinition.validators, function(validator, fieldName) {
        var validator;

        if (_.isArray(validator)) {
          validator = Validators.and(validator);
        }

        if (validator) {
          // Check validity of the validator definition.
          checkValidator(validator, fieldName, Class.getName());
          validatorsDefinitions[fieldName] = validator;
        }
      });
    }

    if (_.size(validatorsDefinitions) > 0) {
      // Add validators to the schema.
      _.extend(schema.validators, validatorsDefinitions);
    }
    if (validationOrder) {
      // Add validation order to the schema.
      schema.validationOrder = validationOrder;
    }
  }
);

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/type/string.js              //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'string',
  validate: _.isString,
  events: {
    validationError: function(e) {
      var fieldName = e.data.fieldName;

      e.setMessage(
        'The value of the "' + fieldName + '" field has to be a string'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/type/number.js              //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'number',
  validate: function(fieldValue) {
    return _.isNumber(fieldValue) && !_.isNaN(fieldValue);
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;

      e.setMessage(
        'The value of the "' + fieldName + '" field has to be a number'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/type/boolean.js             //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'boolean',
  validate: _.isBoolean,
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;

      e.setMessage(
        'The value of the "' + fieldName + '" field has to be a boolean'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/type/array.js               //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'array',
  validate: _.isArray,
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;

      e.setMessage(
        'The value of the "' + fieldName + '" field has to be an array'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/type/object.js              //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'object',
  validate: _.isObject,
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;

      e.setMessage(
        'The value of the "' + fieldName + '" field has to be an object'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/type/date.js                //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'date',
  validate: function(fieldValue) {
    return _.isDate(fieldValue) && !_.isNaN(fieldValue.valueOf());
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;

      e.setMessage(
        'The value of the "' + fieldName + '" field has to be a date'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/type/email.js               //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'email',
  validate: function(fieldValue) {
    // Create email regular expression.
    var re = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,}$/i;

    return re.test(fieldValue);
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;

      e.setMessage(
        'The value of the "' + fieldName +
        '" field has to be an appropiate email address'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/existence/required.js       //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'required',
  validate: function(fieldValue) {
    return !_.isNull(fieldValue) && fieldValue !== '';
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;

      e.setMessage(
        'The value of the "' + fieldName + '" field is required'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/existence/null.js           //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'null',
  validate: _.isNull,
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;

      e.setMessage(
        'The value of the "' + fieldName + '" field has to be null'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/existence/not_null.js       //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'notNull',
  validate: function(fieldValue) {
    return !_.isNull(fieldValue);
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;

      e.setMessage(
        'The value of the "' + fieldName + '" field can not be null'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/size/length.js              //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'length',
  validate: function(fieldValue, fieldName, length) {
    if (_.isNull(fieldValue) || !_.has(fieldValue, 'length')) {
      return false;
    }

    return fieldValue.length === length;
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;
      var length = e.data.param;

      e.setMessage(
        'The length of the value of the "' + fieldName +
        '" field has to be ' + length
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/size/min_length.js          //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'minLength',
  validate: function(fieldValue, fieldName, minLength) {
    if (_.isNull(fieldValue) || !_.has(fieldValue, 'length')) {
      return false;
    }

    return fieldValue.length >= minLength;
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;
      var minLength = e.data.param;

      e.setMessage(
        'The length of the value of the "' + fieldName +
        '" field has to be at least ' + minLength
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/size/max_length.js          //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'maxLength',
  validate: function(fieldValue, fieldName, maxLength) {
    if (_.isNull(fieldValue) || !_.has(fieldValue, 'length')) {
      return false;
    }

    return fieldValue.length <= maxLength;
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;
      var maxLength = e.data.param;

      e.setMessage(
        'The length of the value of the "' + fieldName +
        '" field has to be at most ' + maxLength
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/size/gt.js                  //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'gt',
  validate: function(fieldValue, fieldName, compareValue) {
    return fieldValue > compareValue;
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;
      var compareValue = e.data.param;

      e.setMessage(
        'The value of the "' + fieldName +
        '" field has to be greater than "' + compareValue + '"'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/size/gte.js                 //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'gte',
  validate: function(fieldValue, fieldName, compareValue) {
    return fieldValue >= compareValue;
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;
      var compareValue = e.data.param;

      e.setMessage(
        'The value of the "' + fieldName +
        '" field has to be greater than or equal "' + compareValue + '"'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/size/lt.js                  //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'lt',
  validate: function(fieldValue, fieldName, compareValue) {
    return fieldValue < compareValue;
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;
      var compareValue = e.data.param;

      e.setMessage(
        'The value of the "' + fieldName +
        '" field has to be less than "' + compareValue + '"'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/size/lte.js                 //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'lte',
  validate: function(fieldValue, fieldName, compareValue) {
    return fieldValue <= compareValue;
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;
      var compareValue = e.data.param;

      e.setMessage(
        'The value of the "' + fieldName +
        '" field has to be less than or equal "' + compareValue + '"'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/comparison/choice.js        //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'choice',
  validate: function(fieldValue, fieldName, choices) {
    return _.contains(choices, fieldValue);
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;
      var choices = e.data.param;

      e.setMessage(
        'The value of the "' + fieldName +
        '" field has to be one of "' + choices.join('", "') + '"'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/comparison/unique.js        //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'unique',
  validate: function(fieldValue, fieldName) {
    var doc = this;
    var Class = doc.constructor;
    var Collection = Class.getCollection();

    // If a Class is not related with any collection then document is unique.
    if (!Collection) {
      return true;
    }

    // Prepare selector.
    var selector = {};
    selector[fieldName] = fieldValue;

    // If the "_id" fields is present, then object is being updated.
    // In this case, ignore the object itself.
    if (this._id) {
      selector._id = {
        $ne: this._id
      };
    }

    // Check if a record with the given field value exists.
    return _.isUndefined(Collection.findOne(selector));
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;

      e.setMessage(
        'The value of the "' + fieldName + '" field has to be unique'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/comparison/equal.js         //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'equal',
  validate: function(fieldValue, fieldName, compareValue) {
    return fieldValue === compareValue;
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;
      var compareValue = e.data.param;

      e.setMessage(
        'The value of the "' + fieldName +
        '" field has to be equal "' + compareValue + '"'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/comparison/equal_to.js      //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'equalTo',
  validate: function(fieldValue, fieldName, compareFieldName) {
    var compareValue = this.get(compareFieldName);

    return fieldValue === compareValue;
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;
      var compareFieldName = e.data.param;
      var compareValue = this.get(compareFieldName);

      e.setMessage(
        'The values of the "' + fieldName + '" and "' +
        compareValue + '" fields have to be equal'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/comparison/regexp.js        //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'regexp',
  validate: function(fieldValue, fieldName, pattern) {
    return pattern.test(fieldValue);
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;
      var pattern = e.data.param.toString();

      e.setMessage(
        'The value of the "' + fieldName +
        '" field has to match the "' + pattern + '" regular expression'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/logical/and.js              //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'and',
  validate: function(fieldValue, fieldName, fieldValidators) {
    var doc = this;

    return _.every(fieldValidators, function(fieldValidator) {
      return fieldValidator.validate(
        doc, fieldName, fieldValue
      );
    });
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/logical/or.js               //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'or',
  validate: function(fieldValue, fieldName, fieldValidators) {
    var doc = this;
    var error;
    var doc = this;

    if (!_.some(fieldValidators, function(fieldValidator) {
      try {
        return fieldValidator.validate(
          doc, fieldName, fieldValue
        );
      } catch (e) {
        if (e instanceof Astro.ValidationError) {
          // We get the first error that occured. We will throw it again if
          // there are no validators that pass.
          if (!error) {
            error = e;
          }
          return false;
        } else {
          throw e;
        }
      }
    })) {
      throw error;
    }

    return true;
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/logical/if.js               //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'if',
  validate: function(fieldValue, fieldName, options) {
    var doc = this;

    if (!_.has(options, 'condition') || !_.isFunction(options.condition)) {
      throw new Error(
        'The "condition" option in the "if" validator is required'
      );
    }

    if (
      !_.has(options, 'true') || !options.true instanceof Astro.FieldValidator
    ) {
      throw new Error(
        'The "true" option in the "if" validator is required'
      );
    }

    if (options.condition.call(doc, fieldValue, fieldName)) {
      return options.true.validate(doc, fieldName, fieldValue);
    }

    if (
      _.has(options, 'false') &&
      options.false instanceof Astro.FieldValidator
    ) {
      return options.false.validate(doc, fieldName, fieldValue);
    }

    return true;
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/logical/switch.js           //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'switch',
  validate: function(fieldValue, fieldName, options) {
    var doc = this;

    if (!_.has(options, 'cases') || !_.isObject(options.cases)) {
      throw new Error(
        'The "cases" option in the "switch" validator is required'
      );
    }

    if (_.has(options, 'expression') && !_.isFunction(options.expression)) {
      throw new Error(
        'The "expression" option in the "switch" validator has to be a function'
      );
    }

    var expression;
    if (_.has(options, 'expression')) {
      expression = options.expression.call(doc, fieldValue, fieldName);
    } else {
      expression = fieldValue;
    }

    if (_.has(options.cases, expression)) {
      return options.cases[expression].validate(doc, fieldName, fieldValue);
    }

    return true;
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/nested/every.js             //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'every',
  validate: function(fieldValue, fieldName, fieldValidator) {
    var doc = this;

    if (!_.isArray(fieldValue)) {
      return true;
    }

    return _.every(fieldValue, function(value) {
      return fieldValidator.validate(
        doc,
        fieldName,
        value
      );
    });
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/nested/has.js               //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'has',
  validate: function(fieldValue, fieldName, propertyName) {
    if (!_.isObject(fieldValue)) {
      return false;
    }

    return _.has(fieldValue, propertyName);
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;
      var propertyName = e.data.param;

      e.setMessage(
        'The value of the "' + fieldName +
        '" field has to have "' + propertyName + '" property'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/jagi_astronomy-validators/lib/validators/nested/contains.js          //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Astro.createValidator({
  name: 'contains',
  validate: function(fieldValue, fieldName, sought) {
    if (!(_.isArray(fieldValue) || _.isObject(fieldValue))) {
      return false;
    }

    return _.contains(fieldValue, sought);
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.fieldName;
      var sought = e.data.param;

      e.setMessage(
        'The value of the "' + fieldName +
        '" field has to contain the "' + sought + '" value'
      );
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['jagi:astronomy-validators'] = {}, {
  Validators: Validators
});

})();

//# sourceMappingURL=jagi_astronomy-validators.js.map
