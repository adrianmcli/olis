import React from 'react';

import PageWrapper from '/client/modules/core/components/PageWrapper.jsx';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class SetPassword extends React.Component {
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
        />
        </div>

        <div>
        <TextField
          type="password"
          floatingLabelText="Confirm Password"
          fullWidth
        />
        </div>

        <div style={{margin:'14px 0'}}>
          <RaisedButton
            label="Done"
            secondary={true}
          />
        </div>
      </PageWrapper>
    );
  }
}
