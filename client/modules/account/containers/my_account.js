import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import MyAccount from '../components/MyAccount.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  goToChat: actions.msgs.goToChat,
  uploadImage: actions.images.add,
  setUsername: actions.account.setUsername,
  changePassword: actions.account.changePassword
});

export const composer = ({context}, onData) => {
  const {Meteor} = context();
  const user = Meteor.user();
  if (user) {
    onData(null, {
      username: user.username,
      profileImageUrl: user.profileImageUrl ? user.profileImageUrl : null
    });
  }
  else { onData(null, {}); }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(MyAccount);
