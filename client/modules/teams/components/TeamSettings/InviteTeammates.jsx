import React from 'react';
import R from 'ramda';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import IconButton from 'material-ui/lib/icon-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add-box';

import EmailValidator from 'email-validator';

export default class InviteTeammates extends React.Component {
  constructor(props) {
    super(props);
    this.refBase = 'input';
    this.state = {
      submitted: false,
      numInviteInputs: 3,
      showErrorText: [ false, false, false ]
    };
  }

  handleChange(ref, i) {
    const input = this.refs[ref].getValue();
    const isValidEmail = EmailValidator.validate(input);

    let showErrorText = this.state.showErrorText;
    if (!R.isEmpty(input) && !isValidEmail) {
      showErrorText[i] = true;
    }
    else {
      showErrorText[i] = false;
    }
    this.setState({showErrorText});
  }

  submitHandler() {
    const {invite} = this.props;
    const inviteEmails = R.keys(this.refs).map(key => this.refs[key].getValue());
    if (!R.contains(true, this.state.showErrorText)) {
      invite(inviteEmails);
      this.setState({submitted: true});
    }
    else { alert('Enter a proper email.'); }
  }

  addInvite() {
    this.setState({
      numInviteInputs: this.state.numInviteInputs + 1,
      showErrorText: [ ...this.state.showErrorText, false ]
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
            onChange={this.handleChange.bind(this, ref, i)}
            errorText={this.state.showErrorText[i] ? 'Enter a proper email.' : null}
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
          <p>Enter in the email addresses of the people you would like to invite to your team:</p>
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
