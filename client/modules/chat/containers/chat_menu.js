import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import ChatMenu from '../components/ChatMenu.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  removeConvo: actions.convos.remove
});

export const composer = ({context}, onData) => {
  const {FlowRouter} = context();
  const convoId = FlowRouter.getParam('convoId');
  onData(null, {convoId});
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(ChatMenu);
