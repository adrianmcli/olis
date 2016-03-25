import React from 'react';

import Dialog from '/client/modules/core/components/Dialog.jsx';

export default class TeamInfo extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {open} = this.props;
    return (
      open ||
      open !== nextProps.open
    );
  }

  render() {
    const {teamName, teamInfo} = this.props;
    return (
      <Dialog
        title="Team Info"
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        closeActionOnly
        width={540}
      >
        <h3>{teamName}</h3>
        <p>{teamInfo}</p>
      </Dialog>
    );
  }
}
TeamInfo.defaultProps = {
  teamName: 'Default team name',
  teamInfo: 'Default team info'
};
