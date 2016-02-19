import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Astro} from 'meteor/jagi:astronomy';
import {Validators} from 'meteor/jagi:astronomy-validators';

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

// For test module
export const Posts = new Mongo.Collection('posts');

