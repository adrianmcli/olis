import React from 'react';

import CreateAccountUsername from '../../containers/register_username';
import CreateAccountPassword from '../../containers/invite_password';

import OnboardingWrapper from './OnboardingWrapper.jsx';

export default class InviteeOnboard extends React.Component {
  render() {
    const {currentStep, token} = this.props;
    const data = [
      {
        title: 'Your User Name',
        description: 'Choose a user name',
        content: <CreateAccountUsername key={0} nextPath={`/invite/password/${token}`} />,
      },
      {
        title: 'Your Password',
        description: 'Choose a password',
        content: <CreateAccountPassword key={1} token={token} />,
      },
      {
        title: 'Get Ready',
        description: 'Start using Olis!',
        content: <div>Confirm and prepare to launch</div>,
      },
    ];
    return (
      <OnboardingWrapper
        dataSrc={data}
        currentStep={currentStep}
        firstTaskDesc="Be invited!"
      />
    );
  }
}

InviteeOnboard.defaultProps = {
  currentStep: 0
};
