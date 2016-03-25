import React from 'react';
import SpeedConvos from '../components/SpeedConvos.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions
});

export const composer = ({context}, onData) => {
  const {Meteor, Collections, FlowRouter} = context();

  const teamId = FlowRouter.getParam('teamId');

  if (teamId) {
    console.log('teamId');
    const subConvos = Meteor.subscribe('convos.list', {teamId});

    if (subConvos.ready()) {
      console.log('teamId SUBS READY');
      const convos = Collections.Convos.find().fetch();
      onData(null, {convos});
    }
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SpeedConvos);
