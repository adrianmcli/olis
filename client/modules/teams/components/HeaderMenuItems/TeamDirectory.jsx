import React from 'react';

import Dialog from '/client/modules/core/components/Dialog.jsx';
import PeopleList from '/client/modules/core/components/PeopleList.jsx';
import UserInfo from '/client/modules/core/components/UserInfo.jsx';
import TeamUserButtons from './TeamUserButtons';

export default class TeamDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = () => this._handleClose();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {open} = this.props;
    return (
      open ||
      open !== nextProps.open
    );
  }

  _handleClose() {
    const { searchTeamUsers, showUserInfo, onRequestClose } = this.props;
    searchTeamUsers(undefined);
    showUserInfo(undefined);
    onRequestClose();
  }

  render() {
    const {
      team, teamUsersSearchResult, searchTeamUsers,
      showUserInfo, userShown, isAdmin,
      makeUserTeamAdmin, removeUserFromTeam
    } = this.props;

    const buttons = (
      <TeamUserButtons
        user={userShown}
        showMakeAdminButton={userShown ? !team.isUserAdmin(userShown._id) : true}
        makeTeamAdmin={makeUserTeamAdmin}
        removeFromTeam={removeUserFromTeam}
      />
    );

    return (
      <Dialog
        title={`${team.name}: Directory`}
        open={this.props.open}
        onRequestClose={this.handleClose}
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
              team={team}
            />
          </div>
          <div style={{
            width: '280px',
            height: '432px',
            position: 'relative',
            overflowY: 'scroll',
          }}>
            <UserInfo
              user={userShown}
              showButtons={isAdmin}
              buttons={buttons}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}
TeamDirectory.defaultProps = {
  team: {
    name: `Default team name`
  }
};
