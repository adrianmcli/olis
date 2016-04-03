import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Home from '../components/Home.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  goToMyAccount: actions.account.goToMyAccount,
  logout: actions.account.logout
});

export const composer = ({context}, onData) => {
  const {Meteor, FlowRouter, Collections} = context();
  const teamId = FlowRouter.getParam('teamId');
  const convoId = FlowRouter.getParam('convoId');

  // const user = Meteor.user();
  const userId = Meteor.userId();
  const team = Collections.Teams.findOne(teamId);
  const convo = Collections.Convos.findOne(convoId);
  const notInTeam = team && !team.isUserInTeam(userId); // Kicked out of team or team deleted
  const notInConvo = convo && !convo.isUserInConvo(userId); // Kicked out of convo or convo deleted

  if (notInTeam || notInConvo) { FlowRouter.go('/team'); }
  onData(null, {teamId, convoId});
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(Home);
