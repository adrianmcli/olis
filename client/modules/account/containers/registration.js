import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Registration from '../components/onboarding/Registration.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export const composer = ({context}, onData) => {
  const {FlowRouter} = context();

  const path = FlowRouter.current().path;
  let currentStep = 0;
  switch (path) {
    case '/register/email':
      currentStep = 0;
      break;
    case '/register/displayName':
      currentStep = 1;
      break;
    case '/register/password':
      currentStep = 2;
      break;
    case '/register/team-name':
      currentStep = 3;
      break;
    case '/register/invite':
      currentStep = 4;
      break;
  }

  onData(null, {
    currentStep
  });
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(Registration);
