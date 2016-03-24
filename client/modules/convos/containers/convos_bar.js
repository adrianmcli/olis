import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Sidebar from '../components/Sidebar.jsx';
import R from 'ramda';

const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  selectConvo: actions.convos.select
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections, FlowRouter} = context();
  const teamId = FlowRouter.getParam('teamId');

  // If you only see loading, make sure you added the collection to the index
  let convos = [];
  let convoId;
  let lastTimeInConvo;
  let teamUsers = [];

  const user = Meteor.user();

  if (teamId) {
    Meteor.subscribe('users.team', {teamId});
    Meteor.subscribe('convos.list', {teamId});

    const teamSelector = {
      [`roles.${teamId}`]: {$exists: true}
    };
    const teamUsersArr = Meteor.users.find(teamSelector).fetch();
    teamUsers = R.zipObj(teamUsersArr.map(teamUser => teamUser._id), teamUsersArr);

    const selector = {
      userIds: Meteor.userId(),
      teamId
    };
    const options = {sort: [ [ 'updatedAt', 'desc' ] ]};

    convos = Collections.Convos.find(selector, options).fetch();
    convoId = FlowRouter.getParam('convoId');
    lastTimeInConvo = Meteor.user().lastTimeInConvo;

  }
  onData(null, {
    convos,
    convoId,
    lastTimeInConvo,
    teamUsers,
    user
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Sidebar);
