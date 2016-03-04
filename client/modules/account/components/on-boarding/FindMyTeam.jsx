import React from 'react';

import PageWrapper from '/client/modules/core/components/PageWrapper.jsx';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class FindMyTeam extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  submitHandler() {
    this.setState({submitted: true});
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
          />

          <div style={{margin:'14px 0'}}>
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
