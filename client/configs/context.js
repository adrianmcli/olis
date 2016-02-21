import * as Collections from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';

// Models
import Convo from '/lib/convo';
import Message from '/lib/msg';
import Note from '/lib/note';
import Section from '/lib/section';
import Team from '/lib/team';

export default function () {
  return {
    Meteor,
    FlowRouter,
    Collections,
    Models: {Convo, Message, Note, Section, Team},
    LocalState: new ReactiveDict(),
    Tracker
  };
}
