import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
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
    const selector = { score: { $exists: true } };
    const options = { sort: { score: -1 } };

    const msgs = Collections.Messages.find(selector, options).fetch();
    const convos = Collections.Convos.find(selector, options).fetch();
    const users = Meteor.users.find(selector, options).fetch();

    onData(null, {
      msgs, convos, users
    });
  }
  else {
    onData(null, {});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(HeaderSearch);
