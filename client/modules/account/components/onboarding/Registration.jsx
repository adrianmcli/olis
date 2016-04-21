import React from 'react';

import OnboardingWrapper from './OnboardingWrapper.jsx';

import CreateAccountEmail from '../../containers/register_email';
import CreateAccountUsername from '../../containers/register_username';
import CreateAccountPassword from '../../containers/register_password';
import CreateAccountTeamName from '../../containers/register_team-name';
import CreateAccountInviteTeammates from '../../containers/register_invite';

export default class Registration extends React.Component {
  render() {
    const {currentStep} = this.props;
    const data = [
      {
        title: 'Your Email Address',
        description: 'Enter an email address',
        content: <CreateAccountEmail key={1} nextPath={'/register/displayName'} />,
      },
      {
        title: 'Your Display Name',
        description: 'Choose a display name',
        content: <CreateAccountUsername key={2} nextPath={'/register/password'} />,
      },
      {
        title: 'Your Password',
        description: 'Choose a password',
        content: <CreateAccountPassword key={3} nextPath={'/register/team-name'} />,
      },
      {
        title: 'Your Team',
        description: 'Choose a team name',
        content: <CreateAccountTeamName key={4} nextPath={'/register/invite'} />,
      },
      {
        title: 'Invite Teammates',
        description: 'Invite teammates',
        content: <CreateAccountInviteTeammates key={5} />,
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
Registration.defaultProps = {
  currentStep: 0
};
