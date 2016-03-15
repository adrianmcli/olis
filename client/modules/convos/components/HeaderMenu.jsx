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
import LogoutIcon from 'material-ui/lib/svg-icons/action/exit-to-app';

import InviteToTeam from './HeaderMenuItems/InviteToTeam.jsx';
import TeamDirectory from './HeaderMenuItems/TeamDirectory.jsx';
import TeamInfo from './HeaderMenuItems/TeamInfo.jsx';

class HeaderMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      inviteToTeamOpen: false,
      teamDirectoryOpen: false,
      teamInfoOpen: false,
    };
  }

  openInviteToTeam() {setTimeout(() => {
    this.setState({inviteToTeamOpen: true});
  }, 200);}
  closeInviteToTeam() {this.setState({inviteToTeamOpen: false});}

  openTeamDirectory() {setTimeout(() => {
    this.setState({teamDirectoryOpen: true});
  }, 200);}
  closeTeamDirectory() {this.setState({teamDirectoryOpen: false});}

  openTeamInfo() {setTimeout(() => {
    this.setState({teamInfoOpen: true});
  }, 200);}
  closeTeamInfo() {this.setState({teamInfoOpen: false});}

  handleOpen(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleClose() {
    this.setState({open: false});
  }

  handleItemTouchTap(event, child) {
    setTimeout(() => {
      this.handleClose.bind(this)();
      // TODO - do the thing the user wants
      console.log('You have selected: ' + child.props.primaryText);

      if (child.props.onClick) { child.props.onClick(); }
    }, 200);
  }

  renderMyAccountMenuItem() {
    const { username, goToMyAccount, profileImageUrl } = this.props;
    return (
      <MenuItem style={{paddingTop: '12px',paddingBottom: '12px'}} onClick={goToMyAccount}>
        <div style={{display: 'flex'}}>
          <AvatarWithDefault size={72} avatarSrc={profileImageUrl} username={username} />
          <div style={{padding: '12px'}}>
            <div className="menu-name">{username}</div>
            <div className="menu-my-account">My Account</div>
          </div>
        </div>
      </MenuItem>
    );
  }

  renderLogout() {
    const { logout } = this.props;
    // return (
    //   <MenuItem innerDivStyle={{background: 'white'}}>
    //     <div style={{display: 'flex'}}>
    //       <RaisedButton
    //         label="Logout"
    //         primary={true}
    //         style={{lineHeight: '36px'}}
    //         labelStyle={{verticalAlign: 'middle'}}
    //         labelPosition="before"
    //         icon={<LogoutIcon />}
    //         fullWidth
    //         onClick={logout}
    //       />
    //     </div>
    //   </MenuItem>
    // );
    return (
      <MenuItem
        primaryText="Logout"
        leftIcon={<LogoutIcon />}
        onClick={ logout }
      />
    );
  }

  renderDialogs() {
    return (
      <div>
        <InviteToTeam
          open={this.state.inviteToTeamOpen}
          onRequestClose={this.closeInviteToTeam.bind(this)}
        />
        <TeamDirectory
          open={this.state.teamDirectoryOpen}
          onRequestClose={this.closeTeamDirectory.bind(this)}
        />
        <TeamInfo
          open={this.state.teamInfoOpen}
          onRequestClose={this.closeTeamInfo.bind(this)}
        />
      </div>
    );
  }

  renderMenu() {
    const { isAdmin, goToTeamSettings } = this.props;
    return (
      <Menu
        className="header-menu"
        style={{position: 'relative'}}
        zDepth={0}
        onItemTouchTap={this.handleItemTouchTap.bind(this)}
      >
        { this.renderMyAccountMenuItem() }
        <Divider />
        <MenuItem
          primaryText="Invite to team"
          leftIcon={<AddPersonIcon />}
          onClick={this.openInviteToTeam.bind(this)}
        />
        <MenuItem
          primaryText="Team directory"
          leftIcon={<TeamDirIcon />}
          onClick={this.openTeamDirectory.bind(this)}
        />
        <MenuItem
          primaryText="Team info"
          leftIcon={<TeamInfoIcon />}
          onClick={this.openTeamInfo.bind(this)}
        />
        {isAdmin ?
          <MenuItem
            primaryText="Team settings"
            leftIcon={<TeamSettingsIcon />}
            onClick={goToTeamSettings}
          /> : null
        }
        <Divider />
        { this.renderLogout() }
      </Menu>
    );
  }

  render() {
    const { teamName } = this.props;
    return (
      <div style={{flexGrow: '1'}}>
        <div className="team-name" onClick={this.handleOpen.bind(this)}>
          <span>{teamName}<i className="fa fa-fw fa-caret-down" /></span>
        </div>
        { this.renderDialogs() }
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          useLayerForClickAway={false}
          onRequestClose={this.handleClose.bind(this)}
        >
          { this.renderMenu() }
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
