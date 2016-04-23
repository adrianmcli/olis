import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import InvitedToTeam from '../components/InvitedToTeam.jsx';
import R from 'ramda';

const depsMapper = (context, actions) => ({
  context: () => context,
  selectInvite: actions.invites.select
});

export const composer = ({context}, onData) => {
  const {Meteor, Collections, FlowRouter} = context();

  if (Meteor.subscribe('invites.list').ready()) {
    const invites = Collections.Invites.find({userId: Meteor.userId()}).fetch();

    if (Meteor.subscribe('teams.list').ready()) {
      const teamsArr = Collections.Teams.find({userIds: Meteor.userId()}).fetch();
      const teams = R.zipObj(teamsArr.map(team => team._id), teamsArr);

      if (!R.isEmpty(invites)) {
        const teamId = invites[0].teamId;
        FlowRouter.go(`/team/${teamId}`);
      }
      
      // onData(null, {invites, teams});
    }
  }
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(InvitedToTeam);
