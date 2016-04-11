import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import CreateAccountUsername from '../components/onboarding/CreateAccountUsername.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  setRegisterUsername: actions.account.setRegisterUsername
});

export const composer = ({context}, onData) => {
  const {LocalState} = context();
  const registerUsername = LocalState.get('register.username');
  onData(null, {
    registerUsername
  });
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(CreateAccountUsername);
