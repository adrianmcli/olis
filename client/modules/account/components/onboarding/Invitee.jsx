import React from 'react';

import OnboardingWrapper from './OnboardingWrapper.jsx';

export default class Invitee extends React.Component {
  render() {
    const {currentStep} = this.props;
    const data = [
      {
        title: 'Your User Name',
        description: 'Choose a user name',
        content: <CreateAccountUsername key={0} />,
      },
      {
        title: 'Your Password',
        description: 'Choose a password',
        content: <CreateAccountPassword key={1} />,
      },
      {
        title: 'Get Ready',
        description: 'Start using Olis!',
        content: <div>Confirm and prepare to launch</div>,
      },
    ];
    return <OnboardingWrapper dataSrc={data} currentStep={currentStep}/>;
  }
}

Invitee.defaultProps = {
  currentStep: 0
};
