import React from 'react';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailSent: false,
    };
    this.onEmailSent = () => this._onEmailSent();
  }

  _onEmailSent() {
    this.setState({
      isEmailSent: true,
    });
  }

  handleSubmit() {
    const {submitForgotPasswordEmail} = this.props;
    const email = this.email.getValue();
    submitForgotPasswordEmail(email, this.onEmailSent);
  }

  renderDone() {
    const styles = getStyles();
    return (
      <div>
        <h1 style={styles.title}>Sent!</h1>
        <p style={styles.desc}>Check your inbox in a few minutes to get a link to reset your password.</p>
        <p style={styles.desc}>You may now close this page.</p>
      </div>
    );
  }

  renderForm() {
    const styles = getStyles();
    return (
      <div>
        <h1 style={styles.title}>Forgot your password?</h1>
        <p style={styles.desc}>Enter your account's email and we'll send you a link to reset your password.</p>

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

  render() {
    const styles = getStyles();
    const form = this.renderForm.bind(this)();
    const done = this.renderDone.bind(this)();
    return (
      <div style={styles.page}>
        { this.state.isEmailSent ? done : form }
      </div>
    );
  }
}

function getStyles() {
  return {
    page: {
      height: '100%',
      width: '100%',
      backgroundColor: '#2F3F70',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: 'white',
    },
    title: {
      fontSize: '36px',
    },
    desc: {
      fontSize: '18px',
      fontWeight: '300',
    },
  };
}
