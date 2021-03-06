import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {buildRegExp} from '/client/modules/core/libs/search';
import TeamDirectory from '../components/HeaderMenuItems/TeamDirectory.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  searchTeamUsers: actions.search['searchText.teamUsers.set'],
  showUserInfo: actions.teams.setUserIdShown,
  makeUserTeamAdmin: actions.teams.makeUserAdmin,
  removeUserFromTeam: actions.teams.removeUser,
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections, FlowRouter} = context();

  const teamId = FlowRouter.getParam('teamId');
  if (teamId) {
    if (Meteor.subscribe('teams.single', {teamId}).ready()) {
      const team = Collections.Teams.findOne(teamId);
      const searchText = LocalState.get('searchText.teamUsers');

      let selector = {};
      if (searchText) {
        const regExp = buildRegExp(searchText);
        selector = {$or: [
          {username: regExp},
          {'emails.address': regExp},
        ]};
      }
      selector[`roles.${teamId}`] = {$exists: true};
      const options = {sort: [ [ 'username', 'asc' ] ]};

      const teamUsersSearchResult = Meteor.users.find(selector, options).fetch();
      const userIdShown = LocalState.get('teamDirectory.userIdShown');
      const userShown = Meteor.users.findOne(userIdShown);

      onData(null, {
        team,
        teamUsersSearchResult,
        userShown,
        isAdmin: team.isUserAdmin(Meteor.userId()),
      });
    }
  }
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(TeamDirectory);
