import React from 'react';

import Dialog from '/client/modules/core/components/Dialog.jsx';
import PeopleList from '/client/modules/core/components/PeopleList.jsx';
import UserInfo from '/client/modules/core/components/UserInfo.jsx';

export default class ChatMembers extends React.Component {
  handleClose() {
    this.props.onRequestClose();
  }

  render() {
    const {
      convoUsersSearchResult, showUserInfo, searchConvoUsers, userShown, isAdmin, team
    } = this.props;
    return (
      <Dialog
        title="Chat Members"
        open={this.props.open}
        onRequestClose={this.handleClose.bind(this)}
        closeActionOnly
        width={600}
        actionsContainerStyle={{borderTop: '1px solid rgba(0,0,0,0.15)'}}
        bodyStyle={{padding: '0'}}
        onShow={() => {this._peopleList.focusSearchField();}}
      >
        <div style={{display: 'flex'}}>
          <div style={{width: '360px', position: 'relative'}}>
            <PeopleList
              ref={ x => this._peopleList = x }
              users={convoUsersSearchResult}
              userClickHandler={showUserInfo}
              team={team} // TODO make people list team and convo agnostic
              search={searchConvoUsers}
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
              showMakeAdminButton={userShown ? !team.isUserAdmin(userShown._id) : true}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}
