import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Sidebar from '../components/Sidebar.jsx';
import {buildRegExp} from '/client/modules/core/libs/search';
import R from 'ramda';

const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  addConvo: actions.convos.add,
  selectConvo: actions.convos.select,
  searchTeamUsers: actions.search.setTeamUsersSearchText
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections} = context();
  const teamId = LocalState.get('teamId');

  // If you only see loading, make sure you added the collection to the index
  let convos = [];
  let convoId;
  let lastTimeInConvo;
  let teamSearchResultUsers = [];
  let teamName;
  let teamUsers = [];

  const user = Meteor.user();

  if (teamId) {
    if (Meteor.subscribe('teams.list').ready()) {
      const team = Collections.Teams.findOne(teamId);
      teamName = team ? team.name : undefined;
    }

    if (Meteor.subscribe('users.team', {teamId}).ready()) {
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
      teamSearchResultUsers = R.filter(other => other._id !== user._id,
        Meteor.users.find(selector).fetch());

      const teamSelector = {
        [`roles.${teamId}`]: {$exists: true}
      };
      const teamUsersArr = Meteor.users.find(teamSelector).fetch();
      teamUsers = R.zipObj(teamUsersArr.map(item => item._id), teamUsersArr);
    }

    if (Meteor.subscribe('convos.list', {teamId}).ready()) {
      const selector = {
        userIds: Meteor.userId(),
        teamId
      };
      const options = {sort: [ [ 'updatedAt', 'desc' ] ]};

      convos = Collections.Convos.find(selector, options).fetch();
      convoId = LocalState.get('convoId');
      lastTimeInConvo = Meteor.user().lastTimeInConvo;
    }
  }
  onData(null, {
    convos,
    convoId,
    lastTimeInConvo,
    teamSearchResultUsers,
    teamUsers,
    teamName,
    user
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Sidebar);
