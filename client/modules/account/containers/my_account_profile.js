import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import MyAccountProfile from '../components/MyAccountProfile.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  uploadImage: actions.images.add
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
)(MyAccountProfile);
