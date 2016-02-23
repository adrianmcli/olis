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
  let title = null;
  let usersListString = null;

  if (convoId) {
    if (Meteor.subscribe('msgs.list', {convoId}).ready()) {

      const options = {sort: [ [ 'createdAt', 'asc' ] ]};
      msgs = Collections.Messages.find({convoId}, options).fetch();
    }

    const convo = Collections.Convos.findOne(convoId);
    if (Meteor.subscribe('users.convo', {convoId}).ready()) {
      if (convo) {
        const convoUsersArr = Meteor.users.find({_id: {$in: convo.userIds}}).fetch();
        convoUsers = R.zipObj(convoUsersArr.map(item => item._id), convoUsersArr);
        title = convo.name;

        usersListString = convoUsersArr.reduce((prev, curr, index) => {
          if (index > 0) { return `${prev}, ${curr.username}`; }
          return `${curr.username}`;
        }, '');
      }
    }
  }

  onData(null, {
    msgs,
    userId: Meteor.userId(),
    convoUsers,
    title,
    usersListString
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ChatContainer);
