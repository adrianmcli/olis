import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import HeaderMenu from '../components/HeaderMenu.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  logout: actions.account.logout,
  goToMyAccount: actions.account.goToMyAccount,
  goToTeamSettings: actions.teams.goToTeamSettings
});

export const composer = ({context}, onData) => {
  const {Meteor, Collections, FlowRouter} = context();

  const user = Meteor.user();
  const username = user ? user.username : undefined;
  const profileImageUrl = user ? user.profileImageUrl : undefined;
  let teamName;
  let isAdmin = false;

  const teamId = FlowRouter.getParam('teamId');
  if (teamId) {
    if (Meteor.subscribe('teams.single', {teamId}).ready()) {
      const team = Collections.Teams.findOne(teamId);

      teamName = team.name;
      isAdmin = team.isUserAdmin(Meteor.userId());

      onData(null, {
        username,
        profileImageUrl,
        teamName,
        isAdmin
      });
    }
  }
  else {
    onData(null, {username, profileImageUrl, teamName, isAdmin});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(HeaderMenu);
