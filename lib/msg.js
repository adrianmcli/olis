import {Astro} from 'meteor/jagi:astronomy';
import {Messages} from './collections';

const Message = Astro.Class({
  name: 'Message',
  collection: Messages,
  fields: {
    text: {
      type: 'string',
      default() { return 'Default Message'; }
    },
    userId: {
      type: 'string',
    },
    convoId: {
      type: 'string',
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
export default Message;
