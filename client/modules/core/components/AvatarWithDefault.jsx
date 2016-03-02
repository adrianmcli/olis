import React from 'react';
import R from 'ramda';

import Avatar from 'material-ui/lib/avatar';

import AccountUtils from '/client/modules/core/libs/account';

export default class AvatarWithDefault extends React.Component {
  render() {
    const {avatarSrc, username, onClick, size} = this.props;
    const avatarString = avatarSrc ? null : R.take(2, username);

    return (
      <div>
        <Avatar
          size={size}
          src={avatarSrc}
          onClick={onClick}
          style={{cursor: 'pointer'}}
          backgroundColor={AccountUtils.convertStringToColor(username)}
        >
          {avatarString}
        </Avatar>
      </div>
    );
  }
}
AvatarWithDefault.defaultProps = {
  username: 'Nicky Cage',
  onClick: () => console.log('avatar has been clicked')
};
