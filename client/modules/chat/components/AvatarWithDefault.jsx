import React from 'react';
import R from 'ramda';

import Avatar from 'material-ui/lib/avatar';
import AccountUtils from '/client/modules/core/libs/account';

export default class AvatarWithDefault extends React.Component {
  render() {
    const {avatarSrc, username, onClick} = this.props;
    const avatarString = avatarSrc ? null : R.take(2, username);
    return (
      <div>
        <Avatar
          size={51}
          src={avatarSrc}
          style={{cursor: 'pointer'}}
          backgroundColor={AccountUtils.convertStringToColor(username)}
          onClick={onClick}
        >
          {avatarString}
        </Avatar>
      </div>
    );
  }
}
AvatarWithDefault.defaultProps = {
  username: 'Nicky Cage'
};
