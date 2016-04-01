import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import CreateAcccountEmail from '../components/onboarding/CreateAccountEmail.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  setRegisterEmail: actions.account.setRegisterEmail,
  go: (path) => context.FlowRouter.go(path)
});

export const composer = ({context}, onData) => {
  const {LocalState} = context();
  const registerEmail = LocalState.get('register.email');
  onData(null, {
    registerEmail
  });
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(CreateAcccountEmail);
