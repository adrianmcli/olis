import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import ChatContainer from '../components/ChatContainer.jsx';
import R from 'ramda';
import {SubsManager} from 'meteor/meteorhacks:subs-manager';

const MsgSubs = new SubsManager();

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  addMsg: actions.msgs.add,
  loadMore: actions.msgs.loadMore
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections, FlowRouter} = context();
  const convoId = FlowRouter.getParam('convoId');

  // If you only see loading, make sure you added the collection to the index
  let msgs = [];
  const userId = Meteor.userId();
  const user = Meteor.user();
  const langCode = user ? user.translationLangCode : undefined;

  let convoUsers = {};
  let translations = {};
  let title = null;
  let usersListString = null;
  let convo;

  if (convoId) {
    const currentNumMsgs = LocalState.get('loadMore.convoNumMsgs') ?
      LocalState.get('loadMore.convoNumMsgs') : 0;

    const options = {sort: [ [ 'createdAt', 'asc' ] ]};
    if (currentNumMsgs > 0) {
      msgs = Collections.Messages.find({convoId}, options).fetch();

      convo = Collections.Convos.findOne(convoId);
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
    if (MsgSubs.subscribe('msgs.list', {convoId, currentNumMsgs}).ready()) {
      msgs = Collections.Messages.find({convoId}, options).fetch();

      convo = Collections.Convos.findOne(convoId);
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

    if (MsgSubs.subscribe('translations.list', {convoId}).ready()) {
      const transArr = Collections.Translations.find({convoId}).fetch();
      translations = R.zipObj(transArr.map(item => item.msgId), transArr);
    }
  }

  onData(null, {
    convo,
    msgs,
    userId,
    convoUsers,
    title,
    usersListString,
    langCode,
    translations
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ChatContainer);
