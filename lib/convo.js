import {Astro} from 'meteor/jagi:astronomy';
import {Convos} from './collections';
import R from 'ramda';

const Convo = Astro.Class({
  name: 'Convo',
  collection: Convos,
  fields: {
    name: {
      type: 'string',
      default() { return 'Default convo name'; }
    },
    userIds: {
      type: 'array',
      default() { return []; }
    },
    teamId: {
      type: 'string',
      default() { return 'noTeamId'; }
    },
    lastMsgText: {
      type: 'string',
      default() { return null; }
    },
    recentUserIds: {
      type: 'array',
      default() { return []; }
    },
    recentUsernames: {
      type: 'array',
      default() { return []; }
    },
    numMsgs: {
      type: 'number',
      default() { return 0; }
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
    isUserInConvo(input) {
      const userIds = input.constructor === Array ? input : [ input ];
      return R.intersection(userIds, this.userIds).length === userIds.length;
    },
    isUserAdmin() {
      return true; // TODO implement new role for convo admin
    },
    getName(userId, convoUsers) {
      if (this.userIds.length === 1 || this.userIds.length > 2) { return this.name; }
      if (this.userIds.length === 2) {
        const otherUserId = R.filter(id => id !== userId, this.userIds);
        return convoUsers[otherUserId].username;
      }
    }
  }
});
export default Convo;
