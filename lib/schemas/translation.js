import {Astro} from 'meteor/jagi:astronomy';
import {Translations} from '../collections';

const Translation = Astro.Class({
  name: 'Translation',
  collection: Translations,
  fields: {
    msgId: {
      type: 'string'
    },
    convoId: {
      type: 'string'
    },
    langCode: {
      type: 'string'
    },
    text: {
      type: 'string'
    }
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt'
    }
  }
});
export default Translation;
