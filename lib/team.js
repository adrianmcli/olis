import {Meteor} from 'meteor/meteor';
import {Astro} from 'meteor/jagi:astronomy';
import {Teams} from './collections';
import R from 'ramda';

const Team = Astro.Class({
  name: 'Team',
  collection: Teams,
  fields: {
    name: {
      type: 'string',
      default() { return 'Default Team'; }
    },
    userIds: {
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
    isUserInTeam(input) {
      const userIds = input.constructor === Array ? input : [ input ];
      return R.intersection(userIds, this.userIds).length === userIds.length;
    }
  }
});
// Meteor toys is basically the server, can see the server only fields too
// but if you do console log on client, won't see it.
if (Meteor.isServer) {
  Team.extend({
    fields: {
      serverOnly: {
        type: 'string',
        default() { return 'Only server guys can read this.'; }
      }
    }
  });
}
export default Team;
