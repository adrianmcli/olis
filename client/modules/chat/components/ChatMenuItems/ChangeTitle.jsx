import React from 'react';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

export default class ChangeTitle extends React.Component {
  handleSubmit() {
    const input = this._textField.getValue();
    console.log(input); // TODO - fire off an action to change the title
    this.handleClose();
  }

  handleClose() {
    this.props.onRequestClose();
  }

  render() {
    const actions = [
      <FlatButton
      label="Cancel"
      secondary={true}
      onClick={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Change Title"
        primary={true}
        onClick={this.handleSubmit.bind(this)}
      />,
    ];
    return (
      <Dialog
        title="Change Chat Title"
        open={this.props.open}
        onRequestClose={this.handleClose.bind(this)}
        actions={actions}
      >
      <p>Enter a new chat title below:</p>
      <TextField
        hintText="Describe the conversation topic"
        floatingLabelText="Chat Title"
        onEnterKeyDown={this.handleSubmit.bind(this)}
        ref={(x) => this._textField = x}
      />
      </Dialog>
    );
  }
}
