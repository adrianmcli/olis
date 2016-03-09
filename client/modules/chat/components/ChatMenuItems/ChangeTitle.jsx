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

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.open && this.props.open) {
      setTimeout(() => {
        this._textField.focus();
      },500);
    }
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
        // title="Change Chat Title"
        open={this.props.open}
        onRequestClose={this.handleClose.bind(this)}
        actions={actions}
        contentStyle={{width: '360px'}}
      >
      <h3 style={{
        color: 'white',
        backgroundColor: '#2F3F70',
        fontSize: '24px',
        lineHeight: '32px',
        fontWeight: '400',
        margin: '-24px -24px 0',
        padding: '24px 24px 16px',
      }}>
        Change Chat Title
      </h3>
      <p>Enter a new chat title below:</p>
      <TextField
        hintText="Describe the conversation topic"
        floatingLabelText="Chat Title"
        onEnterKeyDown={this.handleSubmit.bind(this)}
        ref={(x) => this._textField = x}
        fullWidth
      />
      </Dialog>
    );
  }
}
