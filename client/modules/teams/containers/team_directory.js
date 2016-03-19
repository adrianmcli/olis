import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {buildRegExp} from '/client/modules/core/libs/search';
import TeamDirectory from '../components/HeaderMenuItems/TeamDirectory.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  searchTeamUsers: actions.search.setTeamUsersSearchText,
  showUserInfo: actions.teams.setUserShown,
  makeUserTeamAdmin: actions.teams.makeUserAdmin,
  removeUserFromTeam: actions.teams.removeUser
});

export const composer = ({context, searchTeamUsers, showUserInfo}, onData) => {
  const {Meteor, LocalState, Collections, FlowRouter} = context();

  let teamUsersSearchResult = [];
  let team;
  const userShown = LocalState.get('teamDirectory.userShown');

  const teamId = FlowRouter.getParam('teamId');
  if (teamId) {
    if (Meteor.subscribe('teams.single', {teamId}).ready()) {
      team = Collections.Teams.findOne(teamId);
      const searchText = LocalState.get('searchText.teamUsers');

      let selector = {};
      if (searchText) {
        const regExp = buildRegExp(searchText);
        selector = {$or: [
          {username: regExp},
          {'emails.address': regExp}
        ]};
      }
      selector[`roles.${teamId}`] = {$exists: true};

      teamUsersSearchResult = Meteor.users.find(selector).fetch();

      onData(null, {
        team,
        teamUsersSearchResult,
        userShown,
        isAdmin: team.isUserAdmin(Meteor.userId())
      });
    }
  }

  const cleanup = () => {
    searchTeamUsers(undefined);
    showUserInfo(undefined);
  };
  return cleanup;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(TeamDirectory);
