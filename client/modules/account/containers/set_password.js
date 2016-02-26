import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import SetPasswordPage from '../components/SetPasswordPage.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  resetPassword: actions.account.resetPassword
});

export default composeAll(
  useDeps(depsMapper)
)(SetPasswordPage);
