import {Astro} from 'meteor/jagi:astronomy';
import {Notifications} from '../collections';

const Notification = Astro.Class({
  name: 'Notification',
  collection: Notifications,
  fields: {
    userId: {
      type: 'string',
      default() { return 'noUserId'; },
    },
    teamId: {
      type: 'string',
      default() { return 'noTeamId'; },
    },
    convoId: {
      type: 'string',
      default() { return 'noConvoId'; },
    },
    convoName: {
      type: 'string',
      default() { return 'default convo name'; },
    },
    recentUsernames: {
      type: 'array',
      default() { return []; },
    },
    lastProfileImageUrl: {
      type: 'string',
      default() { return null; },
    },
    lastMsgText: {
      type: 'string',
    },
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
    belongsToUser(userId) {
      return this.userId === userId;
    }
  }
});
export default Notification;
