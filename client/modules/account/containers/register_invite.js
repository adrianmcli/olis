import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import RegisterInvite from '../components/RegisterInvite.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  setRegisterInviteEmails: actions.account.setRegisterInviteEmails,
  skipInvites: actions.account.skipInvites,
  addMoreInvites: actions.account.addMoreInvites
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
)(RegisterInvite);
