import React from 'react';
import R from 'ramda';
import EmailValidator from 'email-validator';

import SettingsCard from '/client/modules/core/components/SettingsCard.jsx';
import TextField from 'material-ui/lib/text-field';

import TranslationSettings from './TranslationSettings.jsx';

export default class MyAccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorTextUsername: false,
      showErrorTextNewPassword: false,
      showErrorTextEmail: false,
      username: this.props.username,
      oldPassword: null,
      newPassword1: null,
      newPassword2: null,
      email: this.props.email
    };
  }


  handleUsernameTextChange(e) {
    const username = e.target.value;
    this.setState({username});

    if (R.isEmpty(username)) {
      this.setState({showErrorTextUsername: true});
    }
    else {
      this.setState({showErrorTextUsername: false});
    }
  }

  handleOldPasswordTextChange() {
    const oldPassword = this.oldPassword.getValue();
    this.setState({oldPassword});
  }

  handleNewPasswordTextChange() {
    const pwd1 = this.newPassword1.getValue();
    const pwd2 = this.newPassword2.getValue();

    this.setState({
      newPassword1: pwd1,
      newPassword2: pwd2
    });

    if (pwd1 !== pwd2) { // Other validations...
      this.setState({showErrorTextNewPassword: true});
    }
    else {
      this.setState({showErrorTextNewPassword: false});
    }
  }

  handleEmailTextChange() {
    const email = this.email.getValue();
    this.setState({email});

    if (EmailValidator.validate(email)) {
      this.setState({showErrorTextEmail: false});
    }
    else {
      this.setState({showErrorTextEmail: true});
    }
  }

  submitUsername() {
    const {setUsername} = this.props;
    const username = this.username.getValue();
    setUsername(username);
  }

  submitPassword() {
    const {changePassword} = this.props;
    const oldPassword = this.oldPassword.getValue();
    const newPassword1 = this.newPassword1.getValue();
    const newPassword2 = this.newPassword2.getValue();
    changePassword(oldPassword, newPassword1, newPassword2);
  }

  resetUsername() {
    this.setState({username: this.props.username});
  }

  resetPassword() {
    this.setState({
      oldPassword: null,
      newPassword1: null,
      newPassword2: null
    });
  }

  render() {
    const {
      username, oldPassword, newPassword1, newPassword2, email,
      showErrorTextUsername, showErrorTextNewPassword, showErrorTextEmail
    } = this.state;
    return (
      <div>
        <SettingsCard
          title="Change Username"
          subtitle="This is the name that other users will see."
          submitButtonText="Change Username"
          handleSubmit={this.submitUsername.bind(this)}
          handleReset={this.resetUsername.bind(this)}
        >
          <p>Your current username is: {this.props.username}</p>
          <TextField
            defaultValue={username}
            value={username}
            hintText="Choose a recognizable username"
            floatingLabelText="New Username"
            onChange={this.handleUsernameTextChange.bind(this)}
            errorText={showErrorTextUsername ? 'Enter a non-blank username.' : null}
            ref={ref => this.username = ref}
          />
        </SettingsCard>

        <SettingsCard
          title="Change Password"
          subtitle="This is the password that you use to login."
          resetButtonText="Clear Fields"
          submitButtonText="Change Password"
          handleSubmit={this.submitPassword.bind(this)}
          handleReset={this.resetPassword.bind(this)}
        >
          <p>If you would like to change your password, you may do so by filling out these three fields:</p>
          <TextField
            floatingLabelText="Old Password"
            type="password"
            ref={ref => this.oldPassword = ref}
            onChange={this.handleOldPasswordTextChange.bind(this)}
            value={oldPassword}
          /><br/>
          <TextField
            hintText="Something hard to guess!"
            floatingLabelText="New Password"
            type="password"
            ref={ref => this.newPassword1 = ref}
            onChange={this.handleNewPasswordTextChange.bind(this)}
            errorText={showErrorTextNewPassword ? 'New passwords must match.' : null}
            value={newPassword1}
          /><br/>
          <TextField
            hintText="Type it again"
            floatingLabelText="Confirm New Password"
            type="password"
            ref={ref => this.newPassword2 = ref}
            onChange={this.handleNewPasswordTextChange.bind(this)}
            errorText={showErrorTextNewPassword ? 'New passwords must match.' : null}
            value={newPassword2}
          />
        </SettingsCard>

        <SettingsCard
          title="Change Email"
          subtitle="This is the email that you will be contacted with."
          submitButtonText="Change Email"
        >
          <p>Your current email is: {this.props.email}</p>
          <TextField
            hintText="your_name@example.com"
            floatingLabelText="New Email"
            ref={ref => this.email = ref}
            onChange={this.handleEmailTextChange.bind(this)}
            errorText={showErrorTextEmail ? 'Enter a proper email.' : null}
            value={email}
          />
        </SettingsCard>

        <TranslationSettings />

      </div>
    );
  }
}
