import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import AddPeople from '../containers/add_people';
import ChangeConvoName from '../containers/change_convo_name';
import ChatMembers from '../containers/chat_members';

import PersonAdd from 'material-ui/lib/svg-icons/social/person-add';
import EditTitle from 'material-ui/lib/svg-icons/content/create';
import ChatMembersIcon from 'material-ui/lib/svg-icons/social/people';
import ArchiveIcon from 'material-ui/lib/svg-icons/content/archive';

export default class ChatMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addPeopleOpen: false,
      changeTitleOpen: false,
      chatMembersOpen: false,
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  openAddPeople() {this.setState({addPeopleOpen: true});}
  closeAddPeople() {this.setState({addPeopleOpen: false});}

  openChangeTitle() {this.setState({changeTitleOpen: true});}
  closeChangeTitle() {this.setState({changeTitleOpen: false});}

  openChatMembers() {this.setState({chatMembersOpen: true});}
  closeChatMembers() {this.setState({chatMembersOpen: false});}

  renderDialogs() {
    return (
      <div>
        <AddPeople
          open={this.state.addPeopleOpen}
          onRequestClose={this.closeAddPeople.bind(this)}
        />
        <ChangeConvoName
          open={this.state.changeTitleOpen}
          onRequestClose={this.closeChangeTitle.bind(this)}
        />
        <ChatMembers
          open={this.state.chatMembersOpen}
          onRequestClose={this.closeChatMembers.bind(this)}
        />
      </div>
    );
  }

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
          leftIcon={<PersonAdd />}
        />
        <MenuItem
          primaryText="Change title"
          onTouchTap={this.openChangeTitle.bind(this)}
          leftIcon={<EditTitle />}
        />
        <MenuItem
          primaryText="Chat members"
          onTouchTap={this.openChatMembers.bind(this)}
          leftIcon={<ChatMembersIcon />}
        />
        <MenuItem
          primaryText="Archive chat"
          leftIcon={<ArchiveIcon />}
          disabled
        />
      </IconMenu>
        { this.renderDialogs() }
      </div>
    );
  }
}
