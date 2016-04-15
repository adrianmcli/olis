import R from 'ramda';
import * as GlobalCollections from '/lib/collections';
import * as ClientCollections from '../collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';
import Schemas from '/lib/schemas';

export default function () {
  return {
    Meteor,
    FlowRouter,
    Collections: R.merge(GlobalCollections, ClientCollections),
    Schemas,
    LocalState: new ReactiveDict(),
    Tracker
  };
}
