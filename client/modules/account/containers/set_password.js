import {useDeps, composeAll} from 'mantra-core';
import SetPassword from '../components/onboarding/SetPassword.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  resetPassword: actions.account.resetPassword
});

export default composeAll(
  useDeps(depsMapper)
)(SetPassword);
