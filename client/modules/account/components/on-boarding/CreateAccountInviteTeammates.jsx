import React from 'react';

import PageWrapper from '/client/modules/core/components/PageWrapper.jsx';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

import IconButton from 'material-ui/lib/icon-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add-box';

export default class CreateAccountInviteTeammates extends React.Component {
  render() {
    return (
      <PageWrapper
        title="Invite Teammates"
        description="Enter the email addresses of the teammates you want to invite. You can always invite more teammates later."
        showDescription={true}
        backButton={true}
        backButtonLabel='Back'
        fullHeight={false}
        width="420px"
      >
        <div>
          <TextField
            hintText="your.name@example.com"
            floatingLabelText="Email"
          />
        </div>

        <div>
          <TextField
            hintText="your.name@example.com"
            floatingLabelText="Email"
          />
        </div>

        <div>
          <TextField
            hintText="your.name@example.com"
            floatingLabelText="Email"
          />
          <IconButton tooltip="Invite More">
            <AddIcon color="#aaaaaa"/>
          </IconButton>
        </div>

        <p style={{opacity:'0.5'}}><em>This step is optional, you can always do this later.</em></p>

        <div style={{margin:'14px 0'}}>
          <RaisedButton
            label="Finish"
            primary={true}
          />
        </div>
      </PageWrapper>
    );
  }
}
