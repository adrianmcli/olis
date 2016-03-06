import React from 'react';

import PageWrapper from '/client/modules/core/components/PageWrapper.jsx';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class SetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorTextNewPassword: false,
      newPassword1: null,
      newPassword2: null
    };
  }

  submit() {
    const {token, resetPassword} = this.props;

    const pwd1 = this.newPassword1.getValue();
    const pwd2 = this.newPassword2.getValue();

    if (token) {
      resetPassword(token, pwd1, pwd2);
    }
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

  render() {
    const {
      newPassword1, newPassword2,
      showErrorTextNewPassword
    } = this.state;
    return (
      <PageWrapper
        title="Set Your Password"
        description="Choose a password at least 6 characters long."
        showDescription={true}
        fullHeight={false}
        width="420px"
      >
        <div>
        <TextField
          type="password"
          floatingLabelText="Password"
          fullWidth
          ref={(ref) => this.newPassword1 = ref}
          value={newPassword1}
          onChange={this.handleNewPasswordTextChange.bind(this)}
          errorText={showErrorTextNewPassword ? 'New passwords must match.' : null}
        />
        </div>

        <div>
        <TextField
          type="password"
          floatingLabelText="Confirm Password"
          fullWidth
          ref={(ref) => this.newPassword2 = ref}
          value={newPassword2}
          onChange={this.handleNewPasswordTextChange.bind(this)}
          errorText={showErrorTextNewPassword ? 'New passwords must match.' : null}
        />
        </div>

        <div style={{margin: '14px 0'}}>
          <RaisedButton
            label="Done"
            secondary={true}
            onClick={this.submit.bind(this)}
          />
        </div>
      </PageWrapper>
    );
  }
}
