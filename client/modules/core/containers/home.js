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
  const inTeam = () => {
    if (team) { return team.isUserInTeam(userId); }
    return false;
  };
  const inConvo = () => {
    if (convo) { return convo.isUserInConvo(userId); }
    return false;
  };

  if (!inTeam) { FlowRouter.go('/team'); }
  else if (!inConvo && inTeam) { FlowRouter.go(`/team/${teamId}`); }
  else if (!inConvo && !inTeam) { FlowRouter.go(`/team`); }
  onData(null, {teamId, convoId});
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(Home);
