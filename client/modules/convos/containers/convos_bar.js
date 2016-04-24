import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Sidebar from '../components/Sidebar.jsx';
import R from 'ramda';
import {SubsManager} from 'meteor/meteorhacks:subs-manager';
import AccountUtils from '/client/modules/core/libs/account';

const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  selectConvo: actions.convos.select,
});

const ConvoSubs = new SubsManager();

export const composer = ({context}, onData) => {
  const {Meteor, Collections, FlowRouter, LocalState} = context();
  const teamId = FlowRouter.getParam('teamId');

  if (teamId) {
    const subUsers = Meteor.subscribe('users.team', {teamId});
    const subConvos = ConvoSubs.subscribe('convos.list', {teamId});

    if (subUsers.ready() && subConvos.ready()) {
      const { teamUsers, teamUsersArr } = _getTeamUsers({Meteor, teamId});
      const convos = _getConvos({Meteor, Collections, teamId});
      const convoId = FlowRouter.getParam('convoId');
      const user = Meteor.user();
      const lastTimeInConvo = user.lastTimeInConvo;
      const windowIsFocused = LocalState.get('window.isFocused');
      if (!convoId) {
        _routeToRecentConvo({Meteor, FlowRouter, convos, teamId});
      }

      onData(null, {
        convos,
        convoId,
        lastTimeInConvo,
        teamUsers,
        user,
        teamUsersArr,
        windowIsFocused,
      });
    }
  }
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(Sidebar);

function _getTeamUsers({Meteor, teamId}) {
  const selector = {
    [`roles.${teamId}`]: {$exists: true},
  };
  const teamUsersArr = Meteor.users.find(selector).fetch();
  const teamUsers = R.zipObj(teamUsersArr.map(teamUser => teamUser._id), teamUsersArr);
  return { teamUsers, teamUsersArr };
}

function _getConvos({Meteor, Collections, teamId}) {
  const selector = {
    userIds: Meteor.userId(),
    teamId,
  };
  const options = {sort: [ [ 'updatedAt', 'desc' ] ]};
  const convos = Collections.Convos.find(selector, options).fetch();
  return convos;
}

function _routeToRecentConvo({Meteor, FlowRouter, convos, teamId}) {
  const convoIdsInTeam = convos.map(convo => convo._id);
  const allConvoIdsOrdered = AccountUtils.getOrderedByVisitConvoIds({Meteor}, 'desc');
  const inTeamConvoIdsOrdered = R.filter(pair => {
    const id = pair[0];
    return R.contains(id, convoIdsInTeam);
  }, allConvoIdsOrdered);
  const mostRecentVisted = inTeamConvoIdsOrdered[0][0];

  if (mostRecentVisted) {
    FlowRouter.go(`/team/${teamId}/convo/${mostRecentVisted}`);
  }
}
