import {EasySearch} from 'meteor/easysearch:core';
import * as Collections from '/lib/collections';

export const IndexMsgs = new EasySearch.Index({
  collection: Collections.Messages,
  fields: [ 'text', 'translation' ],
  engine: new EasySearch.MongoTextIndex(),
  name: 'IndexMsgs'
});
