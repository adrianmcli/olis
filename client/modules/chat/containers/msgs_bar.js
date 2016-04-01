import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import ChatContainer from '../components/ChatContainer.jsx';
import R from 'ramda';
import {SubsManager} from 'meteor/meteorhacks:subs-manager';
import {NEW_CONVO_VISIBLE} from '/lib/constants/msgs';

const MsgSubs = new SubsManager();

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  addMsg: actions.msgs.add,
  loadMoreOlder: actions.msgs.loadMoreOlder,
  loadMoreOlderSearch: actions.msgs.loadMoreOlderSearch,
  loadMoreNewerSearch: actions.msgs.loadMoreNewerSearch,
  translate: actions.translation.get,
  incrementNumVisibleMsgs: actions.msgs.incrementNumVisible
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections, FlowRouter} = context();
  const convoId = FlowRouter.getParam('convoId');
  const msgId = FlowRouter.getParam('msgId');

  // If you only see loading, make sure you added the collection to the index
  const userId = Meteor.userId();
  const user = Meteor.user();
  const langCode = user ? user.translationLangCode : undefined;

  if (convoId && !msgId) {
    _doRegularConvo(LocalState, convoId, langCode, Collections, Meteor, onData, userId);
  }
  else if (convoId && msgId) {
    const oldestMsgId = LocalState.get(`convo.${convoId}.oldestMsgId`);
    const newestMsgId = LocalState.get(`convo.${convoId}.newestMsgId`);

    const subSearchMsgs = Meteor.subscribe('msgs.searchResult', {msgId, oldestMsgId, newestMsgId});
    const subTrans = _subTrans(LocalState, langCode, convoId);

    if (subSearchMsgs.ready() && subTrans.ready()) {
      const msgs = _fetchMsgs(Collections.SearchMessages, convoId);
      const convo = Collections.Convos.findOne(convoId);
      const {convoUsers, title, usersListString} = _fetchConvoInfo(convo, Meteor);
      const translations = _fetchTranslations(Collections, convoId);
      const needsCentering = !oldestMsgId && !newestMsgId; // It's a new search, so center it

      onData(null, {
        convo,
        searchMsgId: msgId,
        msgs,
        userId,
        convoUsers,
        title,
        usersListString,
        langCode,
        translations,
        needsCentering
      });
    }
  }
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(ChatContainer);

function log(convo, LocalState, isNewConvo, allMsgs, msgsAfterThisOne, numVisibleMsgs) {
  console.log(`-----------`);
  console.log(`convoId from Router ${convo._id} ${convo.name}`);
  console.log(`${LocalState.get(`${convo._id}.msgs.visibleAfterDate`)}`);
  console.log(`isNewConvo ${isNewConvo}`);
  console.log(`allMsgs[0] ${allMsgs[0] ? allMsgs[0].text : ''}`);
  console.log(`msgsAfterThisOne ${msgsAfterThisOne.text}`);
  console.log(`allMsgs ${allMsgs.length}, numVisibleMsgs ${numVisibleMsgs}`);
}

function _fetchMsgs(MsgCol, convoId) {
  const options = {sort: [ [ 'createdAt', 'asc' ] ]};
  return MsgCol.find({convoId}, options).fetch();
}

function _subTrans(LocalState, langCode, convoId) {
  const msgIds = LocalState.get('translation.msgIds') ? LocalState.get('translation.msgIds') : [];
  return MsgSubs.subscribe('translations.list', {msgIds, convoId});
}

function _fetchTranslations(Collections, convoId) {
  const transArr = Collections.Translations.find({convoId}).fetch();
  return R.zipObj(transArr.map(item => item.msgId), transArr);
}

function _fetchConvoInfo(convo, Meteor) {
  if (convo) {
    const convoUsersArr = Meteor.users.find({_id: {$in: convo.userIds}}).fetch();
    const convoUsers = R.zipObj(convoUsersArr.map(item => item._id), convoUsersArr);

    const usersListString = convoUsersArr.reduce((prev, curr, index) => {
      if (index > 0) { return `${prev}, ${curr.username}`; }
      return `${curr.username}`;
    }, '');

    return {convoUsers, usersListString};
  }
  return {convoUsers: {}, usersListString: null};
}

function _doRegularConvo(LocalState, convoId, langCode, Collections, Meteor, onData, userId) {
  const currentNumMsgs = LocalState.get(`loadMore.convo.${convoId}.numMsgs`) ?
    LocalState.get(`loadMore.convo.${convoId}.numMsgs`) : 0;

  const sub = MsgSubs.subscribe('msgs.list', {convoId, currentNumMsgs});
  const subTrans = _subTrans(LocalState, langCode, convoId);

  if (sub.ready() && subTrans.ready()) {
    const allMsgs = _fetchMsgs(Collections.Messages, convoId);

    // Filter msgs to save render time
    if (!R.isEmpty(allMsgs)) {
      const numVisibleMsgs = LocalState.get(`${convoId}.msgs.numVisible`) ?
        LocalState.get(`${convoId}.msgs.numVisible`) : NEW_CONVO_VISIBLE;
      const msgsAfterThisOne = allMsgs[allMsgs.length - numVisibleMsgs] ?
        allMsgs[allMsgs.length - numVisibleMsgs] : allMsgs[0];

      const isNewConvo = !LocalState.get(`${convoId}.msgs.visibleAfterDate`);
      if (isNewConvo) {
        LocalState.set(`${convoId}.msgs.visibleAfterDate`, msgsAfterThisOne.createdAt);
      } else {
        const visibleAfterDate = LocalState.get(`${convoId}.msgs.visibleAfterDate`);
        const xMsgFromBotIsNewer = msgsAfterThisOne.createdAt >= visibleAfterDate;
        if (xMsgFromBotIsNewer) {
          const msgs = R.filter(msg => msg.createdAt >= visibleAfterDate, allMsgs);
          const convo = Collections.Convos.findOne(convoId);
          const {convoUsers, usersListString} = _fetchConvoInfo(convo, Meteor);
          const title = convo.getName(userId, convoUsers);
          const translations = _fetchTranslations(Collections, convoId);

          // console.log(`${msgs.length} msgs rendered after ${visibleAfterDate}`);
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
        } else {
          LocalState.set(`${convoId}.msgs.visibleAfterDate`, msgsAfterThisOne.createdAt);
        }
      }
      // log(convo, LocalState, isNewConvo, allMsgs, msgsAfterThisOne, numVisibleMsgs);
    }
    else {
      const convo = Collections.Convos.findOne(convoId);
      const {convoUsers, usersListString} = _fetchConvoInfo(convo, Meteor);
      const title = convo.getName(userId, convoUsers);
      const translations = _fetchTranslations(Collections, convoId);
      onData(null, {
        convo,
        msgs: [],
        userId,
        convoUsers,
        title,
        usersListString,
        langCode,
        translations
      });
    }
  }
}
