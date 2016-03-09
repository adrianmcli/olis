import React from 'react';

import Dialog from '/client/modules/core/components/Dialog.jsx';

export default class AddPeople extends React.Component {

  handleSubmit() {
    console.log('submit');
  }

  handleClose() {
    this.props.onRequestClose();
  }

  render() {
    return (
      <Dialog
        title="Add People"
        open={this.props.open}
        onRequestClose={this.handleClose.bind(this)}
        submitLabel="Add to Conversation"
      >
      <p>Add people to the conversation here.</p>
      </Dialog>
    );
  }
}
