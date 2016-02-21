import {Astro} from 'meteor/jagi:astronomy';
import {Sections} from './collections';

const Section = Astro.Class({
  name: 'Section',
  collection: Sections,
  fields: {
    noteId: {
      type: 'string'
    },
    text: {
      type: 'string',
      default() { return 'Default Section'; }
    },
    editingByUserId: {
      type: 'string'
    },
    unlocksAt: {
      type: 'date',
      default() { return new Date(0); }
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
    canEdit(userId) {
      return this.editingByUserId === userId || Date.now() > this.unlocksAt;
    }
  }
});
export default Section;
