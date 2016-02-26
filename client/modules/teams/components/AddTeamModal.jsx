import React from 'react';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import TextField from 'material-ui/lib/text-field';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Divider from 'material-ui/lib/divider';
import Checkbox from 'material-ui/lib/checkbox';

export default class AddTeamModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: event.currentTarget,
      stage: 0,
      teamName: '',
      usersToAdd: [],
      disableSubmit: true,
    };
  }

  handleTeamNameChange(event) {
    const input = event.target.value;
    this.setState({
      teamName: input
    }, this.updateSubmitBtnStatus.bind(this));
  }

  handleCheckboxChange(event, checked) {
    const targetId = event.target.value;
    if (checked) {        // add user to state
      this.setState({ 
        usersToAdd: this.state.usersToAdd.concat([targetId])
      }, this.updateSubmitBtnStatus.bind(this))
    } else {              // remove user from state
      var newData = this.state.usersToAdd.slice();
      newData.splice(newData.indexOf(targetId), 1);
      this.setState({
        usersToAdd: newData
      }, this.updateSubmitBtnStatus.bind(this));
    }
  }

  updateSubmitBtnStatus() {
    const teamName = this.state.teamName;
    const userList = this.state.usersToAdd;
    this.setState({
      disableSubmit: (teamName === '')
    });
  }

  handleSubmit() {
    const {onRequestClose, addTeam} = this.props;
    const {teamName, usersToAdd} = this.state;
    addTeam(teamName, usersToAdd);
    onRequestClose();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this.props.onRequestClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleSubmit.bind(this)}
        disabled={this.state.disableSubmit}
      />,
    ];
    return (
      <Dialog
        title={this.props.title}
        actions={actions}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        modal={false}
        autoScrollBodyContent
      >
        <div className="modal-step">
            1. Enter a name for your new team.<br />
            <TextField
              hintText="ACME Corp - Marketing Department"
              floatingLabelText="Team Name"
              onChange={this.handleTeamNameChange.bind(this)}
              onEnterKeyDown={this.moveForward}
              defaultValue={this.state.teamName}
            />
          </div>
        <div>
          <div className="modal-step">
          2. (Optional) Choose who should be invited to this team. You may choose to do this later.
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
    );
  }
}