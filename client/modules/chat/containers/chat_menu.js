import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import ChatMenu from '../components/ChatMenu.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  removeConvo: actions.convos.remove,
  leaveConvo: actions.convos.leave
});

export const composer = ({context}, onData) => {
  const {Meteor, FlowRouter, Collections} = context();
  const teamId = FlowRouter.getParam('teamId');
  const convoId = FlowRouter.getParam('convoId');

  const team = Collections.Teams.findOne(teamId);
  const isAdmin = () => {
    if (team) { return team.isUserAdmin(Meteor.userId()); }
    return false;
  };

  onData(null, {
    convoId,
    isAdmin: isAdmin()
  });
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(ChatMenu);
