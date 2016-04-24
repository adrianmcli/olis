import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import SocialNotifications from 'material-ui/lib/svg-icons/social/notifications';
import Popover from 'material-ui/lib/popover/popover';
import Badge from 'material-ui/lib/badge';

import TitleCounter from 'notification-count';
import FaviconNotification from 'favicon-notification';

import NotificationList from './NotificationList.jsx';

export default class HeaderNotifications extends React.Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   const {open} = this.state;
  //   return (
  //     open ||
  //     open !== nextState.open
  //   );
  // }

  componentWillReceiveProps(nextProps) {
    const before = this.props.notifications.length;
    const after = nextProps.notifications.length;
    if (before !== after) {
      let titleCount = new TitleCounter();
      titleCount.set(after);

      if (after > 0) FaviconNotification.add();
      if (after === 0) {
        try { FaviconNotification.remove(); }
        catch (err) { console.log(err); }
      }
      if (after > before) {
        if (!this.props.muteSound) {
          // make audible alert
          // init bunch of sounds
          ion.sound({
            sounds: [
              // {name: 'beer_can_opening'},
              {name: 'button_tiny'},
            ],
            // main config
            path: '/sounds/',
            preload: true,
            multiplay: true,
            volume: 0.9
          });

          // play sound
          ion.sound.play('button_tiny');
          // fire native alert
        }
      }
    }
  }

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

  renderIcon() {
    const iconColor = 'white';
    const badgeStyle = {
      top: '0',
      right: '0',
      pointerEvents: 'none',
      transform: 'scale(0.8)',
    };
    const numNotifications = this.props.notifications.length;
    let iconButton = (
      <IconButton
        onClick={this.handleOpen.bind(this)}
        tooltip="Notifications"
      >
        <SocialNotifications color={iconColor} />
      </IconButton>
    );

    if (numNotifications > 0) {
      iconButton = (
        <Badge
          badgeContent={numNotifications}
          primary={true}
          style={{padding: '0',display: 'block'}}
          badgeStyle={badgeStyle}
        >
          { iconButton }
        </Badge>
      );
    }
    return iconButton;
  }

  render() {
    const {notifications, clickNotification} = this.props;
    return (
      <div>
        <div className="header-icon">
          { this.renderIcon.bind(this)() }
        </div>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'middle', vertical: 'top'}}
          useLayerForClickAway={false}
          onRequestClose={this.handleClose.bind(this)}
        >
        <div style={{maxHeight: '480px'}}>
          <NotificationList
            notifications={notifications}
            clickNotification={clickNotification}
            closePopoverFunction={this.handleClose.bind(this)}
          />
        </div>
        </Popover>
      </div>
    );
  }
}
HeaderNotifications.defaultProps = {
  notifications: []
};
