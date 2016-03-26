import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import InviteeOnboard from '../components/onboarding/InviteeOnboard.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export const composer = ({context, token}, onData) => {
  const {FlowRouter} = context();

  const path = FlowRouter.current().path;
  let currentStep = 0;
  switch (path) {
    case `/invite/username/${token}`:
      currentStep = 0;
      break;
    case `/invite/password/${token}`:
      currentStep = 1;
      break;
  }

  onData(null, {
    currentStep
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(InviteeOnboard);
