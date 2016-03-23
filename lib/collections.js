import {Mongo} from 'meteor/mongo';

export const Teams = new Mongo.Collection('teams');
export const Convos = new Mongo.Collection('convos');
export const Messages = new Mongo.Collection('messages');
export const Notes = new Mongo.Collection('notes');
export const Sections = new Mongo.Collection('sections');
export const Notifications = new Mongo.Collection('notifications');
export const Invites = new Mongo.Collection('invites');

// For test module
export const Posts = new Mongo.Collection('posts');
