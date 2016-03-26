import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import CreateAccountInviteTeammates from
  '../components/onboarding/CreateAccountInviteTeammates.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  setRegisterInviteEmails: actions.account.setRegisterInviteEmails,
  finishRegistration: actions.account.finishRegistration,
  addMoreInvites: actions.account.addMoreInvites,
  validateEmail: actions.account.validateEmail,
});

export const composer = ({context}, onData) => {
  const {LocalState} = context();
  const inviteEmails = LocalState.get('register.inviteEmails');
  const numInviteInputs = LocalState.get('register.numInviteInputs');
  onData(null, {
    inviteEmails, numInviteInputs
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(CreateAccountInviteTeammates);
