import React from 'react';

import Dialog from '/client/modules/core/components/Dialog.jsx';
import TextField from 'material-ui/lib/text-field';

export default class InviteToTeam extends React.Component {


  render() {
    return (
      <Dialog
        title="Invite to Team"
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        submitLabel="Send Invitation"
        width={400}
        onShow={() => {this._textField.focus();}}
      >
        <p>Send an invitation by entering an email address:</p>
        <TextField
          hintText="your.name@example.com"
          floatingLabelText="Email"
          ref={ x => this._textField = x }
          // onChange={this.handleChange.bind(this, ref, i)}
          // errorText={this.state.showErrorText[i] ? 'Enter a proper email.' : null}
        />
        <p>To invite more than one person at a time, go to the <a href="#">team settings</a> page.</p>
      </Dialog>
    );
  }
}
