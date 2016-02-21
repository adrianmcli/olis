import {Astro} from 'meteor/jagi:astronomy';
import {Notes} from './collections';

const Note = Astro.Class({
  name: 'Note',
  collection: Notes,
  fields: {
    convoId: {
      type: 'string'
    },
    title: {
      type: 'string',
      default() { return 'Default Note'; }
    },
    sectionIds: {
      type: 'array',
      default() { return []; }
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
export default Note;
