import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {buildRegExp} from '/client/modules/core/libs/search';
import ChatMembers from '../components/ChatMenuItems/ChatMembers.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  searchConvoUsers: actions.search['searchText.convoUsers.set'],
  showUserInfo: actions.convos.setUserIdShown,
  // makeUserTeamAdmin: actions.convos.makeUserAdmin,
  // removeUserFromTeam: actions.convos.removeUser
});

export const composer = ({context, searchConvoUsers, showUserInfo}, onData) => {
  const {Meteor, LocalState, Collections, FlowRouter} = context();

  const teamId = FlowRouter.getParam('teamId');
  const convoId = FlowRouter.getParam('convoId');
  const convo = Collections.Convos.findOne(convoId);
  if (teamId && convoId && convo) {

    const searchText = LocalState.get('searchText.teamUsers');

    let selector = {};
    if (searchText) {
      const regExp = buildRegExp(searchText);
      selector = {$or: [
        {username: regExp},
        {'emails.address': regExp}
      ]};
    }
    // selector[`roles.${teamId}`] = {$exists: true};
    const options = {sort: [ [ 'username', 'asc' ] ]};

    const convoUsersSearchResult = Meteor.users.find(selector, options).fetch();
    const userIdShown = LocalState.get('convoDirectory.userIdShown');
    const userShown = Meteor.users.findOne(userIdShown);

    onData(null, {
      convo,
      convoUsersSearchResult,
      userShown,
      isAdmin: convo.isUserAdmin(Meteor.userId())
    });
  }

  const cleanup = () => {
    console.log('chat_members cleanup'); // Not sure why this is called when stuff is updated
    searchConvoUsers(undefined);
    showUserInfo(undefined);
  };
  return cleanup;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ChatMembers);
