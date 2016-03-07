import React from 'react';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import AddPeople from './ChatMenuItems/AddPeople.jsx';
import ChangeTitle from './ChatMenuItems/ChangeTitle.jsx';
import ChatInfo from './ChatMenuItems/ChatInfo.jsx';

export default class ChatMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addPeopleOpen: false,
      changeTitleOpen: false,
      chatInfoOpen: false,
    };
  }

  openAddPeople() {this.setState({addPeopleOpen: true});}
  closeAddPeople() {this.setState({addPeopleOpen: false});}

  openChangeTitle() {this.setState({changeTitleOpen: true});}
  closeChangeTitle() {this.setState({changeTitleOpen: false});}

  openChatInfo() {this.setState({chatInfoOpen: true});}
  closeChatInfo() {this.setState({chatInfoOpen: false});}

  render() {
    return (
      <div>
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem
          primaryText="Add people to chat"
          onTouchTap={this.openAddPeople.bind(this)}
        />
        <MenuItem
          primaryText="Change title"
          onTouchTap={this.openChangeTitle.bind(this)}
        />
        <MenuItem
          primaryText="Chat info"
          onTouchTap={this.openChatInfo.bind(this)}
        />
        <MenuItem primaryText="Archive chat" disabled/>
      </IconMenu>

        {/* Place all modal components here */}
        <AddPeople
          open={this.state.addPeopleOpen}
          onRequestClose={this.closeAddPeople.bind(this)}
        />
        <ChangeTitle
          open={this.state.changeTitleOpen}
          onRequestClose={this.closeChangeTitle.bind(this)}
        />
        <ChatInfo
          open={this.state.chatInfoOpen}
          onRequestClose={this.closeChatInfo.bind(this)}
        />
      </div>
    );
  }
}
