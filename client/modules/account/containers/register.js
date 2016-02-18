import {useDeps, composeAll} from 'mantra-core';
import Register from '../components/register.jsx';

export const depsMapper = (context, actions) => ({
  register: actions.account.register
});

export default composeAll(
  useDeps(depsMapper)
)(Register);
