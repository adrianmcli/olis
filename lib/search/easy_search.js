import {Meteor} from 'meteor/meteor';
import {EasySearch} from 'meteor/easysearch:core';
import * as Collections from '/lib/collections';

export const IndexMsgs = new EasySearch.Index({
  collection: Collections.Messages,
  fields: [ 'text', 'translation' ],
  engine: new EasySearch.MongoTextIndex(),
  name: 'IndexMsgs'
});

export const IndexConvos = new EasySearch.Index({
  collection: Collections.Convos,
  fields: [ 'name' ],
  engine: new EasySearch.MongoTextIndex(),
  name: 'IndexConvos'
});

export const IndexUsers = new EasySearch.Index({
  collection: Meteor.users,
  fields: [ 'username' ],
  selectorPerField(field, searchString) {
    if (field === 'emails') {
      // return this selector if the email field is being searched
      return {
        emails: {
          $elemMatch: {
            address: { '$regex': '.*' + searchString + '.*', '$options': 'i' }
          }
        }
      };
    }
    // use the default otherwise
    return this.defaultConfiguration().selectorPerField(field, searchString);
  },
  engine: new EasySearch.MongoTextIndex(),
  name: 'IndexUsers'
});
