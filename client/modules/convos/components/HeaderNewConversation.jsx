import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ActionQuestionAnswer from 'material-ui/lib/svg-icons/action/question-answer';
import TextField from 'material-ui/lib/text-field';

import Dialog from '/client/modules/core/components/Dialog.jsx';
import PeoplePicker from '/client/modules/core/components/PeoplePicker.jsx';

export default class HeaderNewConversation extends React.Component {

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
      stage: 0,
      convoName: ''
    });
  }

  handleClose() {
    const {clearAddedUserIds, clearTeamUsersSearchText} = this.props;
    this.setState({open: false, stage: 0});

    clearAddedUserIds();
    clearTeamUsersSearchText();
  }

  handleNext() {
    this.setState({
      stage: 1,
      convoName: this._textField.getValue(),
    });
    setTimeout(() => {
      this._peoplePicker.focusSearchField();
    }, 500);
  }

  handleSubmit() {
    const {addConvo, usersToAdd} = this.props;
    const {convoName} = this.state;
    addConvo(convoName, usersToAdd.map(x => x._id));
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
      <div>
        <div className="header-icon">
          <IconButton
            onClick={this.handleOpen.bind(this)}
            tooltip="New Conversation"
          >
            <ActionQuestionAnswer color="white" />
          </IconButton>
        </div>

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

      </div>
    );
  }
}
