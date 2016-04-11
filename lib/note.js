import {Astro} from 'meteor/jagi:astronomy';
import {Notes} from './collections';
import R from 'ramda';

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
    },
    widgetIds: {
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
  },
  methods: {
    isEmpty() {
      // return R.isEmpty(this.sectionIds);
      return R.isEmpty(this.widgetIds);
    }
  }
});
export default Note;
