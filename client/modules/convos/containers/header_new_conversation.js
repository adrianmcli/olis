import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import HeaderNewConversation from '../components/HeaderNewConversation.jsx';
import {buildRegExp} from '/client/modules/core/libs/search';
import R from 'ramda';

export const depsMapper = (context, actions) => ({
  context: () => context,
  addConvo: actions.convos.add,
  searchTeamUsers: actions.search['searchText.teamUsers.set'],
  addUserId: actions.convos['newConvo.addUserId'],
  removeUserId: actions.convos['newConvo.removeUserId'],
  setNewConvoName: actions.convos['newConvo.setName'],
  clearAddedUserIds: actions.convos['newConvo.clearAddedUserIds']
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections, FlowRouter} = context();

  const user = Meteor.user();
  let teamUsersSearchResult = [];
  const userIdsToAdd = LocalState.get('newConvo.userIdsToAdd') ?
    LocalState.get('newConvo.userIdsToAdd') : [];

  const newConvoName = LocalState.get('newConvo.name') ?
    LocalState.get('newConvo.name') : '';

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
        usersToAdd,
        newConvoName
      });
    }
  }

  // Don't return a cleanup function here, since it's a dialog and is always mounted, but just not visible.
  // return () => console.log('header_new_conversation cleanup');
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(HeaderNewConversation);
