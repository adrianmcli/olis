import React from 'react';
import R from 'ramda';

import Avatar from 'material-ui/lib/avatar';

import AccountUtils from '/client/modules/core/libs/account';

export default class AvatarWithDefault extends React.Component {
  render() {
    const {avatarSrc, username, onClick, size, pointer} = this.props;
    const avatarString = avatarSrc ? null : R.take(2, username);

    const avatarStyle = {
      cursor: pointer ? 'pointer' : 'inherit',
    };

    return (
      <Avatar
        size={size}
        src={avatarSrc}
        onClick={onClick}
        style={avatarStyle}
        backgroundColor={AccountUtils.convertStringToColor(username)}
      >
        {avatarString}
      </Avatar>
    );
  }
}
AvatarWithDefault.defaultProps = {
  size: 40,
  username: 'Nicky Cage',
  onClick: () => console.log('avatar has been clicked'),
  pointer: true,
};
