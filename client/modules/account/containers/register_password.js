import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import CreateAccountPassword from '../components/onboarding/CreateAccountPassword.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  setRegisterPassword: actions.account.setRegisterPassword,
  goBack: actions.account.goToCreateAccountUsername
});

export const composer = ({context}, onData) => {
  const {LocalState} = context();
  const registerPassword = LocalState.get('register.password');
  onData(null, {
    registerPassword
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(CreateAccountPassword);
