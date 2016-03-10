import React from 'react';

import TextField from 'material-ui/lib/text-field';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

import Avatar from 'material-ui/lib/avatar';

import IconButton from 'material-ui/lib/icon-button';
import ChatIcon from 'material-ui/lib/svg-icons/action/question-answer';
import InfoIcon from 'material-ui/lib/svg-icons/action/info';
import NoteIcon from 'material-ui/lib/svg-icons/action/note-add';
import AvatarWithDefault from '/client/modules/core/components/AvatarWithDefault.jsx';

export default class PeopleList extends React.Component {

  focusSearchBar() {
    this._searchField.focus();
  }

  renderSearchBar() {
    const containerStyle = {
      background: '#efefef',
      padding: '12px',
    };
    const inputBackgroundStyle = {
      background: 'white',
      borderRadius: '6px',
      padding: '0 12px',
    };
    return (
      <div style={ containerStyle }>
        <div style={ inputBackgroundStyle }>
          <TextField
            hintText="Search with Username, Email, etc."
            ref={ x => this._searchField = x }
            fullWidth
          />
        </div>
      </div>
    );
  }

  renderList() {
    return (
      <div style={{
        borderRight: '1px solid rgba(0,0,0,0.15)',
        height: '360px',
        overflowY: 'scroll',
        position: 'relative',
      }}>
        <List style={{paddingTop: '0'}}>
          { this.renderListItems() }
        </List>
      </div>
    );
  }

  renderListItems() {
    const input = [ 1, 2, 3, 4, 5, 6, 7 , 8, 9, 10 ];
    return input.map( x => {
      return (
        <div>
          <ListItem
            primaryText={`nickyCage ${x}`}
            secondaryText={'iamsocool@gmail.com'}
            leftAvatar={<Avatar src="https://www.placecage.com/100/100" />}
            onClick={() => {alert(`fire an action to show me: nickyCage${x}`);}}
          />
          <Divider inset={true} />
        </div>
      );
    });
  }

  renderUserInfo() {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      position: 'absolute',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      color: '#aaa',
    };
    // <Avatar src="https://www.placecage.com/100/100" />
    const username = 'nickyCage';
    const avatarSrc = 'https://www.placecage.com/100/100';
    return (
      <div style={containerStyle}>
        <div style={{padding: '32px', textAlign: 'center', width: '200px'}}>
          <AvatarWithDefault
            size={128}
            username={username}
            avatarSrc={avatarSrc}
          />
          <div style={{fontSize: '18px',lineHeight: '24px'}}>Nicky Cage</div>
          <div style={{fontSize: '12px',lineHeight: '16px'}}>I like tuna sandwiches.</div>
          <div style={{display: 'flex'}}>
            <IconButton tooltip="Private Message">
              <ChatIcon color="rgba(0,0,0,0.7)"/>
            </IconButton>
            <IconButton tooltip="More Info">
              <InfoIcon color="rgba(0,0,0,0.7)"/>
            </IconButton>
            <IconButton tooltip="Notes">
              <NoteIcon color="rgba(0,0,0,0.7)"/>
            </IconButton>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <div style={{width: '360px', position: 'relative'}}>
          { this.renderSearchBar() }
          { this.renderList() }
        </div>
        <div style={{
          width: '280px',
          height: '432px',
          position: 'relative',
          overflowY: 'scroll',
        }}>
          { this.renderUserInfo() }
        </div>
      </div>
    );
  }
}
