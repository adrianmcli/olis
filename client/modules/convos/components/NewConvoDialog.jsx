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
    this.stageData = {
      picker: {
        width: 540,
        onShowFunc: () => this._peoplePicker.focusSearchField(),
        submitFunc: this.handlePickerSubmit.bind(this),
        submitLabel: 'Next',
        title: 'Add Participants',
        style: {
          body: {padding: '0'},
          actionsContainer: {borderTop: '1px solid rgba(0,0,0,0.15)'},
        },
      },
      title: {
        width: 360,
        onShowFunc: () => this._textField.focus(),
        submitFunc: this.handleTitleSubmit.bind(this),
        submitLabel: 'Next',
        title: 'Choose Chat Name',
        style: {
          body: {padding: '24px'},
          actionsContainer: {},
        },
      },
    };
  }

  handleOpen() {
    this.setState({ open: true, stage: 0});
  }

  handleClose() {
    const {clearAddedUserIds, searchTeamUsers, setNewConvoName} = this.props;
    this.setState({open: false, stage: 0});

    clearAddedUserIds();
    searchTeamUsers(undefined);
    setNewConvoName(undefined);
  }

  handlePickerSubmit() {
    this.nextStage.bind(this)();
    // this.submitAndClose.bind(this)();
  }

  handleTitleSubmit() {
    const {setNewConvoName} = this.props;
    const convoName = this._textField.getValue();
    setNewConvoName(convoName);
    // this.nextStage.bind(this)();
    this.submitAndClose.bind(this)();
  }

  nextStage() {
    this.setState({stage: this.state.stage + 1});
    setTimeout(() => {
      this.stageData.title.onShowFunc();
    }, 500);
  }

  submitAndClose() {
    const {addConvo, usersToAdd, newConvoName} = this.props;
    console.log(newConvoName);  // BUG - newConvoName is blank
    addConvo(newConvoName, usersToAdd.map(x => x._id));
    this.handleClose();
  }

  renderTitlePicker() {
    return (
      <div>
        <p>Enter a name for your new chat.</p>
        <TextField
          hintText="Sales Report, Issue #24, etc."
          floatingLabelText="Chat Name"
          onEnterKeyDown={this.handleTitleSubmit.bind(this)}
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
    const {picker, title} = this.stageData;
    const data = this.state.stage === 0 ? picker : title;

    return (
      <Dialog
        title={data.title}
        open={this.state.open}
        onRequestClose={this.handleClose.bind(this)}
        submitLabel={data.submitLabel}
        onSubmit={data.submitFunc}
        onShow={data.onShowFunc}
        width={data.width}
        actionsContainerStyle={data.style.actionsContainer}
        bodyStyle={data.style.body}
      >
        { this.state.stage === 0 ? this.renderPeoplePicker() : this.renderTitlePicker() }
      </Dialog>
    );
  }
}
