import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ActionQuestionAnswer from 'material-ui/lib/svg-icons/action/question-answer';

import Dialog from '/client/modules/core/components/Dialog.jsx';
import PeoplePicker from '/client/modules/core/components/PeoplePicker.jsx';

import TextField from 'material-ui/lib/text-field';

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
    const {searchTeamUsers} = this.props;
    this.setState({open: false, stage: 0});
    searchTeamUsers(null);
  }

  handleNext() {
    this.setState({
      stage: 1,
      convoName: this._textField.getValue(),
    });
    setTimeout(() => {
      this._peoplePicker.focusSearchBar();
    }, 500);
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
      teamUsersSearchResult, userIdsToAdd, addUserId, removeUserId, searchTeamUsers
    } = this.props;
    return (
      <PeoplePicker
        ref={ x => this._peoplePicker = x }
        users={teamUsersSearchResult}
        userIdsToAdd={userIdsToAdd}
        addUserId={addUserId}
        removeUserId={removeUserId}
        search={searchTeamUsers}
      />
    );
  }

  render() {
    const {addConvo, userIdsToAdd} = this.props;
    const {convoName} = this.state;

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
      submitFunc = () => { addConvo(convoName, userIdsToAdd); };
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

// import React from 'react';

// import IconButton from 'material-ui/lib/icon-button';
// import ActionQuestionAnswer from 'material-ui/lib/svg-icons/action/question-answer';

// import Dialog from 'material-ui/lib/dialog';
// import FlatButton from 'material-ui/lib/flat-button';

// import TextField from 'material-ui/lib/text-field';
// import List from 'material-ui/lib/lists/list';
// import ListItem from 'material-ui/lib/lists/list-item';
// import Avatar from 'material-ui/lib/avatar';
// import Divider from 'material-ui/lib/divider';
// import Checkbox from 'material-ui/lib/checkbox';

// export default class HeaderNewConversation extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       open: false,
//     };
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     if (this.state.open !== nextState.open) { return true; }
//     if (this.state.disableSubmit !== nextState.disableSubmit) { return true; }
//     if (this.props.teamSearchResultUsers !== nextProps.teamSearchResultUsers) { return true; }
//     return false;
//   }

//   handleOpen(event) {
//     this.setState({
//       open: true,
//       anchorEl: event.currentTarget,
//       stage: 0,
//       convoName: '',
//       usersToAdd: [],
//       disableSubmit: true,
//     });
//   }

//   handleClose() {
//     const {searchTeamUsers} = this.props;
//     this.setState({open: false});
//     searchTeamUsers(null);
//   }

//   handleSubmit() {
//     const {addConvo} = this.props;
//     const {convoName, usersToAdd} = this.state;
//     addConvo(convoName, usersToAdd);
//     this.handleClose();
//   }

//   handleConvoNameChange(event) {
//     const input = event.target.value;
//     this.setState({
//       convoName: input
//     }, this.updateSubmitBtnStatus);
//   }

//   handleCheckboxChange(event, checked) {
//     const targetId = event.target.value;
//     if (checked) {        // add user to state
//       this.setState({
//         usersToAdd: this.state.usersToAdd.concat([ targetId ])
//       }, this.updateSubmitBtnStatus);
//     } else {              // remove user from state
//       var newData = this.state.usersToAdd.slice();
//       newData.splice(newData.indexOf(targetId), 1);
//       this.setState({
//         usersToAdd: newData
//       }, this.updateSubmitBtnStatus);
//     }
//   }

//   handleSearchTextChange(event) {
//     const input = event.target.value;
//     const {searchTeamUsers} = this.props;
//     searchTeamUsers(input);
//   }

//   updateSubmitBtnStatus() {
//     const convoName = this.state.convoName;
//     const userList = this.state.usersToAdd;
//     this.setState({
//       disableSubmit: !userList.length || (convoName === '')
//     });
//   }

//   render() {
//     const {teamSearchResultUsers} = this.props;

//     const actions = [
//       <FlatButton
//       label="Cancel"
//       secondary={true}
//       onClick={this.handleClose.bind(this)}
//       />,
//       <FlatButton
//         label="Submit"
//         primary={true}
//         onClick={this.handleSubmit.bind(this)}
//         disabled={this.state.disableSubmit}
//       />,
//     ];
//     return (
//       <div>
//         <div className="header-icon">
//           <IconButton
//             onClick={this.handleOpen.bind(this)}
//             tooltip="New Conversation"
//           >
//             <ActionQuestionAnswer color="white" />
//           </IconButton>
//         </div>

//         <Dialog
//           title="New Conversation"
//           actions={actions}
//           modal={false}
//           open={this.state.open}
//           onRequestClose={this.handleClose.bind(this)}
//           autoScrollBodyContent
//         >
//           <div className="modal-step">
//             1. Enter a name for your new conversation.<br />
//             <TextField
//               hintText="Sales Report, Issue #24, etc."
//               floatingLabelText="Conversation Name"
//               onChange={this.handleConvoNameChange.bind(this)}
//               // onEnterKeyDown={this.moveForward}
//               defaultValue={this.state.convoName}
//               ref="convoNameInput"
//             />
//           </div>
//           <div>
//             <div className="modal-step">
//             2. Choose who should be included in this conversation.
//               <TextField
//                 hintText="Username, Email, etc."
//                 floatingLabelText="Type here to search"
//                 onChange={this.handleSearchTextChange.bind(this)}
//               />
//             </div>
//             <div style={{maxHeight: '420px', overflowY: 'scroll', width: '420px'}}>
//               <List>
//               {
//                 teamSearchResultUsers.map(user => {
//                   return (
//                     <ListItem
//                       key={user._id}
//                       rightToggle={<Checkbox value={user._id} onCheck={this.handleCheckboxChange.bind(this)}/>}
//                       primaryText={user.username}
//                       leftAvatar={<Avatar src="https://www.placecage.com/100/100" />}
//                     />
//                   );
//                 })
//               }
//               </List>
//             </div>
//           </div>
//         </Dialog>

//       </div>
//     );
//   }
// }
// HeaderNewConversation.defaultProps = {
//   teamSearchResultUsers: []
// };