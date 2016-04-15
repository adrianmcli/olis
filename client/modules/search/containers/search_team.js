import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import HeaderSearch from '../components/HeaderSearch.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  search: actions.search['searchText.team.all.set'],
  onClickConvo: actions.search['select.convo'],
  onClickUser: actions.search['select.user'],
  onClickMsg: actions.search['select.msg']
});

export const composer = ({context, search}, onData) => {
  const {Meteor, FlowRouter, LocalState, Collections} = context();
  const teamId = FlowRouter.getParam('teamId');
  const text = LocalState.get('searchText.team.all') ? LocalState.get('searchText.team.all') : '';

  if (teamId) {
    const subSearch = Meteor.subscribe('search.results', {teamId, text});
    const subTeam = Meteor.subscribe('teams.single', {teamId});
    if (subSearch.ready() && subTeam.ready()) {
      const selector = { score: { $exists: true } };
      const options = { sort: { score: -1 } };

      const resultMsgs = Collections.SearchMessages.find(selector, options).fetch();
      const resultConvos = Collections.Convos.find(selector, options).fetch();
      const resultUsers = Meteor.users.find(selector, options).fetch();

      const team = Collections.Teams.findOne(teamId);
      const teamName = team.name;

      onData(null, {
        msgs: resultMsgs, convos: resultConvos, users: resultUsers, text,
        teamName
      });
    }
    else {
      onData(null, {waiting: true});
    }
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(HeaderSearch);
