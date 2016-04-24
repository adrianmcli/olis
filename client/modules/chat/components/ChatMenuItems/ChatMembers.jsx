import React from 'react';

import Dialog from '/client/modules/core/components/Dialog.jsx';
import PeopleList from '/client/modules/core/components/PeopleList.jsx';
import UserInfo from '/client/modules/core/components/UserInfo.jsx';
import ChatUserButtons from './ChatUserButtons';

export default class ChatMembers extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = () => this._handleClose();
  }

  _handleClose() {
    const { searchConvoUsers, showUserInfo, onRequestClose } = this.props;
    searchConvoUsers(undefined);
    showUserInfo(undefined);
    onRequestClose();
  }

  render() {
    const {
      convoUsersSearchResult, showUserInfo, searchConvoUsers,
      userShown, isAdmin, team, removeFromConvo
    } = this.props;

    const buttons = (
      <ChatUserButtons
        user={userShown}
        removeFromConvo={removeFromConvo}
      />
    );

    return (
      <Dialog
        title="Chat Members"
        open={this.props.open}
        onRequestClose={this.handleClose}
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
              team={team}
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
              buttons={buttons}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}
