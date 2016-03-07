import React from 'react';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

export default class AddPeople extends React.Component {

  handleSubmit() {
    console.log('submit');
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
        label="Add to Conversation"
        primary={true}
        onClick={this.handleSubmit.bind(this)}
      />,
    ];
    return (
      <Dialog
        title="Add People"
        open={this.props.open}
        onRequestClose={this.handleClose.bind(this)}
        actions={actions}
      >
      <p>Add people to conversation here.</p>
      </Dialog>
    );
  }
}
