import React from 'react';
import R from 'ramda';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import IconButton from 'material-ui/lib/icon-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add-box';

export default class InviteTeammates extends React.Component {
  constructor(props) {
    super(props);
    this.refBase = 'input';
    this.state = {
      submitted: false,
      numInviteInputs: 3
    };
  }

  submitHandler() {
    this.setState({submitted: true});
    const {invite} = this.props;
    const inviteEmails = R.keys(this.refs).map(key => this.refs[key].getValue());
    invite(inviteEmails);
  }

  addInvite() {
    this.setState({
      numInviteInputs: this.state.numInviteInputs + 1
    });
  }

  render() {
    const {numInviteInputs} = this.state;
    let inputs = [];
    for (let i = 0; i < numInviteInputs; i++) {
      const ref = `${this.refBase}${i}`;
      const input = (
        <div key={ref}>
          <TextField
            hintText="your.name@example.com"
            floatingLabelText="Email"
            ref={ref}
          />
          {
            i === numInviteInputs - 1 ?
              <IconButton tooltip="Invite More" onClick={this.addInvite.bind(this)}>
                <AddIcon color="#aaaaaa"/>
              </IconButton>
            :
              null
          }
        </div>
      );
      inputs = [ ...inputs, input ];
    }

    if (this.state.submitted) {
      return <div>Your invites have been sent!</div>;
    }
    else {
      return (
        <div>
          <p>Enter in the email addresses of the teammates you would like to invite to use Olis with you:</p>
          {inputs}
          <div style={{margin: '14px 0'}}>
            <RaisedButton
              label="Invite Teammates"
              secondary={true}
              onClick={this.submitHandler.bind(this)}
            />
          </div>
        </div>
      );
    }
  }
}

//        <div>
// -            <TextField
// -              hintText="your.name@example.com"
// -              floatingLabelText="Email"
// -            />
// -          </div>