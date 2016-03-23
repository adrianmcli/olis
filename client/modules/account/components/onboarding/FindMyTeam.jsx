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

  render() {
    if (this.state.submitted) {
      return (
        <PageWrapper
          title="Sent!"
          description="Check your inbox to join the teams you belong to."
          showDescription={true}
          fullHeight={false}
          width="420px"
        >
        </PageWrapper>
      );
    } else {
      return (
        <PageWrapper
          title="Find My Team"
          description="Enter in your email address and you will receive an email listing all the teams that you have been invited to."
          showDescription={true}
          fullHeight={false}
          width="420px"
        >
          <TextField
            type="email"
            hintText="your.name@example.com"
            floatingLabelText="Email"
            fullWidth
            ref={(ref) => this.input = ref}
            errorText={this.state.showErrorText ? 'Enter a proper email.' : null}
            onChange={this.handleChange.bind(this)}
          />

          <div style={{margin: '14px 0'}}>
            <RaisedButton
              onClick={this.submitHandler.bind(this)}
              label="Submit"
              secondary={true}
            />
          </div>
        </PageWrapper>
      );
    }
  }
}
