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
        usersToAdd: this.state.usersToAdd.concat([targetId])
      }, this.updateSubmitBtnStatus)
    } else {              // remove user from state
      var newData = this.state.usersToAdd.slice();
      newData.splice(newData.indexOf(targetId), 1);
      this.setState({
        usersToAdd: newData
      }, this.updateSubmitBtnStatus);
    }
  }

  updateSubmitBtnStatus() {
    const convoName = this.state.convoName;
    const userList = this.state.usersToAdd;
    this.setState({
      disableSubmit: !userList.length || (convoName === '')
    });
  }

  render() {
    const actions = [
      <FlatButton
      label="Cancel"
      secondary={true}
      onClick={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleClose.bind(this)}
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
              onEnterKeyDown={this.moveForward}
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
            />
          </div>
          <div style={{maxHeight:'420px', overflowY:'scroll', width: '420px'}}>
            <List>
              <ListItem
                rightToggle={<Checkbox value="Nicky_Cage_ID" onCheck={this.handleCheckboxChange.bind(this)}/>}
                primaryText="Nicky Cage"
                leftAvatar={<Avatar src="https://www.placecage.com/100/100" />}
              />
              <ListItem
                rightToggle={<Checkbox value="Billy_Joel_ID" onCheck={this.handleCheckboxChange.bind(this)}/>}
                primaryText={"Billy Joel"}
                leftAvatar={<Avatar src="https://www.placecage.com/102/101" />}
              />
              <ListItem
                rightToggle={<Checkbox value="Bruce_Willis_ID" onCheck={this.handleCheckboxChange.bind(this)}/>}
                primaryText="Bruce Willis"
                leftAvatar={<Avatar src="https://www.placecage.com/100/100" />}
              />
            </List>
          </div>
        </div>
        </Dialog>

      </div>
    );
  }
}