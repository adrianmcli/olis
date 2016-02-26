import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import AddTeamModal from '../components/AddTeamModal.jsx';
import UsersSearchSource from '/client/usersSearchSource';

const depsMapper = (context, actions) => ({
  context: () => context,
  search: actions.search.setAllUsersSearchText,
  clearSearchTexts: actions.search.clearSearchTexts
});

export const composer = ({context, clearSearchTexts}, onData) => {
  const {LocalState} = context();

  const searchText = LocalState.get('allUsersSearchText');
  UsersSearchSource.search(searchText);

  onData(null, {
    searchResults: UsersSearchSource.getData()
  });

  const cleanup = () => clearSearchTexts();
  return cleanup;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AddTeamModal);
