import React from 'react';

import TextField from 'material-ui/lib/text-field';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';

export default class PeopleList extends React.Component {

  focusSearchBar() {
    this._searchField.focus();
  }

  handleChange(e) {
    const value = e.target.value;
    const {search} = this.props;
    search(value);
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
            onChange={this.handleChange.bind(this)}
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
          { this.renderListItems.bind(this)() }
        </List>
      </div>
    );
  }

  renderListItems() {
    const {users} = this.props;
    return users.map( user => {
      return (
        <div key={user._id}>
          <ListItem
            primaryText={user.username}
            // rightIcon={x === 3 ? this.renderBadge('Admin') : null}
            secondaryText={'iamsocool@gmail.com'}
            leftAvatar={<Avatar src="https://www.placecage.com/100/100" />}
            onClick={() => {alert(`fire an action to show me: ${user.username}`);}}
          />
          <Divider inset={true} />
        </div>
      );
    });
  }

  renderBadge(text, bgColor, color) {
    const style = {
      width: 'auto',
      height: 'auto',
      position: 'absolute',
      right: '4px',
      padding: '4px 6px',
      backgroundColor: bgColor ? bgColor : '#00BCD4',
      color: color ? color : 'white',
      borderRadius: '3px',
      fontSize: '12px',
    };
    return (
      <div style={style}>{ text }</div>
    );
  }

  render() {
    return (
      <div>
        { this.renderSearchBar() }
        { this.renderList() }
      </div>
    );
  }
}
PeopleList.defaultProps = {
  users: []
};
