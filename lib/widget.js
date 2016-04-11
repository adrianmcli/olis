import {Astro} from 'meteor/jagi:astronomy';
import {Widgets} from './collections';

const Widget = Astro.Class({
  name: 'Widget',
  collection: Widgets,
  fields: {
    noteId: {
      type: 'string'
    },
    type: {
      type: 'string',
      default() { return null; }
    },
    data: {
      type: 'object',
      default() { return null; }
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
});
export default Widget;
