import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import CreateAccountTeamName from '../components/onboarding/CreateAccountTeamName.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  setRegisterTeamName: actions.account.setRegisterTeamName,
  goBack: actions.account.goToCreateAccountPassword
});

export const composer = ({context}, onData) => {
  const {LocalState} = context();
  const registerTeamName = LocalState.get('register.teamName');
  onData(null, {
    registerTeamName
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(CreateAccountTeamName);
