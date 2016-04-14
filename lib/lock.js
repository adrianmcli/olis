import {Astro} from 'meteor/jagi:astronomy';
import {Locks} from './collections';

const Lock = Astro.Class({
  name: 'Lock',
  collection: Locks,
  fields: {
    noteId: {
      type: 'string'
    },
    widgetId: {
      type: 'string'
    },
    userId: {
      type: 'string'
    },
    username: {
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
export default Lock;
