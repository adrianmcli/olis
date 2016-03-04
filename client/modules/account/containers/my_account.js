import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import MyAccount from '../components/MyAccount.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  goToChat: actions.msgs.goToChat,
  uploadImage: actions.images.add,
  setUsername: actions.account.setUsername,
  changePassword: actions.account.changePassword,
  setEmail: actions.account.setEmail
});

export const composer = ({context}, onData) => {
  const {Meteor} = context();
  const user = Meteor.user();
  if (user) {
    const email = user.emails ? user.emails[0] ? user.emails[0].address : null : null;

    onData(null, {
      username: user.username,
      profileImageUrl: user.profileImageUrl ? user.profileImageUrl : null,
      email
    });
  }
  else { onData(null, {}); }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(MyAccount);
