import React from 'react';
import Speed from '../components/Speed.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions
});

export const composer = ({context}, onData) => {
  const {Meteor, Collections, FlowRouter} = context();

  const teamId = FlowRouter.getParam('teamId');
  const convoId = FlowRouter.getParam('convoId');

  if (teamId && !convoId) {
    if (Meteor.subscribe('convos.list', {teamId}).ready()) {
      const convos = Collections.Convos.find().fetch();
      onData(null, {convos});
    }
  }

  if (teamId && convoId) {
    const subConvos = Meteor.subscribe('convos.list', {teamId});
    const subMsgs = Meteor.subscribe('msgs.list', {convoId, currentNumMsgs: 10});

    if (subConvos.ready() && subMsgs.ready()) {
      const convos = Collections.Convos.find().fetch();
      const msgs = Collections.Messages.find({convoId}).fetch();
      onData(null, {convos, msgs, convoId});
    }
  }

};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Speed);
