import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import TeamIcon from './TeamIcon.jsx';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import AddTeamModal from '../containers/add_team_modal';
import _ from 'lodash';

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
    const {goToManageTeams} = this.props;
    goToManageTeams();
  }

  render() {
    const {teams, teamId, selectTeam, addTeam, notificationsByTeam} = this.props;

    const bgColor = '#253256';
    const addTeamIconStyle = {
      fontSize: '36px',
      color: bgColor,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    };
    const manageTeamsIconStyle = {
      fontSize: '36px',
      color: 'white',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    };

    return (
      <div id="team-list-wrapper">

        <div id="team-list">

          {/* Team Icons */}
          {
            teams.map(team => {
              const unreadCount = notificationsByTeam[team._id] ? notificationsByTeam[team._id].length : 0;
              return (
                <TeamIcon
                  key={team._id}
                  teamName={team.name}
                  iconSrc='https://s3.amazonaws.com/uifaces/faces/twitter/vladabazhan/128.jpg'
                  unreadCount={unreadCount}
                  unread={unreadCount > 0}
                  active={teamId === team._id}
                  selectTeam={selectTeam.bind(null, team._id)}
                />
              );
            })
          }

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
              style={{zIndex: '1'}}
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
            style={{zIndex: '1'}}
          >
            settings
          </IconButton>
        </div>

        {/* Add Team Dialog/Modal */}
        <AddTeamModal
          title="Add Team"
          open={this.state.addTeamDialogOpen}
          onRequestClose={this.handleClose.bind(this)}
          addTeam={addTeam}
        />
      </div>
    );
  }
}
Teams.defaultProps = {
  teams: [],
  teamId: 'someTeamId'
};
