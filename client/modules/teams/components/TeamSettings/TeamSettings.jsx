import React from 'react';

import PageWrapper from '/client/modules/core/components/PageWrapper.jsx';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';

import ChangeTeamName from './ChangeTeamName.jsx';
import Permissions from './Permissions.jsx';
import InviteTeammates from './InviteTeammates.jsx';
import TeamInfo from './TeamInfo.jsx';

export default class TeamSettings extends React.Component {
  render() {
    const {teamId, teamName, teamInfo,
      goToChat, invite,
      setTeamName, setTeamInfo, setUserRole,
      teamUsers, pendingInviteIds} = this.props;

    const backgroundColor = '#efefef';
    const highlightColor = '#9e9e9e';
    const tabStyle = {
      color: highlightColor,
    };

    return (
      <PageWrapper
        title={'Team Settings: ' + teamName}
        backButton
        handleBackButtonPress={goToChat}
        >
        <Tabs
          style={{margin: '0 -25px'}}
          tabItemContainerStyle={{background: backgroundColor}}
          contentContainerStyle={{padding: '25px 25px 0'}}
        >
          <Tab
            style={tabStyle}
            icon={<FontIcon className="material-icons" color={highlightColor}>settings</FontIcon>}
            label="General"
          >
            <ChangeTeamName setTeamName={setTeamName} />
            <TeamInfo teamInfo={teamInfo} setTeamInfo={setTeamInfo} />
          </Tab>
          <Tab
            style={tabStyle}
            icon={<FontIcon className="material-icons" color={highlightColor}>people</FontIcon>}
            label="Permissions"
          >
            <Permissions users={teamUsers} teamId={teamId} setUserRole={setUserRole} pendingInviteIds={pendingInviteIds} />
          </Tab>
          <Tab
            style={tabStyle}
            icon={<FontIcon className="material-icons" color={highlightColor}>person_add</FontIcon>}
            label="Invite Teammates"
          >
            <InviteTeammates invite={invite} />
          </Tab>
        </Tabs>
      </PageWrapper>
    );
  }
}
TeamSettings.defaultProps = {
  teamName: 'Default team name',
  teamId: 'noTeamId'
};
