import R from 'ramda';
import * as GlobalCollections from '/lib/collections';
import * as ClientCollections from '../collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';

// Models
import Convo from '/lib/convo';
import Message from '/lib/msg';
import Note from '/lib/note';
import Notification from '/lib/notification';
import Section from '/lib/section';
import Team from '/lib/team';
import Invite from '/lib/invite';

export default function () {
  return {
    Meteor,
    FlowRouter,
    Collections: R.merge(GlobalCollections, ClientCollections),
    Models: {
      Convo,
      Message,
      Note,
      Notification,
      Section,
      Team,
      Invite
    },
    LocalState: new ReactiveDict(),
    Tracker
  };
}
