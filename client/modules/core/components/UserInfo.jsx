import React from 'react';

import AvatarWithDefault from '/client/modules/core/components/AvatarWithDefault.jsx';

export default class UserInfo extends React.Component {

  renderUserInfo() {
    const {user, showButtons, buttons} = this.props;
    return (
      <div>
        <AvatarWithDefault
          size={128}
          username={user.displayName}
          avatarSrc={user.profileImageUrl}
        />
        <div style={{color: '#666', padding: '6px', marginTop: '6px'}}>{user.displayName}</div>
        <div>{user.description}</div>
        {showButtons ? buttons : null}
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
