import React from 'react';

import AvatarWithDefault from '/client/modules/core/components/AvatarWithDefault.jsx';
import RaisedButton from 'material-ui/lib/raised-button';

export default class UserInfo extends React.Component {
  renderButtons() {
    const {user, makeAdmin, removeFromTeam} = this.props;
    return (
      <div>
        <RaisedButton
          label="Make Admin"
          secondary={true}
          style={{marginTop: '12px', width: '100%'}}
          onClick={makeAdmin.bind(null, user._id)}
        />
        <RaisedButton
          label="Remove"
          primary={true}
          style={{marginTop: '12px', width: '100%'}}
          onClick={removeFromTeam.bind(null, user._id)}
        />
      </div>
    );
  }

  renderUserInfo() {
    const {user, showButtons} = this.props;
    return (
      <div>
        <AvatarWithDefault
          size={128}
          username={user.username}
          avatarSrc={user.profileImageUrl}
        />
        <div style={{fontSize: '18px',lineHeight: '24px'}}>{user.username}</div>
        {showButtons ? this.renderButtons() : null}
      </div>
    );
  }

  renderNoUser() {
    return (
      <div>Select a team member to see more info.</div>
    );
  }

  render() {
    const {user} = this.props;
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
    return (
      <div style={containerStyle}>
        <div style={{padding: '32px', textAlign: 'center'}}>
          {user ? this.renderUserInfo() : this.renderNoUser()}
        </div>
      </div>
    );
  }
}
UserInfo.defaultProps = {
  showButtons: false,
  makeAdmin(userId = 'defaultUserId') { console.log(`Make ${userId} an admin`); },
  removeFromTeam(userId = 'defaultUserId') { console.log(`Remove ${userId} from team.`); }
};
