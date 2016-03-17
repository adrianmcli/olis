import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import HeaderNewConversation from '../components/HeaderNewConversation.jsx';
import {buildRegExp} from '/client/modules/core/libs/search';
import R from 'ramda';

const depsMapper = (context, actions) => ({
  context: () => context,
  addConvo: actions.convos.add,
  searchTeamUsers: actions.search.setTeamUsersSearchText
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections, FlowRouter} = context();

  const user = Meteor.user();
  const profileImageUrl = user ? user.profileImageUrl : undefined;
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
      teamUsersSearchResult = R.filter(other => other._id !== user._id,
        Meteor.users.find(selector).fetch());

      onData(null, {
        profileImageUrl,
        teamName: team.name,
        teamUsersSearchResult
      });
    }
  }
  else {
    onData(null, {
      profileImageUrl,
      teamName: '',
      teamUsersSearchResult
    });
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(HeaderNewConversation);
