import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import HeaderNewConversation from '../components/HeaderNewConversation.jsx';
import {buildRegExp} from '/client/modules/core/libs/search';
import R from 'ramda';

const depsMapper = (context, actions) => ({
  context: () => context,
  addConvo: actions.convos.add,
  searchTeamUsers: actions.search.setTeamUsersSearchText,
  addUser: actions.convos['newConvo.addUser'],
  removeUser: actions.convos['newConvo.removeUser'],
  clearAddedUsers: actions.convos['newConvo.clearAddedUsers']
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections, FlowRouter} = context();

  const user = Meteor.user();
  let teamUsersSearchResult = [];
  const usersToAdd = LocalState.get('newConvo.usersToAdd') ?
    LocalState.get('newConvo.usersToAdd') : [];

  const teamId = FlowRouter.getParam('teamId');
  if (teamId) {
    if (Meteor.subscribe('teams.single', {teamId}).ready()) {
      const team = Collections.Teams.findOne(teamId);
      const searchText = LocalState.get('searchText.teamUsers');

      let selector = {};
      if (searchText) {
        const regExp = buildRegExp(searchText);
        selector = {$or: [
          {username: regExp},
          {'emails.address': regExp}
        ]};
      }
      selector[`roles.${teamId}`] = {$exists: true};

      const userIdsToAdd = usersToAdd.map(x => x._id);
      const excludeFromSearchResult = [ user._id, ...userIdsToAdd ];
      teamUsersSearchResult = R.filter(other => !R.contains(other._id, excludeFromSearchResult),
        Meteor.users.find(selector).fetch());

      onData(null, {
        teamName: team.name,
        teamUsersSearchResult,
        usersToAdd
      });
    }
  }
  else {
    onData(null, {
      teamName: '',
      teamUsersSearchResult,
      usersToAdd
    });
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(HeaderNewConversation);
