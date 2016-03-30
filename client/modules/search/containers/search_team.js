import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import R from 'ramda';
import HeaderSearch from '../components/HeaderSearch.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  search: actions.search['searchText.team.all.set']
});

export const composer = ({context, search}, onData) => {
  const {Meteor, FlowRouter, LocalState, Collections} = context();
  const teamId = FlowRouter.getParam('teamId');
  const text = LocalState.get('searchText.team.all') ? LocalState.get('searchText.team.all') : '';

  const subsSearch = Meteor.subscribe('search.results', {teamId, text});
  if (subsSearch.ready()) {
    const msgs = Collections.Messages.find({}, { sort: { score: -1 } }).fetch();

    onData(null, {
      msgs
    });
  }
  else {
    onData(null, {});
  }

  return () => search(undefined);
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(HeaderSearch);
