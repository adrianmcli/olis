import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import HeaderMenu from '../components/HeaderMenu.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  logout: actions.account.logout,
  goToMyAccount: actions.account.goToMyAccount,
  goToTeamSettings: actions.teams.goToTeamSettings
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections} = context();

  const user = Meteor.user();
  const username = user ? user.username : undefined;
  const profileImageUrl = user ? user.profileImageUrl : undefined;

  const teamId = LocalState.get('teamId');
  if (teamId) {
    if (Meteor.subscribe('teams.single', {teamId}).ready()) {
      const team = Collections.Teams.findOne(teamId);

      onData(null, {
        username,
        profileImageUrl,
        teamName: team.name
      });
    }
  }
  else {
    onData(null, {username, profileImageUrl, teamName: ''});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(HeaderMenu);
