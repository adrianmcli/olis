import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Sidebar from '../components/Sidebar.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  addConvo: actions.convos.add,
  selectConvo: actions.convos.select
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections} = context();
  const teamId = LocalState.get('teamId');

  // If you only see loading, make sure you added the collection to the index
  let convos = [];
  let convoId = null;
  let lastTimeInConvo = null;

  if (teamId) {
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
    lastTimeInConvo
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Sidebar);
