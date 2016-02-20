import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Astro} from 'meteor/jagi:astronomy';
import {Validators} from 'meteor/jagi:astronomy-validators';
import R from 'ramda';

export const Teams = new Mongo.Collection('teams');
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
export {Team};

export const Convos = new Mongo.Collection('convos');
const Convo = Astro.Class({
  name: 'Convo',
  collection: Convos,
  fields: {
    name: {
      type: 'string',
      default() { return 'Default Convo'; }
    },
    userIds: {
      type: 'array',
      default() { return []; }
    },
    teamId: {
      type: 'string',
      default() { return 'noTeamId'; }
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
    }
  }
});
export {Convo};

export const Messages = new Mongo.Collection('messages');
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
export {Message};

// For test module
export const Posts = new Mongo.Collection('posts');

