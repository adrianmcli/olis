import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import ChatContainer from '../components/ChatContainer.jsx';
import R from 'ramda';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  addMsg: actions.msgs.add
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections} = context();
  const convoId = LocalState.get('convoId');

  // If you only see loading, make sure you added the collection to the index
  let msgs = [];
  let convoUsers = {};
  if (convoId) {
    if (Meteor.subscribe('msgs.list', {convoId}).ready()) {
      msgs = Collections.Messages.find({convoId}).fetch();
    }

    const convo = Collections.Convos.findOne(convoId);
    if (Meteor.subscribe('users.convo', {convoId}).ready()) {
      if (convo) {
        const convoUsersArr = Meteor.users.find({_id: {$in: convo.userIds}}).fetch();
        convoUsers = R.zipObj(convoUsersArr.map(item => item._id), convoUsersArr);
      }
    }
  }

  onData(null, {
    msgs,
    userId: Meteor.userId(),
    convoUsers
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ChatContainer);
