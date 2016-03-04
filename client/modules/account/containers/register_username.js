import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import CreateAccountUsername from '../components/on-boarding/CreateAccountUsername.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  setRegisterUsername: actions.account.setRegisterUsername
});

export const composer = ({context}, onData) => {
  const {LocalState} = context();
  const registerUsername = LocalState.get('register.username');
  onData(null, {
    registerUsername
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(CreateAccountUsername);
