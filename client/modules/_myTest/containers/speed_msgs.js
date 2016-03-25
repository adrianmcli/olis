import React from 'react';
import SpeedMsgs from '../components/SpeedMsgs.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {SubsManager} from 'meteor/meteorhacks:subs-manager';

const MsgSubs = new SubsManager();

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions
});

export const composer = ({context}, onData) => {
  const {Meteor, Collections, FlowRouter} = context();

  const convoId = FlowRouter.getParam('convoId');

  if (convoId) {
    console.log('convoId');
    const subMsgs = MsgSubs.subscribe('msgs.list', {convoId, currentNumMsgs: 10});

    if (subMsgs.ready()) {
      console.log('convoId SUBS READY');
      const msgs = Collections.Messages.find({convoId}).fetch();
      onData(null, {msgs});
    }
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SpeedMsgs);
