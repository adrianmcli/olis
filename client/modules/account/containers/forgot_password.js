import {useDeps, composeAll} from 'mantra-core';
import ForgotPassword from '../components/ForgotPassword.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  submitForgotPasswordEmail: actions.account.submitForgotPasswordEmail
});

export default composeAll(
  useDeps(depsMapper)
)(ForgotPassword);
