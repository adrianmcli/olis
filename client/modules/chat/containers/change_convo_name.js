import {useDeps, composeAll} from 'mantra-core';
import ChangeConvoName from '../components/ChatMenuItems/ChangeConvoName.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  changeConvoName: actions.convos.changeName
});

export default composeAll(
  useDeps(depsMapper)
)(ChangeConvoName);
