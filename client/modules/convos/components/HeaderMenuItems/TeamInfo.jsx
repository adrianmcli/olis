import React from 'react';

import Dialog from '/client/modules/core/components/Dialog.jsx';

export default class TeamInfo extends React.Component {


  render() {
    return (
      <Dialog
        title="Team Info"
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        closeActionOnly
        width={540}
      >
        <h3>The A Team</h3>
        <p>This is the A Team chat platform. Here, we will discuss things that have to do with our upcoming operations.</p>
        <p>Please make sure to update the notes whenever a new decision has been made. This platform can only work if we keep the notes section up-to-date.</p>
      </Dialog>
    );
  }
}
