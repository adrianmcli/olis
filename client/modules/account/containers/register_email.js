import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import CreateAcccountEmail from '../components/on-boarding/CreateAccountEmail.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  setRegisterEmail: actions.account.setRegisterEmail
});

export const composer = ({context}, onData) => {
  const {LocalState} = context();
  const registerEmail = LocalState.get('register.email');
  onData(null, {
    registerEmail
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(CreateAcccountEmail);
