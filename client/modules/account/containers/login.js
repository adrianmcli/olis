import {useDeps, composeAll} from 'mantra-core';
import Login from '../components/Login.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  login: actions.account.login,
  clearErrors: actions.account.clearErrors
});

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const regError = LocalState.get('REGISTRATION_ERROR');
  const loginError = LocalState.get('LOGIN_ERROR');

  onData(null, {regError, loginError});

  // clearErrors when unmounting the component
  return clearErrors;
};

export default composeAll(
  useDeps(depsMapper)
)(Login);
