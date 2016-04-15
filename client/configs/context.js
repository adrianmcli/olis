import R from 'ramda';
import * as GlobalCollections from '/lib/collections';
import * as ClientCollections from '../collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';

// Schemas
import Convo from '/lib/schemas/convo';
import Message from '/lib/schemas/msg';
import Note from '/lib/schemas/note';
import Notification from '/lib/schemas/notification';
import Section from '/lib/schemas/section';
import Team from '/lib/schemas/team';
import Invite from '/lib/schemas/invite';
import Widget from '/lib/schemas/widget';

export default function () {
  return {
    Meteor,
    FlowRouter,
    Collections: R.merge(GlobalCollections, ClientCollections),
    Schemas: {
      Convo,
      Message,
      Note,
      Notification,
      Section,
      Team,
      Invite,
      Widget
    },
    LocalState: new ReactiveDict(),
    Tracker
  };
}
