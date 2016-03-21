import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import HeaderNewConversation from '../components/HeaderNewConversation.jsx';
import {buildRegExp} from '/client/modules/core/libs/search';
import R from 'ramda';

const depsMapper = (context, actions) => ({
  context: () => context,
  addConvo: actions.convos.add,
  searchTeamUsers: actions.search.setTeamUsersSearchText,
  addUserId: actions.convos['newConvo.addUserId'],
  removeUserId: actions.convos['newConvo.removeUserId'],
  clearAddedUserIds: actions.convos['newConvo.clearAddedUserIds'],
  clearTeamUsersSearchText: actions.search['searchText.teamUsers.clear']
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections, FlowRouter} = context();

  const user = Meteor.user();
  let teamUsersSearchResult = [];
  const userIdsToAdd = LocalState.get('newConvo.userIdsToAdd') ?
    LocalState.get('newConvo.userIdsToAdd') : [];

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

      const foundUsers = Meteor.users.find(selector).fetch();
      const excludeFromSearchResult = [ user._id, ...userIdsToAdd ];
      teamUsersSearchResult = R.filter(other => !R.contains(other._id, excludeFromSearchResult),
        foundUsers);

      const usersToAdd = Meteor.users.find({_id: {$in: userIdsToAdd}}).fetch();

      onData(null, {
        team,
        teamUsersSearchResult,
        usersToAdd
      });
    }
  }

  // Don't return a cleanup function here, since it's a dialog and is always mounted, but just not visible.
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(HeaderNewConversation);
