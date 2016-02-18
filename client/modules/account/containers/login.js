import {useDeps, composeAll} from 'mantra-core';
import Login from '../components/login.jsx';

export const depsMapper = (context, actions) => ({
  login: actions.account.login
});

export default composeAll(
  useDeps(depsMapper)
)(Login);