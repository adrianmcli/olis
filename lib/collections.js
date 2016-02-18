import {Mongo} from 'meteor/mongo';

export const Teams = new Mongo.Collection('teams');

// For test module
export const Posts = new Mongo.Collection('posts');

