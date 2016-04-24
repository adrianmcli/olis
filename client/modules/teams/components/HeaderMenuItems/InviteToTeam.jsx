import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Dialog from '/client/modules/core/components/Dialog.jsx';
import TextField from 'material-ui/lib/text-field';

export default class InviteToTeam extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  handleSubmit() {
    const {invite, onRequestClose} = this.props;
    const email = this._textField.getValue();
    invite([ email ]);
    onRequestClose();
  }

  render() {
    return (
      <Dialog
        title="Invite to Team"
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        submitLabel="Send Invitation"
        onSubmit={this.handleSubmit.bind(this)}
        width={400}
        onShow={() => {this._textField.focus();}}
      >
        <p>Send an invitation by entering an email address:</p>
        <TextField
          hintText="your.name@example.com"
          floatingLabelText="Email"
          ref={ x => this._textField = x }
          onEnterKeyDown={this.handleSubmit.bind(this)}
          fullWidth
          // onChange={this.handleChange.bind(this, ref, i)}
          // errorText={this.state.showErrorText[i] ? 'Enter a proper email.' : null}
        />
        <p>To invite more than one person at a time, go to the <a href="#">team settings</a> page.</p>
      </Dialog>
    );
  }
}
