import React from 'react';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import SearchBar from '/client/modules/search/components/SearchBar.jsx';

export default class PeopleList extends React.Component {
  renderListItems() {
    const {users, userClickHandler, team} = this.props;
    return users.map( user => {
      return (
        <div key={user._id}>
          <ListItem
            primaryText={user.username}
            rightIcon={team.isUserAdmin(user._id) ? this.renderBadge('Admin') : null}
            secondaryText={user.emails[0].address}
            leftAvatar={<Avatar src="https://www.placecage.com/100/100" />}
            onClick={userClickHandler.bind(this, user._id)}
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
    const {search} = this.props;
    return (
      <div>
        <SearchBar search={search} />
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
      </div>
    );
  }
}
PeopleList.defaultProps = {
  users: [],
  userClickHandler: user => console.log(`You clicked ${user.username}`),
  team: {
    isUserAdmin() { return false; }
  }
};
