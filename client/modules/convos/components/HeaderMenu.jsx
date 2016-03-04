import React from 'react';
import Popover from 'material-ui/lib/popover/popover';

import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Divider from 'material-ui/lib/divider';

import AvatarWithDefault from '/client/modules/core/components/AvatarWithDefault.jsx';

import AddPersonIcon from 'material-ui/lib/svg-icons/social/person-add';
import TeamDirIcon from 'material-ui/lib/svg-icons/action/list';
import TeamInfoIcon from 'material-ui/lib/svg-icons/action/info';
import TeamSettingsIcon from 'material-ui/lib/svg-icons/action/settings';

import RaisedButton from 'material-ui/lib/raised-button';
import LogoutIcon from 'material-ui/lib/svg-icons/action/exit-to-app';

class HeaderMenu extends React.Component {
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

      if (child.props.onClick) { child.props.onClick(); }
    }, 200);
  }

  render() {
    const {username, profileImageUrl, teamName, logout, 
      goToMyAccount, goToTeamSettings, isAdmin} = this.props;
    return (
      <div style={{flexGrow: '1'}}>
        <div className="team-name" onClick={this.handleOpen.bind(this)}>
          <span>{teamName}<i className="fa fa-fw fa-caret-down" /></span>
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
            <MenuItem style={{paddingTop: '12px',paddingBottom: '12px'}} onClick={goToMyAccount}>
              <div style={{display: 'flex'}}>
                <AvatarWithDefault size={72} avatarSrc={profileImageUrl} username={username} />
                <div style={{padding: '12px'}}>
                  <div className="menu-name">{username}</div>
                  <div className="menu-my-account">My Account</div>
                </div>
              </div>
            </MenuItem>
            <Divider />
            <MenuItem primaryText="Invite to team" leftIcon={<AddPersonIcon />}/>
            <MenuItem primaryText="Team directory" leftIcon={<TeamDirIcon />} disabled/>
            <MenuItem primaryText="Team info" leftIcon={<TeamInfoIcon />} disabled/>
            {isAdmin ?
              <MenuItem
                primaryText="Team settings"
                leftIcon={<TeamSettingsIcon />}
                onClick={goToTeamSettings}
              />
              :
              null
            }
            <Divider />
            <MenuItem innerDivStyle={{background: 'white'}}>
              <div style={{display: 'flex'}}>
                <RaisedButton
                  label="Logout"
                  primary={true}
                  style={{lineHeight: '36px'}}
                  labelStyle={{verticalAlign: 'middle'}}
                  labelPosition="before"
                  icon={<LogoutIcon />}
                  fullWidth
                  onClick={logout}
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
HeaderMenu.defaultProps = {
  username: 'John Doe',
  teamName: 'The A Team'
};
export default HeaderMenu;
