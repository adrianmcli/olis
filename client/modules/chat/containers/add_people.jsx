import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import AddPeopleToConvo from '../components/ChatMenuItems/AddPeopleToConvo.jsx';
import {buildRegExp} from '/client/modules/core/libs/search';
import R from 'ramda';

const depsMapper = (context, actions) => ({
  context: () => context,
  addUsersToConvo: actions.convos.addMembers,
  searchTeamUsers: actions.search['searchText.teamUsers.set'],
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
  const convoId = FlowRouter.getParam('convoId');
  if (teamId && convoId) {
    if (Meteor.subscribe('teams.single', {teamId}).ready()) {
      const team = Collections.Teams.findOne(teamId);
      const convo = Collections.Convos.findOne(convoId);
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
      const excludeFromSearchResult = [ user._id, ...userIdsToAdd, ...convo.userIds ];
      teamUsersSearchResult = R.filter(other => !R.contains(other._id, excludeFromSearchResult),
        foundUsers);

      const usersToAdd = Meteor.users.find({_id: {$in: userIdsToAdd}}).fetch();

      onData(null, {
        team,
        teamUsersSearchResult,
        usersToAdd,
        convoId
      });
    }
  }
};

export default composeAll(
  composeWithTracker(composer, () => <div></div>),
  useDeps(depsMapper)
)(AddPeopleToConvo);
