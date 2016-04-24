import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Sidebar from '../components/Sidebar.jsx';
import R from 'ramda';
import {SubsManager} from 'meteor/meteorhacks:subs-manager';

const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  selectConvo: actions.convos.select,
});

const ConvoSubs = new SubsManager();

export const composer = ({context}, onData) => {
  const {Meteor, Collections, FlowRouter, LocalState} = context();
  const teamId = FlowRouter.getParam('teamId');

  const user = Meteor.user();

  if (teamId) {
    const subUsers = Meteor.subscribe('users.team', {teamId});
    const subConvos = ConvoSubs.subscribe('convos.list', {teamId});

    if (subUsers.ready() && subConvos.ready()) {
      const teamSelector = {
        [`roles.${teamId}`]: {$exists: true},
      };
      const teamUsersArr = Meteor.users.find(teamSelector).fetch();
      const teamUsers = R.zipObj(teamUsersArr.map(teamUser => teamUser._id), teamUsersArr);

      const selector = {
        userIds: Meteor.userId(),
        teamId,
      };
      const options = {sort: [ [ 'updatedAt', 'desc' ] ]};

      const convos = Collections.Convos.find(selector, options).fetch();
      const convoId = FlowRouter.getParam('convoId');
      const lastTimeInConvo = Meteor.user().lastTimeInConvo;
      const windowIsFocused = LocalState.get('window.isFocused');

      onData(null, {
        convos,
        convoId,
        lastTimeInConvo,
        teamUsers,
        user,
        teamUsersArr,
        windowIsFocused,
      });
    }
  }
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(Sidebar);
