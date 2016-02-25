import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ActionQuestionAnswer from 'material-ui/lib/svg-icons/action/question-answer';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import TextField from 'material-ui/lib/text-field';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Divider from 'material-ui/lib/divider';
import Checkbox from 'material-ui/lib/checkbox';

export default class HeaderNewConversation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.open !== nextState.open) { return true; }
    if (this.state.disableSubmit !== nextState.disableSubmit) { return true; }
    if (this.props.teamSearchResultUsers !== nextProps.teamSearchResultUsers) { return true; }
    return false;
  }

  handleOpen(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
      stage: 0,
      convoName: '',
      usersToAdd: [],
      disableSubmit: true,
    });
  }

  handleClose() {
    this.setState({open: false});
  }

  handleSubmit() {
    const {addConvo} = this.props;
    const {convoName, usersToAdd} = this.state;
    addConvo(convoName, usersToAdd);
    this.handleClose();
  }

  handleConvoNameChange(event) {
    const input = event.target.value;
    this.setState({
      convoName: input
    }, this.updateSubmitBtnStatus);
  }

  handleCheckboxChange(event, checked) {
    const targetId = event.target.value;
    if (checked) {        // add user to state
      this.setState({
        usersToAdd: this.state.usersToAdd.concat([ targetId ])
      }, this.updateSubmitBtnStatus);
    } else {              // remove user from state
      var newData = this.state.usersToAdd.slice();
      newData.splice(newData.indexOf(targetId), 1);
      this.setState({
        usersToAdd: newData
      }, this.updateSubmitBtnStatus);
    }
  }

  handleSearchTextChange(event) {
    const input = event.target.value;
    const {searchTeamUsers} = this.props;
    searchTeamUsers(input);
  }

  updateSubmitBtnStatus() {
    const convoName = this.state.convoName;
    const userList = this.state.usersToAdd;
    this.setState({
      disableSubmit: !userList.length || (convoName === '')
    });
  }

  render() {
    const {teamSearchResultUsers} = this.props;

    const actions = [
      <FlatButton
      label="Cancel"
      secondary={true}
      onClick={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleSubmit.bind(this)}
        disabled={this.state.disableSubmit}
      />,
    ];
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
          title="New Conversation"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent
        >
          <div className="modal-step">
            1. Enter a name for your new conversation.<br />
            <TextField
              hintText="Sales Report, Issue #24, etc."
              floatingLabelText="Conversation Name"
              onChange={this.handleConvoNameChange.bind(this)}
              // onEnterKeyDown={this.moveForward}
              defaultValue={this.state.convoName}
              ref="convoNameInput"
            />
          </div>
          <div>
            <div className="modal-step">
            2. Choose who should be included in this conversation.
              <TextField
                hintText="Username, Email, etc."
                floatingLabelText="Type here to search"
                onChange={this.handleSearchTextChange.bind(this)}
              />
            </div>
            <div style={{maxHeight: '420px', overflowY: 'scroll', width: '420px'}}>
              <List>
              {
                teamSearchResultUsers.map(user => {
                  return (
                    <ListItem
                      key={user._id}
                      rightToggle={<Checkbox value={user._id} onCheck={this.handleCheckboxChange.bind(this)}/>}
                      primaryText={user.username}
                      leftAvatar={<Avatar src="https://www.placecage.com/100/100" />}
                    />
                  );
                })
              }
              </List>
            </div>
          </div>
        </Dialog>

      </div>
    );
  }
}
HeaderNewConversation.defaultProps = {
  teamSearchResultUsers: []
};
