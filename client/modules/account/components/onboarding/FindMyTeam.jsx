import React from 'react';
import EmailValidator from 'email-validator';

import PageWrapper from '/client/modules/core/components/PageWrapper.jsx';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class FindMyTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      showErrorText: false
    };
  }

  submitHandler() {
    const {submitEmail} = this.props;
    const email = this.input.getValue();
    this.setState({submitted: true});
    submitEmail(email, () => this.setState({submitted: true}));
  }

  handleChange() {
    const value = this.input.getValue();
    if (EmailValidator.validate(value)) {
      this.setState({showErrorText: false});
    }
    else {
      this.setState({showErrorText: true});
    }
  }

  renderForm() {
    const styles = getStyles();
    return (
      <div>
        <h1 style={styles.title}>Find My Team</h1>
        <p style={styles.desc}>Enter your email below and we'll send you an email<br />letting you know what teams you have been invited to.</p>
        <TextField
          type="email"
          hintText="your.name@example.com"
          floatingLabelText="Email"
          floatingLabelStyle={{color: 'rgba(255,255,255,0.5)'}}
          ref={(ref) => this.input = ref}
          errorText={this.state.showErrorText ? 'Enter a proper email.' : null}
          onChange={this.handleChange.bind(this)}
          onEnterKeyDown={this.submitHandler.bind(this)}
          inputStyle={{color: 'white'}}
        />
        <div style={{margin: '14px 0'}}>
          <RaisedButton
            onClick={this.submitHandler.bind(this)}
            label="Submit"
            primary={true}
          />
        </div>
      </div>
    );
  }

  renderDone() {
    const styles = getStyles();
    return (
      <div>
        <h1 style={styles.title}>Sent!</h1>
        <p style={styles.desc}>Check your inbox in a few minutes to find and join the teams you belong to.</p>
        <p style={styles.desc}>You may now close this page.</p>
      </div>
    );
  }

  render() {
    const styles = getStyles();
    const done = this.renderDone.bind(this)();
    const form = this.renderForm.bind(this)();
    return (
      <div style={styles.page}>
        { this.state.submitted ? done : form }
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
