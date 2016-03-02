import React from 'react';
import R from 'ramda';

import Avatar from 'material-ui/lib/avatar';
import Popover from 'material-ui/lib/popover/popover';

import IconButton from 'material-ui/lib/icon-button';
import ChatIcon from 'material-ui/lib/svg-icons/action/question-answer';
import InfoIcon from 'material-ui/lib/svg-icons/action/info';
import NoteIcon from 'material-ui/lib/svg-icons/action/note-add';

import AccountUtils from '/client/modules/core/libs/account';

export default class AvatarWithInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    const {
      avatarSrc, username
    } = this.props;

    const avatarString = avatarSrc ? null : R.take(2, username);

    return (
      <div>
        <Avatar
          size={51}
          src={avatarSrc}
          onClick={this.handleOpen.bind(this)}
          style={{cursor: 'pointer'}}
          backgroundColor={AccountUtils.convertStringToColor(username)}
        >
          {avatarString}
        </Avatar>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'middle', vertical: 'top'}}
          useLayerForClickAway={false}
          onRequestClose={this.handleClose.bind(this)}
        >
          <div style={{padding: '32px', textAlign: 'center', width: '200px'}}>
            <Avatar
              size={128}
              src={avatarSrc}
              onClick={this.handleOpen.bind(this)}
              style={{cursor: 'pointer'}}
              backgroundColor={AccountUtils.convertStringToColor(username)}
            >
              {avatarString}
            </Avatar>
            <div style={{fontSize: '18px',lineHeight: '24px'}}>Nicky Cage</div>
            <div style={{fontSize: '12px',lineHeight: '16px'}}>I like tuna sandwiches.</div>
            <div style={{display: 'flex'}}>
              <IconButton tooltip="Private Message">
                <ChatIcon color="rgba(0,0,0,0.7)"/>
              </IconButton>
              <IconButton tooltip="More Info">
                <InfoIcon color="rgba(0,0,0,0.7)"/>
              </IconButton>
              <IconButton tooltip="Notes">
                <NoteIcon color="rgba(0,0,0,0.7)"/>
              </IconButton>
            </div>
          </div>
        </Popover>
      </div>
    );
  }
}
AvatarWithInfo.defaultProps = {
  username: 'Nicky Cage'
};
