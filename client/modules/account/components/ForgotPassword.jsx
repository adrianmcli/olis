import React from 'react';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.onEmailSent = () => this._onEmailSent();
  }

  _onEmailSent() {
    this.text.textContent = 'Password reset link sent; check your email!';
  }

  handleSubmit() {
    const {submitForgotPasswordEmail} = this.props;
    const email = this.email.getValue();
    submitForgotPasswordEmail(email, this.onEmailSent);
  }

  render() {
    return (
      <div style={{
        color: 'white',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#2F3F70',
      }}>
        <div>
          <h1>Forgot your password?</h1>
          <div style={{fontWeight: '300'}} ref={ref => this.text = ref}>
            Enter your account's email and we'll send you a link to reset your password.
          </div>
        </div>

        <TextField
          floatingLabelText="Email"
          floatingLabelStyle={{color: 'rgba(255,255,255,0.5)'}}
          inputStyle={{color: 'white'}}
          onEnterKeyDown={this.handleSubmit.bind(this)}
          ref={ref => this.email = ref}
        />

        <div style={{margin: '14px 0'}}>
          <RaisedButton
            label="Send"
            primary={true}
            onClick={this.handleSubmit.bind(this)}
          />
        </div>
      </div>
    );
  }
}
