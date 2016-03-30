import React from 'react';

import Dialog from '/client/modules/core/components/Dialog.jsx';
import TextField from 'material-ui/lib/text-field';

export default class ChangeConvoName extends React.Component {
  handleSubmit() {
    const {changeConvoName} = this.props;
    const input = this._textField.getValue();
    changeConvoName(input);
    this.handleClose();
  }

  handleClose() {
    this.props.onRequestClose();
  }

  render() {
    return (
      <Dialog
        title="Change Chat Name"
        open={this.props.open}
        onRequestClose={this.handleClose.bind(this)}
        width={360}
        submitLabel="Change Name"
        onSubmit={this.handleSubmit.bind(this)}
        onShow={() => {this._textField.focus();}}
      >
        <p>Enter a new chat title below:</p>
        <TextField
          hintText="Describe the chat topic"
          floatingLabelText="Chat Name"
          onEnterKeyDown={this.handleSubmit.bind(this)}
          ref={(x) => this._textField = x}
          fullWidth
        />
      </Dialog>
    );
  }
}
