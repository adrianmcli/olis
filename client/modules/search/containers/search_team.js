import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import HeaderSearch from '../components/HeaderSearch.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  doSearch: actions.search.team,
  clearSearchResults: actions.search['team.clearResults']
});

export const composer = ({context, clearSearchResults}, onData) => {
  const {LocalState, FlowRouter} = context();
  const teamId = FlowRouter.getParam('teamId');
  onData(null, {
    results: LocalState.get(`search.team.${teamId}.results`)
  });

  return () => clearSearchResults();
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(HeaderSearch);
