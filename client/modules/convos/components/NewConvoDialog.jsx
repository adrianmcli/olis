import React from 'react';

import TextField from 'material-ui/lib/text-field';
import Dialog from '/client/modules/core/components/Dialog.jsx';
import PeoplePicker from '/client/modules/core/components/PeoplePicker.jsx';

export default class NewConvoDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      stage: 0,
    };
  }

  handleOpen() {
    this.setState({
      open: true,
      stage: 0
    });
  }

  handleClose() {
    const {clearAddedUserIds, searchTeamUsers, setNewConvoName} = this.props;
    this.setState({open: false, stage: 0});

    clearAddedUserIds();
    searchTeamUsers(undefined);
    setNewConvoName(undefined);
  }

  handleNext() {
    const {setNewConvoName} = this.props;
    const convoName = this._textField.getValue();
    setNewConvoName(convoName);

    this.setState({
      stage: 1,
    });
    setTimeout(() => {
      this._peoplePicker.focusSearchField();
    }, 500);
  }

  handleSubmit() {
    const {addConvo, usersToAdd, newConvoName} = this.props;
    addConvo(newConvoName, usersToAdd.map(x => x._id));
    this.handleClose();
  }

  renderFirstStep() {
    return (
      <div>
        <p>Enter a name for your new conversation.</p>
        <TextField
          hintText="Sales Report, Issue #24, etc."
          floatingLabelText="Conversation Name"
          onEnterKeyDown={this.handleNext.bind(this)}
          ref={(x) => this._textField = x}
          fullWidth
        />
      </div>
    );
  }

  renderSecondStep() {
    const {
      teamUsersSearchResult, usersToAdd, team, addUserId, removeUserId, searchTeamUsers
    } = this.props;

    return (
      <PeoplePicker
        ref={x => this._peoplePicker = x}
        usersNotAdded={teamUsersSearchResult}
        usersToAdd={usersToAdd}
        team={team}
        addUserId={addUserId}
        removeUserId={removeUserId}
        search={searchTeamUsers}
      />
    );
  }

  render() {
    // first stage settings
    let width = 360;
    let submitFunc = this.handleNext.bind(this);
    let submitLabel = 'Next';
    let title = 'Choose Conversation Name';
    let bodyStyle = {padding: '24px'};
    let actionsContainerStyle = {};

    // second stage settings
    if (this.state.stage !== 0) {
      width = 540;
      submitFunc = this.handleSubmit.bind(this);
      submitLabel = 'Create';
      title = 'Add Participants';
      bodyStyle = {padding: '0'};
      actionsContainerStyle = {borderTop: '1px solid rgba(0,0,0,0.15)'};
    }
    return (
      <Dialog
        title={title}
        open={this.state.open}
        onRequestClose={this.handleClose.bind(this)}
        submitLabel={submitLabel}
        onSubmit={submitFunc}
        onShow={() => {this._textField.focus();}}
        width={width}
        actionsContainerStyle={actionsContainerStyle}
        bodyStyle={bodyStyle}
      >
        { this.state.stage === 0 ? this.renderFirstStep() : this.renderSecondStep() }
      </Dialog>
    );
  }
}
