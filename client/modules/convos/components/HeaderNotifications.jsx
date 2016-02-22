import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import SocialNotifications from 'material-ui/lib/svg-icons/social/notifications';
import Popover from 'material-ui/lib/popover/popover';

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
          <h1>Notifications here</h1>
        </Popover>
      </div>
    );
  }
}
