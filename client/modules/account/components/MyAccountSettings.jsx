import React from 'react';
import R from 'ramda';
import EmailValidator from 'email-validator';
import LangCodes from '/lib/constants/lang_codes';

import SettingContainer from '/client/modules/core/components/SettingContainer.jsx';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Chip from '/client/modules/core/components/Chip.jsx';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export class Username extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showError: false};
  }

  handleOnShow() {
    this._username.focus();
  }

  validateInput(input) {
    if (R.isEmpty(input)) {
      this.setState({showError: true});
      return false;
    }
    this.setState({showError: false});
    return true;
  }

  handleSubmit() {
    const { setUsername } = this.props;
    const username = this._username.getValue();
    if (this.validateInput(username)) {
      setUsername(username);
    }
  }

  render() {
    const { username, profileImageUrl } = this.props;
    return (
      <SettingContainer title='Change Username' onShow={this.handleOnShow.bind(this)}>
        <div>
          <Chip username={username} avatarSrc={profileImageUrl} noCloseButton/> is your current username.
        </div>
        <p style={{marginTop: '24px'}}>Enter a new username below:</p>
        <TextField
          hintText="Choose a recognizable username"
          floatingLabelText="New Username"
          onEnterKeyDown={this.handleSubmit.bind(this)}
          errorText={this.state.showError ? 'Enter a non-blank username.' : null}
          ref={ref => this._username = ref}
        />
        <div style={{marginTop: '24px'}}>
          <RaisedButton
            label="Change Username"
            primary={true}
            onTouchTap={this.handleSubmit.bind(this)}
          />
        </div>
      </SettingContainer>
    );
  }
}

export class Password extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      oldPasswordError: false,
      showError1: false,
      showError2: false,
      errorText1: '',
      errorText2: '',
    };
  }

  handleOnShow() {
    this._oldPassword.focus();
  }

  _checkOldPassword(oldPassword) {
    // TODO - the conditional test should determine if password is valid
    if (!true) {  // <- replace this test with a call to server
      this.setState({oldPasswordError: true});
      return false;
    }
    this.setState({oldPasswordError: false});
    return true;
  }

  _checkEmpty(pwd1, pwd2) {
    if (R.isEmpty(pwd1)) {
      this.setState({
        showError1: true,
        errorText1: 'Password cannot be empty.',
      });
      return false;
    }
    if (R.isEmpty(pwd2)) {
      this.setState({
        showError2: true,
        errorText2: 'Password cannot be empty.',
      });
      return false;
    }
    this.setState({showError1: false, showError2: false});
    return true;
  }

  _checkMatching(pwd1, pwd2) {
    if (pwd1 !== pwd2) {
      this.setState({
        showError1: true,
        showError2: true,
        errorText1: 'New passwords must match.',
        errorText2: 'New passwords must match.',
      });
      return false;
    }
    this.setState({
      showError1: false,
      showError2: false,
    });
    return true;
  }

  handleSubmit() {
    const { changePassword } = this.props;
    const oldPassword = this._oldPassword.getValue();
    const pwd1 = this._newPassword1.getValue();
    const pwd2 = this._newPassword2.getValue();

    const notOld = this._checkOldPassword(oldPassword);  // 1. check that the old password is correct
    const notEmpty = this._checkEmpty(pwd1, pwd2);       // 2. ensure both new passwords are non-empty
    if (!notEmpty) {return false;}                      // -- terminate early if the above test fail
    const matching = this._checkMatching(pwd1, pwd2);    // 3. ensure that both new passwords are the same

    if (notOld && notEmpty && matching) {
      changePassword(oldPassword, pwd1, pwd2);
    } else {
      // There was an error
    }
  }

  render() {
    return (
      <SettingContainer title='Change Password' onShow={this.handleOnShow.bind(this)}>
        <p>To change your password, fill out the following:</p>
        <TextField
          floatingLabelText="Old Password"
          type="password"
          ref={ref => this._oldPassword = ref}
          errorText={this.state.oldPasswordError ? 'Your password is incorrect.' : null}
        /><br/>
        <TextField
          hintText="Something hard to guess!"
          floatingLabelText="New Password"
          type="password"
          ref={ref => this._newPassword1 = ref}
          errorText={this.state.showError1 ? this.state.errorText1 : null}
        /><br/>
        <TextField
          hintText="Type it again"
          floatingLabelText="Confirm New Password"
          type="password"
          ref={ref => this._newPassword2 = ref}
          onEnterKeyDown={this.handleSubmit.bind(this)}
          errorText={this.state.showError2 ? this.state.errorText2 : null}
        />
        <div style={{marginTop: '24px'}}>
          <RaisedButton
            label="Change Password"
            primary={true}
            onTouchTap={this.handleSubmit.bind(this)}
          />
        </div>
      </SettingContainer>
    );
  }
}

export class Email extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      email: null,
    };
  }

  handleOnShow() {
    this._email.focus();
  }

  _handleEmailTextChange() {
    const email = this._email.getValue();
    this.setState({email});

    if (!EmailValidator.validate(email)) {
      this.setState({showError: true});
      return false;
    }
    this.setState({showError: false});
    return true;
  }

  handleSubmit() {
    const { setEmail } = this.props;
    const email = this._email.getValue();
    if (this._handleEmailTextChange()) {
      setEmail(email);
    }
  }

  render() {
    const emailStyle = {
      color: 'rgba(0,0,0,0.87)',
      display: 'inline',
    };
    return (
      <SettingContainer title='Change Email Address' onShow={this.handleOnShow.bind(this)}>
        <div>Your current email is: <div style={emailStyle}><em>{this.props.email}</em></div></div>
        <div style={{marginTop: '24px'}}>Enter in a new email:</div>
        <TextField
          hintText="your_name@example.com"
          floatingLabelText="New Email"
          ref={ref => this._email = ref}
          onChange={this._handleEmailTextChange.bind(this)}
          onEnterKeyDown={this.handleSubmit.bind(this)}
          errorText={this.state.showError ? 'Please enter a proper email.' : null}
          value={this.state.email}
        />
        <div style={{marginTop: '24px'}}>
          <RaisedButton
            label="Change Email"
            primary={true}
            onTouchTap={this.handleSubmit.bind(this)}
          />
        </div>
      </SettingContainer>
    );
  }
}

export class TranslateLanguage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: this.props.translationLangCode};
    this.langCodeArr = R.keys(LangCodes);
  }

  handleChange(event, index, value) {
    this.setState({value});
    const { setTranslationLanguage } = this.props;
    setTranslationLanguage(value);
  }

  render() {
    const languageStyle = {
      color: 'rgba(0,0,0,0.87)',
    };
    const currentLang = LangCodes[this.props.translationLangCode];
    return (
      <SettingContainer title='Translation Language'>
        <p>Select one of the following languages that you understand best:</p>
        <SelectField value={this.state.value} onChange={this.handleChange.bind(this)} maxHeight={300}>
          {this.langCodeArr.map(code => {
            return <MenuItem key={code} value={code} primaryText={LangCodes[code]} />;
          })}
        </SelectField>
        <div style={{marginTop: '24px'}}>Your chosen language is: <span style={languageStyle}><em>{currentLang}</em></span></div>
        <div style={{marginTop: '24px'}}><em>This setting updates automatically.</em></div>
      </SettingContainer>
    );
  }
}
