import React from 'react';

import ResetPassword from '../../containers/reset_password';
import OnboardingWrapper from './OnboardingWrapper';

export default class ResetPasswordOnboard extends React.Component {
  render() {
    const {currentStep, token} = this.props;
    const data = [
      {
        title: 'Your Password',
        description: 'Choose a password',
        content: <ResetPassword key={0} token={token} />,
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
        firstTaskDesc="Receive email with reset password link!"
      />
    );
  }
}

ResetPasswordOnboard.defaultProps = {
  currentStep: 0
};
