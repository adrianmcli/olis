import React from 'react';
import R from 'ramda';

import IconButton from 'material-ui/lib/icon-button';
import SocialNotifications from 'material-ui/lib/svg-icons/social/notifications';
import Popover from 'material-ui/lib/popover/popover';

import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

export default class HeaderNotifications extends React.Component {
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
    const iconColor = 'white';
    const {notifications, clickNotification} = this.props;
    return (
      <div>
        <div className="header-icon">
          <IconButton
            onClick={this.handleOpen.bind(this)}
            tooltip="Notifications"
          >
            <SocialNotifications color={iconColor} />
          </IconButton>
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
          {notifications.map(notif => {
            return (
              <ListItem
                primaryText="Q4 Sales Report"
                secondaryText={
                  <span><span style={{color: '#00bcd4'}}>{R.last(notif.recentUsernames)} </span>
                   has commented in
                   <span style={{color: '#00bcd4'}}> {notif.convoName}</span>.
                  </span>
                }
                leftAvatar={<Avatar src="https://www.placecage.com/100/100" />}
                onTouchTap={clickNotification.bind(null, notif._id, notif.teamId, notif.convoId)}
              />
            );
          })}
        </div>
        </Popover>
      </div>
    );
  }
}
HeaderNotifications.defaultProps = {
  notifications: []
};
