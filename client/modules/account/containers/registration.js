import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Registration from '../components/onboarding/Registration.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export const composer = ({context}, onData) => {
  const {LocalState} = context();
  onData(null, {
    currentStep: LocalState.get('register.step')
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Registration);
