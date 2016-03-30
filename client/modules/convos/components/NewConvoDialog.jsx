import React from 'react';

import TextField from 'material-ui/lib/text-field';
import Dialog from '/client/modules/core/components/Dialog.jsx';
import PeoplePicker from '/client/modules/core/components/PeoplePicker.jsx';

export default class NewConvoDialog extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const {open} = this.state;
    return (
      open ||
      open !== nextState.open
    );
  }

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

  renderTitlePicker() {
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

  renderPeoplePicker() {
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
    const stageData = {
      picker: {
        width: 540,
        submitFunc: this.handleSubmit.bind(this),
        submitLabel: 'Next',
        title: 'Add Participants',
        style: {
          body: {padding: '0'},
          actionsContainer: {borderTop: '1px solid rgba(0,0,0,0.15)'},
        },
      },
      title: {
        width: 360,
        submitFunc: this.handleNext.bind(this),
        submitLabel: 'Next',
        title: 'Choose Conversation Name',
        style: {
          body: {padding: '24px'},
          actionsContainer: {},
        },
      },
    };

    const data = this.state.stage !== 0 ? stageData.picker : stageData.title;

    return (
      <Dialog
        title={data.title}
        open={this.state.open}
        onRequestClose={this.handleClose.bind(this)}
        submitLabel={data.submitLabel}
        onSubmit={data.submitFunc}
        onShow={() => {this._textField.focus();}}
        width={data.width}
        actionsContainerStyle={data.style.actionsContainer}
        bodyStyle={data.style.body}
      >
        { this.state.stage === 0 ? this.renderTitlePicker() : this.renderPeoplePicker() }
      </Dialog>
    );
  }
}
