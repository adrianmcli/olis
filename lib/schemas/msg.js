import {Astro} from 'meteor/jagi:astronomy';
import {Messages} from '../collections';
import DraftUtils from '/lib/utils/draft-js';

const Message = Astro.Class({
  name: 'Message',
  collection: Messages,
  fields: {
    content: {
      type: 'object',
      default() { return {}; },
    },
    text: {
      type: 'string',
    },
    userId: {
      type: 'string',
    },
    username: { // Fall back for users who have been kicked out of team
      type: 'string',
      default() { return 'Default username.'; },
    },
    convoId: {
      type: 'string',
    },
    convoName: {
      type: 'string',
      default() { return 'Default Convo Name'; },
    },
    translation: {
      type: 'object',
      default() { return {}; },
    },
    isSystemMsg: {
      type: 'boolean',
      default() { return false; },
    },
    imageUrl: {
      type: 'string',
    },
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt',
    },
  },
  methods: {
    getPlainText() {
      return DraftUtils.getPlainTextFromRaw(this.content);
    },
  },
});
export default Message;
