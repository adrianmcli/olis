import {Mongo} from 'meteor/mongo';

export const SearchMessages = new Mongo.Collection('searchMessages');
export const SearchUsers = new Mongo.Collection('searchUsers');
