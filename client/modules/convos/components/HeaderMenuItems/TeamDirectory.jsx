import React from 'react';

import Dialog from '/client/modules/core/components/Dialog.jsx';

export default class TeamDirectory extends React.Component {


  render() {
    return (
      <Dialog
        title="Team Directory"
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        closeActionOnly
        width={540}
      >
        <p>Team Directory Here</p>
      </Dialog>
    );
  }
}
