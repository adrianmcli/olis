import React from 'react';
import R from 'ramda';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {buildRegExp} from '/client/modules/core/libs/search';
import ChatMembers from '../components/ChatMenuItems/ChatMembers.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  searchConvoUsers: actions.search['searchText.convoUsers.set'],
  showUserInfo: actions.convos.setUserIdShown,
  removeFromConvo: actions.convos.removeMember
  // makeUserTeamAdmin: actions.convos.makeUserAdmin,
  // removeUserFromTeam: actions.convos.removeUser
});

export const composer = ({context, searchConvoUsers, showUserInfo}, onData) => {
  const {Meteor, LocalState, Collections, FlowRouter} = context();

  const teamId = FlowRouter.getParam('teamId');
  const convoId = FlowRouter.getParam('convoId');
  const team = Collections.Teams.findOne(teamId);
  const convo = Collections.Convos.findOne(convoId);
  if (teamId && convoId && convo && team) {

    const searchText = LocalState.get('searchText.convoUsers');

    const selector = () => {
      const base = { _id: { $in: convo.userIds } };
      if (searchText) {
        const regExp = buildRegExp(searchText);
        return R.merge(base, {
          $or: [
            {username: regExp},
            {'emails.address': regExp}
          ]
        });
      }
      return base;
    };
    // selector[`roles.${teamId}`] = {$exists: true};
    const options = {sort: [ [ 'username', 'asc' ] ]};

    const convoUsersSearchResult = Meteor.users.find(selector(), options).fetch();
    const userIdShown = LocalState.get('convoDirectory.userIdShown');
    const userShown = Meteor.users.findOne(userIdShown);

    onData(null, {
      team,
      convoUsersSearchResult,
      userShown,
      isAdmin: team.isUserAdmin(Meteor.userId())
    });
  }

  const cleanup = () => {
    console.log('chat_members cleanup'); // Not sure why this is called when stuff is updated
    searchConvoUsers(undefined);
    showUserInfo(undefined);
  };
  // return cleanup;
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(ChatMembers);
