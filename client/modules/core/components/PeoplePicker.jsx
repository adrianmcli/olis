import React from 'react';

import TextField from 'material-ui/lib/text-field';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

import PeopleIcon from 'material-ui/lib/svg-icons/social/people';

import Avatar from 'material-ui/lib/avatar';
import Chip from './Chip.jsx';

export default class PeoplePicker extends React.Component {

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
            onClick={() => {alert(`add me. my name is: nickyCage${x}`);}}
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
    const input = [ 1, 2, 3, 4, 5, 6, 7 , 8, 9, 10, 12, 13, 14, 15 ];
    return input.map( x => {
      return (
        <div style={{marginBottom: '6px'}}>
          <Chip
            // NOTE: avatarSrc is optional, Chip can generate an avatar w/ the username alone
            avatarSrc='https://www.placecage.com/100/100'
            username={`nickyCage${x}`}
            onRemoveClick={() => {alert(`remove nickCage${x}`);}}
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
          width: '180px',
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
