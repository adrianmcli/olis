import {useDeps, composeAll} from 'mantra-core';
import ChatMessageItem from '../components/ChatMessageItem.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  translate: actions.translation.get
});

export default composeAll(
  useDeps(depsMapper)
)(ChatMessageItem);
