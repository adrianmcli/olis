import React from 'react';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

export default class ChatInfo extends React.Component {

  handleClose() {
    this.props.onRequestClose();
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        secondary={true}
        onClick={this.handleClose.bind(this)}
      />,
    ];
    return (
      <Dialog
        title="Chat Info"
        open={this.props.open}
        onRequestClose={this.handleClose.bind(this)}
        actions={actions}
      >
      <p>Chat Info Here</p>
      </Dialog>
    );
  }
}
