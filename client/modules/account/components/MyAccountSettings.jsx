import React from 'react';
import R from 'ramda';

import SettingsCard from '/client/modules/core/components/SettingsCard.jsx';
import TextField from 'material-ui/lib/text-field';

import TranslationSettings from './TranslationSettings.jsx';

export default class MyAccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorTextUsername: false
    };
  }


  handleUsernameTextChange() {
    const username = this.username.getValue();
    if (R.isEmpty(username)) {
      this.setState({showErrorTextUsername: true});
    }
    else {
      this.setState({showErrorTextUsername: false});
    }
  }

  submitUsername() {
    const {setUsername} = this.props;
    const username = this.username.getValue();
    setUsername(username);
  }

  render() {
    const {
      username
    } = this.props;
    return (
      <div>
        <SettingsCard
          title="Change Username"
          subtitle="This is the name that other users will see."
          submitButtonText="Change Username"
          handleSubmit={this.submitUsername.bind(this)}
        >
          <p>Your current username is: </p>
          <TextField
            defaultValue={username}
            hintText="Choose a recognizable username"
            floatingLabelText="New Username"
            ref={(ref) => this.username = ref}
            onChange={this.handleUsernameTextChange.bind(this)}
            errorText={this.state.showErrorTextUsername ? 'Enter a non-blank username.' : null}
          />
        </SettingsCard>

        <SettingsCard
          title="Change Password"
          subtitle="This is the password that you use to login."
          resetButtonText="Clear Fields"
          submitButtonText="Change Password"
        >
          <p>If you would like to change your password, you may do so by filling out these three fields:</p>
          <TextField
            floatingLabelText="Old Password"
            type="password"
          /><br/>
          <TextField
            hintText="Something hard to guess!"
            floatingLabelText="New Password"
            type="password"
          /><br/>
          <TextField
            hintText="Type it again"
            floatingLabelText="Confirm New Password"
            type="password"
          />
        </SettingsCard>

        <SettingsCard
          title="Change Email"
          subtitle="This is the email that you will be contacted with."
          submitButtonText="Change Email"
        >
          <p>Your current email is: </p>
          <TextField
            hintText="your_name@example.com"
            floatingLabelText="New Email"
          />
        </SettingsCard>

        <TranslationSettings />

      </div>
    );
  }
}
