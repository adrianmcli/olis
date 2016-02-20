import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import UsersBar from '../components/users_bar.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  addToTeam: actions.teams.addMembers,
  addToConvo: actions.convos.addMembers
});

export const composer = ({context}, onData) => {
  const {Meteor} = context();

  if (Meteor.subscribe('users.list').ready()) {
    const users = Meteor.users.find().fetch();
    onData(null, {users});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UsersBar);
