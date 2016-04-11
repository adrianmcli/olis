import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const Teams = new Mongo.Collection('teams');
export const Convos = new Mongo.Collection('convos');
export const Messages = new Mongo.Collection('messages');
export const Notes = new Mongo.Collection('notes');
export const Sections = new Mongo.Collection('sections');
export const Notifications = new Mongo.Collection('notifications');
export const Invites = new Mongo.Collection('invites');
export const Translations = new Mongo.Collection('translations');
export const Widgets = new Mongo.Collection('widgets');

// For test module
export const Posts = new Mongo.Collection('posts');

// Building indexes
export const buildIndexes = () => {
  if (Meteor.isServer) {
    Messages._ensureIndex({
      text: 'text',
      username: 'text',
      translation: 'text'
    });

    Convos._ensureIndex({
      name: 'text'
    });

    Meteor.users._ensureIndex({
      username: 'text',
      'emails.address': 'text'
    });

    // TODO notes
  }
};
