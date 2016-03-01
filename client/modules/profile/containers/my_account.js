import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import MyAccount from '../components/MyAccount.jsx';

const depsMapper = (context, actions) => ({
  context: () => context
});

export const composer = ({context}, onData) => {
  onData(null, {});
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(MyAccount);
