import React from 'react';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import AddPeople from './ChatMenuItems/AddPeople.jsx';
import ChangeTitle from './ChatMenuItems/ChangeTitle.jsx';
import ChatInfo from './ChatMenuItems/ChatInfo.jsx';

import PersonAdd from 'material-ui/lib/svg-icons/social/person-add';
import EditTitle from 'material-ui/lib/svg-icons/content/create';
import InfoIcon from 'material-ui/lib/svg-icons/action/info';
import ArchiveIcon from 'material-ui/lib/svg-icons/content/archive';

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
          primaryText="Add people"
          onTouchTap={this.openAddPeople.bind(this)}
          rightIcon={<PersonAdd />}
        />
        <MenuItem
          primaryText="Change title"
          onTouchTap={this.openChangeTitle.bind(this)}
          rightIcon={<EditTitle />}
        />
        <MenuItem
          primaryText="Chat info"
          onTouchTap={this.openChatInfo.bind(this)}
          rightIcon={<InfoIcon />}
        />
        <MenuItem
          primaryText="Archive chat"
          rightIcon={<ArchiveIcon />}
          disabled
        />
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
