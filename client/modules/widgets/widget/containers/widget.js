import {useDeps, composeAll} from 'mantra-core';
import Widget from '../components/Widget.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  update: actions.widgets.update
});

export default composeAll(
  useDeps(depsMapper)
)(Widget);
