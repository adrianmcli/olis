import React from 'react';

import AvatarWithDefault from '/client/modules/core/components/AvatarWithDefault.jsx';
import RaisedButton from 'material-ui/lib/raised-button';

export default class UserInfo extends React.Component {

  render() {
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
        <div style={{padding: '32px', textAlign: 'center'}}>
          <AvatarWithDefault
            size={128}
            username={username}
            avatarSrc={avatarSrc}
          />
          <div style={{fontSize: '18px',lineHeight: '24px'}}>Nicky Cage</div>
          <div style={{fontSize: '12px',lineHeight: '16px'}}>I like tuna sandwiches.</div>
          <RaisedButton
            label="Make Admin"
            secondary={true}
            style={{marginTop: '12px', width: '100%'}}
          />
          <RaisedButton
            label="Remove"
            primary={true}
            style={{marginTop: '12px', width: '100%'}}
          />
        </div>
      </div>
    );
  }
}
