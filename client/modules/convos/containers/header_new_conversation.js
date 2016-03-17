import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import HeaderNewConversation from '../components/HeaderNewConversation.jsx';
import {buildRegExp} from '/client/modules/core/libs/search';
import R from 'ramda';

const depsMapper = (context, actions) => ({
  context: () => context,
  addConvo: actions.convos.add,
  searchTeamUsers: actions.search.setTeamUsersSearchText,
  addUserId: actions.convos['newConvo.addUserId'],
  removeUserId: actions.convos['newConvo.removeUserId']
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections, FlowRouter} = context();

  const user = Meteor.user();
  const profileImageUrl = user ? user.profileImageUrl : undefined;
  let teamUsersSearchResult = [];
  const userIdsToAdd = LocalState.get('newConvo.userIdsToAdd') ?
    LocalState.get('newConvo.userIdsToAdd') : [];

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

      const excludeFromSearchResult = [ user._id, ...userIdsToAdd ];
      teamUsersSearchResult = R.filter(other => !R.contains(other._id, excludeFromSearchResult),
        Meteor.users.find(selector).fetch());

      onData(null, {
        profileImageUrl,
        teamName: team.name,
        teamUsersSearchResult,
        userIdsToAdd
      });
    }
  }
  else {
    onData(null, {
      profileImageUrl,
      teamName: '',
      teamUsersSearchResult,
      userIdsToAdd
    });
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(HeaderNewConversation);
