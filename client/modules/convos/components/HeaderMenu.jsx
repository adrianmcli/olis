import React from 'react';
import Popover from 'material-ui/lib/popover/popover';

import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Divider from 'material-ui/lib/divider';

import Avatar from 'material-ui/lib/avatar';
import RaisedButton from 'material-ui/lib/raised-button';

import AddPersonIcon from 'material-ui/lib/svg-icons/social/person-add';
import TeamDirIcon from 'material-ui/lib/svg-icons/action/list';
import TeamInfoIcon from 'material-ui/lib/svg-icons/action/info';
import TeamSettingsIcon from 'material-ui/lib/svg-icons/action/settings';
// import LogoutIcon from 'material-ui/lib/svg-icons/action/power-settings-new';
import LogoutIcon from 'material-ui/lib/svg-icons/action/exit-to-app';

export default class HeaderMenu extends React.Component {

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

  componentWillUnmount() {
    if (this.timerCloseId) {
      clearTimeout(this.timerCloseId);
    }
  }

  handleItemTouchTap(event, child) {
    this.timerCloseId = setTimeout(() => {
      this.handleClose.bind(this)();
      // TODO - do the thing the user wants
      console.log('You have selected: ' + child.props.primaryText);
    }, 200);
  }

  render() {
    return (
      <div style={{flexGrow: '1'}}>
        <div className="team-name" onClick={this.handleOpen.bind(this)}>
          <span>The A Team <i className="fa fa-fw fa-caret-down" /></span>
        </div>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          useLayerForClickAway={false}
          onRequestClose={this.handleClose.bind(this)}
        >
          <Menu
            className="header-menu"
            style={{position: 'relative'}}
            zDepth={0}
            onItemTouchTap={this.handleItemTouchTap.bind(this)}
          >
            <MenuItem style={{paddingTop: '12px', paddingBottom: '12px'}}>
              <div style={{display: 'flex'}}>
                <Avatar size={72} src={'http://www.fillmurray.com/200/201'} />
                <div style={{padding: '12px'}}>
                  <div className="menu-name">Billy Murray</div>
                  <div className="menu-my-account">My Account</div>
                </div>
              </div>
            </MenuItem>
            <Divider />
            <MenuItem primaryText="Invite to team" leftIcon={<AddPersonIcon />}/>
            <MenuItem primaryText="Team directory" leftIcon={<TeamDirIcon />}/>
            <MenuItem primaryText="Team info" leftIcon={<TeamInfoIcon />}/>
            <MenuItem primaryText="Team settings" leftIcon={<TeamSettingsIcon />}/>
            <Divider />
            <MenuItem innerDivStyle={{background: 'white'}}>
              <div style={{display: 'flex'}}>
                <RaisedButton
                  label="Logout"
                  primary={true}
                  style={{width: '100%',height: 'auto'}}
                  labelPosition="before"
                  icon={<LogoutIcon />}
                />
              </div>
            </MenuItem>
          </Menu>
        </Popover>
      </div>
    );
  }
}
HeaderMenu.timerCloseId = undefined;
