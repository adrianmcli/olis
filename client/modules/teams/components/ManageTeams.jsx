import React from 'react';
import TimeAgo from 'react-timeago';
import R from 'ramda';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

import IconButton from 'material-ui/lib/icon-button';
import SettingsIcon from 'material-ui/lib/svg-icons/action/settings';

import NameIcon from 'material-ui/lib/svg-icons/action/info';
import MembersIcon from 'material-ui/lib/svg-icons/social/group';
import ConvosIcon from 'material-ui/lib/svg-icons/action/question-answer';
import TimeIcon from 'material-ui/lib/svg-icons/device/access-time';

import PageWrapper from '/client/modules/core/components/PageWrapper.jsx';

export default class ManageTeams extends React.Component {
  handleTeamSettingsClick(teamId, event) {
    const {goToTeamSettings} = this.props;
    goToTeamSettings(teamId);
  }

  handleTeamNameClick(teamId, event) {
    const {selectTeam} = this.props;
    selectTeam(teamId);
  }

  render() {
    const {teams, teamConvos, goToChat} = this.props;
    const teamRowItems = teams.map(team => {
      return (
        <TableRow key={team._id}>
          <TableRowColumn style={{width: '72px'}}>
            <IconButton
              onClick={this.handleTeamSettingsClick.bind(this, team._id)}
              style={{transform: 'scale(0.7)'}}
              team="tester"
            >
              <SettingsIcon />
            </IconButton>
          </TableRowColumn>
          <TableRowColumn>
            <div
              style={{fontWeight: '700',fontSize: '16px',cursor: 'pointer',color: '#00BCD4'}}
              onClick={this.handleTeamNameClick.bind(this, team._id)}
            >
              {team.name}
            </div>
          </TableRowColumn>
          <TableRowColumn>{team.userIds.length} {team.userIds.length === 1 ? 'Member' : 'Members'}</TableRowColumn>
          <TableRowColumn>{teamConvos[team._id] ? teamConvos[team._id].length : null} Conversations</TableRowColumn>
          <TableRowColumn><TimeAgo date={team.updatedAt} /></TableRowColumn>
        </TableRow>
      );
    });

    return (
      <PageWrapper
        title="Manage Teams"
        description="Manage the teams that you are a part of."
        backButton
        lightDescription
        showDescription
        handleBackButtonPress={goToChat}
      >
        <div>
          <Table
            selectable={false}
          >
            <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn
                  style={{
                    width: '72px'
                  }}
                >
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <div className="table-header-wrapper">
                    <div className="table-header-div">
                      <NameIcon color="#9E9E9E"/>
                    </div>
                  </div>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <div className="table-header-wrapper">
                    <div className="table-header-div">
                      <MembersIcon color="#9E9E9E"/>
                    </div>
                  </div>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <div className="table-header-wrapper">
                    <div className="table-header-div">
                      <ConvosIcon color="#9E9E9E"/>
                    </div>
                  </div>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <div className="table-header-wrapper">
                    <div className="table-header-div">
                      <TimeIcon color="#9E9E9E"/>
                    </div>
                  </div>
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              showRowHover
            >
              {teamRowItems}
            </TableBody>
          </Table>
        </div>
      </PageWrapper>
    );
  }
}

ManageTeams.defaultProps = {
  teams: [
    {_id: 'team_a_UUID', name: 'Alpha Company', members: 3, conversations: 21, updatedAt: new Date(0)},
    {_id: 'team_b_UUID', name: 'Beta Bunch', members: 13, conversations: 121, updatedAt: new Date(121232134)},
    {_id: 'team_c_UUID', name: 'Charlie Corporation', members: 1, conversations: 12, updatedAt: new Date(1456394386)},
  ]
};
