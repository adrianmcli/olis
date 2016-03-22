import {useDeps, composeAll} from 'mantra-core';
import InviteToTeam from '../components/HeaderMenuItems/InviteToTeam.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  invite: actions.teams.invite
});

export default composeAll(
  useDeps(depsMapper)
)(InviteToTeam);
