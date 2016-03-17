import React from 'react';
import R from 'ramda';

import TextField from 'material-ui/lib/text-field';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

import PeopleIcon from 'material-ui/lib/svg-icons/social/people';

import Avatar from 'material-ui/lib/avatar';
import Chip from './Chip.jsx';

export default class PeoplePicker extends React.Component {

  _search(event) {
    const {search} = this.props;
    const value = event.target.value;
    search(value);
  }

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
            onChange={this._search.bind(this)}
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
    const {users, addUserId} = this.props;

    return users.map( user => {
      return (
        <div key={user._id}>
          <ListItem
            primaryText={user.username}
            secondaryText={user.emails[0].address}
            leftAvatar={<Avatar src="https://www.placecage.com/100/100" />}
            onClick={addUserId.bind(null, user._id)}
          />
          <Divider inset={true} />
        </div>
      );
    });
  }

  renderChipsContainer() {
    const numSelected = 0;
    if (numSelected === 0) {
      return (
        <div style={{
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
          padding: '16px',
        }}>
          <PeopleIcon
            style={{width: '64px', height: '64px'}}
            color="#aaa"
          />
          <h5>Selected participants will appear here!</h5>
        </div>
      );
    }
    return (
      <div style={{padding: '12px'}}>
        { this.renderChips() }
      </div>
    );
  }

  renderChips() {
    const {users, userIdsToAdd, removeUserId} = this.props;
    const addedUsers = R.filter(user => R.contains(user._id, userIdsToAdd), users);
    return addedUsers.map( user => {
      return (
        <div key={user._id} style={{marginBottom: '6px'}}>
          <Chip
            // NOTE: avatarSrc is optional, Chip can generate an avatar w/ the username alone
            avatarSrc='https://www.placecage.com/100/100'
            username={user.username}
            onRemoveClick={removeUserId.bind(null, user._id)}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <div style={{width: '360px', position: 'relative'}}>
          { this.renderSearchBar() }
          { this.renderList() }
        </div>
        <div style={{
          width: '240px',
          height: '432px',
          position: 'relative',
          overflowY: 'scroll',
        }}>
          { this.renderChipsContainer() }
        </div>
      </div>
    );
  }
}
PeoplePicker.defaultProps = {
  users: [],
  usersToAdd: []
};
