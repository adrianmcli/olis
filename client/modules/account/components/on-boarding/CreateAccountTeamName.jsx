import React from 'react';

import PageWrapper from '/client/modules/core/components/PageWrapper.jsx';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class CreateAccountTeamName extends React.Component {
  render() {
    return (
      <PageWrapper
        title="Create a Team"
        description="Give your team a name. You can change this later."
        showDescription={true}
        backButton={true}
        backButtonLabel='Back'
        fullHeight={false}
        width="420px"
      >
        <TextField
          hintText="Big Corporation Inc."
          floatingLabelText="Team Name"
          fullWidth
        />
        <div style={{margin:'14px 0'}}>
          <RaisedButton
            label="Next Step"
            secondary={true}
          />
        </div>
      </PageWrapper>
    );
  }
}
