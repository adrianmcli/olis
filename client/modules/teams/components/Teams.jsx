import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import TeamIcon from './TeamIcon.jsx';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

export default class Teams extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      addTeamDialogOpen: false,
    };
  }

  handleOpen() {
    this.setState({addTeamDialogOpen: true});
  }

  handleClose() {
    this.setState({addTeamDialogOpen: false});
  }

  handleManageTeams() {
    alert('route users to the team management page');
  }
  
  render() {
    const bgColor = "#253256";
    const addTeamIconStyle = {
      fontSize:'36px',
      color: bgColor,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    };
    const manageTeamsIconStyle = {
      fontSize:'36px',
      color: 'white',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    };

    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
    ];
    return (
      <div id="team-list-wrapper">

        <div id="team-list">

          {/* Team Icons */}
          <TeamIcon
            teamName="The A Team"
            iconSrc='https://s3.amazonaws.com/uifaces/faces/twitter/vladabazhan/128.jpg'
            unreadCount={15}
            unread
            active
          />
          <TeamIcon/>
          <TeamIcon
            teamName="Custom Team Name"
            iconSrc='https://s3.amazonaws.com/uifaces/faces/twitter/eduardo_olv/128.jpg'
            unreadCount={4}
            unread
          />
          
          {/* Add Team Button */}
          <div className="team-item add-team">
            <IconButton
              onClick={this.handleOpen.bind(this)}
              iconClassName="material-icons"
              tooltip="Add team"
              tooltipPosition="top-right"
              tooltipStyles={{
                top: '28px',
                left: '56px',
              }}
              iconStyle={addTeamIconStyle}
              style={{zIndex:'1'}}
            >
              add
            </IconButton>
          </div>

        </div>

        {/* Manage Teams Button */}
        <div className="team-item manage-teams no-box">
          <IconButton
            onClick={this.handleManageTeams.bind(this)}
            iconClassName="material-icons"
            tooltip="Manage your teams"
            tooltipPosition="top-right"
            tooltipStyles={{
              top: '28px',
              left: '56px',
            }}
            iconStyle={manageTeamsIconStyle}
            style={{zIndex:'1'}}
          >
            settings
          </IconButton>
        </div>

        {/* Add Team Dialog/Modal */}
        <Dialog
          title="Add Team"
          actions={actions}
          open={this.state.addTeamDialogOpen}
          onRequestClose={this.handleClose.bind(this)}
        >
          Ask user if they want to join an existing team or create a new one.
        </Dialog>
      </div>
    );
  }
}
