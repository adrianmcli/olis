import React from 'react';

import PageWrapper from '/client/modules/core/components/PageWrapper.jsx';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class SetPassword extends React.Component {
  submit() {
    const {token, resetPassword} = this.props;

    const pwd1 = this.input1.getValue();
    const pwd2 = this.input2.getValue();

    if (token) {
      resetPassword(token, pwd1, pwd2);
    }
  }

  render() {
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
          ref={(ref) => this.input1 = ref}
        />
        </div>

        <div>
        <TextField
          type="password"
          floatingLabelText="Confirm Password"
          fullWidth
          ref={(ref) => this.input2 = ref}
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
