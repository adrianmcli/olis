import React from 'react';
import R from 'ramda';

import Avatar from 'material-ui/lib/avatar';
import PersonIcon from 'material-ui/lib/svg-icons/social/person';
import FontIcon from 'material-ui/lib/font-icon';

import AccountUtils from '/client/modules/core/libs/account';

export default class AvatarWithDefault extends React.Component {
  render() {
    const {avatarSrc, username, onClick, size, pointer, isInListItem, style} = this.props;
    // const avatarString = avatarSrc ? null : R.take(2, username);

    const defaultStyle = {
      cursor: pointer ? 'pointer' : 'inherit',
    };

    const inListStyle = {
      position: 'absolute',
      top: '8px',
      left: '16px',
    };

    const iconStyle = {
      width: '70%',
      height: '70%',
      margin: '12%',
    };

    const initAvatarStyle = isInListItem ? R.merge(defaultStyle, inListStyle) : defaultStyle;
    const avatarStyle = R.merge(initAvatarStyle, style);

    return (
      <Avatar
        size={size}
        src={avatarSrc}
        onClick={onClick}
        style={avatarStyle}
        backgroundColor={AccountUtils.convertStringToColor(username)}
        icon={<PersonIcon style={iconStyle} />}
      >
      </Avatar>
    );
  }
}
AvatarWithDefault.defaultProps = {
  size: 40,
  username: 'Nicky Cage',
  onClick: () => console.log('avatar has been clicked'),
  pointer: false,
  isInListItem: false,
};
