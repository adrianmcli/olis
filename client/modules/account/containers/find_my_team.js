import {useDeps, composeAll} from 'mantra-core';
import FindMyTeam from '../components/on-boarding/FindMyTeam.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  submitEmail: actions.account.submitFindMyTeamEmail
});

export default composeAll(
  useDeps(depsMapper)
)(FindMyTeam);
