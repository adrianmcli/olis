import React from 'react';

import OnboardingWrapper from './OnboardingWrapper.jsx';

import CreateAccountEmail from '../../containers/register_email';
import CreateAccountUsername from './CreateAccountUsername.jsx';
import CreateAccountTeamName from './CreateAccountTeamName.jsx';
import CreateAccountInviteTeammates from './CreateAccountInviteTeammates.jsx';

export default class Registration extends React.Component {

  render() {
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
    return <OnboardingWrapper dataSrc={data} currentStep={0}/>;
  }
}
