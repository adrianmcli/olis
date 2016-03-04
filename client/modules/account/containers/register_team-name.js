import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import CreateAccountTeamName from '../components/on-boarding/CreateAccountTeamName.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  setRegisterTeamName: actions.account.setRegisterTeamName
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
