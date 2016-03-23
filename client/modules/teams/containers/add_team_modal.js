import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import AddTeamModal from '../components/AddTeamModal.jsx';
import UsersSearchSource from '/client/usersSearchSource';

const depsMapper = (context, actions) => ({
  context: () => context,
  search: actions.search.setAllUsersSearchText,
  setAllUsersSearchText: actions.search.setAllUsersSearchText
});

export const composer = ({context, setAllUsersSearchText}, onData) => {
  const {LocalState} = context();

  const searchText = LocalState.get('searchText.allUsers');
  UsersSearchSource.search(searchText);

  onData(null, {
    searchResults: UsersSearchSource.getData()
  });

  const cleanup = () => setAllUsersSearchText(undefined);
  return cleanup;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AddTeamModal);
