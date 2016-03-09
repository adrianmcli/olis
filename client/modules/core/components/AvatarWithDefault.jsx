import React from 'react';
import R from 'ramda';

import Avatar from 'material-ui/lib/avatar';

import AccountUtils from '/client/modules/core/libs/account';

export default class AvatarWithDefault extends React.Component {
  render() {
    const {avatarSrc, username, onClick, size, pointer, isInListItem} = this.props;
    const avatarString = avatarSrc ? null : R.take(2, username);

    const defaultStyle = {
      cursor: pointer ? 'pointer' : 'inherit',
    };

    const inListStyle = {
      position: 'absolute',
      top: '8px',
      left: '16px',
    };

    const avatarStyle = isInListItem ? R.merge(defaultStyle, inListStyle) : defaultStyle;

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
  isInListItem: false,
};
