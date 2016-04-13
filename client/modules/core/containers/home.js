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

  // Either/both can be undefined for subTeams
  const subTeams = Meteor.subscribe('teams.list', {teamId, convoId});

  let subConvos;
  if (teamId) {
    subConvos = Meteor.subscribe('convos.list', {teamId});
  }

  if (subTeams.ready() && !convoId) {
    handleGroupPermissions({Meteor, Collections, FlowRouter}, onData, teamId, convoId);
  }
  else if (subTeams.ready() && convoId) {
    if (subConvos && subConvos.ready()) {
      handleGroupPermissions({Meteor, Collections, FlowRouter}, onData, teamId, convoId);
    }
  }
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(Home);

function handleGroupPermissions({Meteor, Collections, FlowRouter}, onData, teamId, convoId) {
  const userId = Meteor.userId();
  const team = Collections.Teams.findOne(teamId);
  const convo = Collections.Convos.findOne(convoId);

  const notInTeam = team && !team.isUserInTeam(userId);
  const notInConvo = convo && !convo.isUserInConvo(userId);
  const noConvo = convoId && !convo;

  // console.log(`notInTeam ${notInTeam}, notInConvo ${notInConvo}, noConvo ${noConvo}`);

  // Redirect on team/convo delete or getting kicked out
  if (notInTeam) { FlowRouter.go('/team'); }
  else if (noConvo) { FlowRouter.go(`/team/${teamId}`); }
  onData(null, {teamId, convoId});
}
