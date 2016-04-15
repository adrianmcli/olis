import {Astro} from 'meteor/jagi:astronomy';
import {Messages} from '../collections';

const Message = Astro.Class({
  name: 'Message',
  collection: Messages,
  fields: {
    text: {
      type: 'string',
      default() { return 'Default Message'; }
    },
    userId: {
      type: 'string'
    },
    username: { // Fall back for users who have been kicked out of team
      type: 'string',
      default() { return 'Default username.'; }
    },
    convoId: {
      type: 'string',
    },
    convoName: {
      type: 'string',
      default() { return 'Default Convo Name'; }
    },
    translation: {
      type: 'object',
      default() { return {}; }
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
