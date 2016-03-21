import React from 'react';

import Dialog from '/client/modules/core/components/Dialog.jsx';
import PeoplePicker from '/client/modules/core/components/PeoplePicker.jsx';

export default class AddPeopleToConvo extends React.Component {

  handleSubmit() {
    const {addUsersToConvo, usersToAdd, convoId, onRequestClose} = this.props;
    addUsersToConvo(convoId, usersToAdd.map(user => user._id));
    onRequestClose();
  }

  handleClose() {
    const {clearAddedUserIds, clearTeamUsersSearchText} = this.props;
    this.props.onRequestClose();
    clearAddedUserIds();
    clearTeamUsersSearchText();
  }

  render() {
    const {
      teamUsersSearchResult, usersToAdd, team, addUserId, removeUserId, searchTeamUsers
    } = this.props;
    return (
      <Dialog
        title="Add People to Conversation"
        open={this.props.open}
        onRequestClose={this.handleClose.bind(this)}
        submitLabel="Add to Conversation"
        onSubmit={this.handleSubmit.bind(this)}
        onShow={() => {this._peoplePicker.focusSearchBar();}}
        bodyStyle={{padding: '0'}}
        width={540}
        actionsContainerStyle={{borderTop: '1px solid rgba(0,0,0,0.15)'}}
      >
        <PeoplePicker
          usersNotAdded={teamUsersSearchResult}
          usersToAdd={usersToAdd}
          team={team}
          addUserId={addUserId}
          removeUserId={removeUserId}
          search={searchTeamUsers}
        />
      </Dialog>
    );
  }
}
