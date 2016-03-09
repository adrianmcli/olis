import React from 'react';

import Dialog from '/client/modules/core/components/Dialog.jsx';

export default class ChatInfo extends React.Component {

  handleClose() {
    this.props.onRequestClose();
  }

  render() {
    return (
      <Dialog
        title="Chat Info"
        open={this.props.open}
        onRequestClose={this.handleClose.bind(this)}
        closeActionOnly
      >
      <p>Chat Info Here</p>
      </Dialog>
    );
  }
}
