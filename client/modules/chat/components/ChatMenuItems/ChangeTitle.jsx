import React from 'react';

import MyDialog from '/client/modules/core/components/Dialog.jsx';
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
    return (
      <MyDialog
        title="Change Chat Title"
        open={this.props.open}
        onRequestClose={this.handleClose.bind(this)}
        width={360}
        submitText="Change Title"
        onShow={() => {this._textField.focus();}}
      >
        <p>Enter a new chat title below:</p>
        <TextField
          hintText="Describe the conversation topic"
          floatingLabelText="Chat Title"
          onEnterKeyDown={this.handleSubmit.bind(this)}
          ref={(x) => this._textField = x}
          fullWidth
        />
      </MyDialog>
    );
  }
}
