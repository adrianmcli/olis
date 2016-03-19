import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {buildRegExp} from '/client/modules/core/libs/search';
import R from 'ramda';
import TeamDirectory from '../components/HeaderMenuItems/TeamDirectory.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  searchTeamUsers: actions.search.setTeamUsersSearchText
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections, FlowRouter} = context();

  const user = Meteor.user();
  let teamUsersSearchResult = [];

  const teamId = FlowRouter.getParam('teamId');
  if (teamId) {
    if (Meteor.subscribe('teams.single', {teamId}).ready()) {
      const team = Collections.Teams.findOne(teamId);
      const searchText = LocalState.get('teamUsersSearchText');

      let selector = {};
      if (searchText) {
        const regExp = buildRegExp(searchText);
        selector = {$or: [
          {username: regExp},
          {'emails.address': regExp}
        ]};
      }
      selector[`roles.${teamId}`] = {$exists: true};

      const excludeFromSearchResult = [ user._id ];
      teamUsersSearchResult = R.filter(other => !R.contains(other._id, excludeFromSearchResult),
        Meteor.users.find(selector).fetch());

      onData(null, {
        teamName: team.name,
        teamUsersSearchResult
      });
    }
  }
  else {
    onData(null, {
      teamName: '',
      teamUsersSearchResult
    });
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(TeamDirectory);
