import React from 'react';

import OnboardingWrapper from './OnboardingWrapper.jsx';

import CreateAccountEmail from '../../containers/register_email';
import CreateAccountUsername from '../../containers/register_username';
import CreateAccountTeamName from '../../containers/register_team-name';
import CreateAccountInviteTeammates from '../../containers/register_invite';

export default class Registration extends React.Component {
  render() {
    const {currentStep} = this.props;
    const data = [
      {
        title: 'Your Email Address',
        description: 'Enter an email address',
        content: <CreateAccountEmail key={1} />,
      },
      {
        title: 'Your User Name',
        description: 'Choose a user name',
        content: <CreateAccountUsername key={2} />,
      },
      {
        title: 'Your Team',
        description: 'Choose a team name',
        content: <CreateAccountTeamName key={3} />,
      },
      {
        title: 'Invite Teammates',
        description: 'Invite teammates',
        content: <CreateAccountInviteTeammates key={4} />,
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
