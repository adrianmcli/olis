import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import CreateAccountPassword from '../components/onboarding/CreateAccountPassword';

export const depsMapper = (context, actions) => ({
  context: () => context,
  resetPassword: actions.account.resetPassword,
  setRegisterPassword: actions.account.setRegisterPassword
});


export const composer = ({context}, onData) => {
  const {LocalState} = context();
  const registerPassword = LocalState.get('register.password');
  onData(null, {
    registerPassword
  });
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(CreateAccountPassword);
