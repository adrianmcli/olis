import React from 'react';

import Dialog from '/client/modules/core/components/Dialog.jsx';
import PeopleList from '/client/modules/core/components/PeopleList.jsx';
import UserInfo from '/client/modules/core/components/UserInfo.jsx';

export default class TeamDirectory extends React.Component {
  render() {
    const {
      teamName, teamUsersSearchResult, searchTeamUsers, showUserInfo, userShown
    } = this.props;
    return (
      <Dialog
        title={`${teamName}: Directory`}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        closeActionOnly
        width={600}
        actionsContainerStyle={{borderTop: '1px solid rgba(0,0,0,0.15)'}}
        bodyStyle={{padding: '0'}}
        // onShow={() => {this._peopleList.focusSearchBar();}}
      >
        <div style={{display: 'flex'}}>
          <div style={{width: '360px', position: 'relative'}}>
            <PeopleList
              ref={ x => this._peopleList = x }
              users={teamUsersSearchResult}
              search={searchTeamUsers}
              userClickHandler={showUserInfo}
            />
          </div>
          <div style={{
            width: '280px',
            height: '432px',
            position: 'relative',
            overflowY: 'scroll',
          }}>
            <UserInfo user={userShown} />
          </div>
        </div>
      </Dialog>
    );
  }
}
TeamDirectory.defaultProps = {
  teamName: 'Default team name'
};
