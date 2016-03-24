import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {depsMapper, composer} from './header_new_conversation';
import NoConvoSelected from '../components/NoConvoSelected.jsx';

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NoConvoSelected);
