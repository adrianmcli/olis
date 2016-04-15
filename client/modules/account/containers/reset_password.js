import {useDeps, composeAll} from 'mantra-core';
import ResetPasswordOnboard from '../components/onboarding/ResetPasswordOnboard';

export const depsMapper = (context, actions) => ({
  context: () => context,
  resetPassword: actions.account.resetPassword
});

export default composeAll(
  useDeps(depsMapper)
)(ResetPasswordOnboard);

