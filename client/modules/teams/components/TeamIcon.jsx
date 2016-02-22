import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Badge from 'material-ui/lib/badge';

export default class TeamIcon extends React.Component {
  handleClick(e) {
    console.log('User has clicked team: ' + this.props.teamName);
    // TODO - make sure the team ID is passed into this component
    // TODO - fire an action to reflect the fact that user wants
    //        to switch teams to that team ID
  }

  render() {
    const {
      teamName,
      iconSrc,
      unread,
      unreadCount,
      active,
    } = this.props;

    const activeClass = active ? ' active' : '';
    const iconButton = (
      <IconButton
        onClick={this.handleClick.bind(this)}
        tooltip={teamName}
        tooltipPosition="top-right"
        tooltipStyles={{
          top: '28px',
          left: '60px',
          pointerEvents: 'none',
        }}
        style={{
          border: 'none',
          padding: '0',
          width: 'auto',
          height: 'auto',
          zIndex: '2',
        }}
      >
        <div className={'team-item' + activeClass}>
          <img src={iconSrc} alt={teamName}/>
        </div>
      </IconButton>
    );

    if (unread) {
      return (
        <Badge
          badgeContent={4}
          primary={true}
          style={{padding:'0',display:'block'}}
          badgeStyle={{
            top: '-5px',
            right: '-5px',
            pointerEvents: 'none',
            transform: 'scale(0.8)',
            zIndex: '2',
          }}
        >
          {iconButton}
        </Badge>
      );
    } else {
      return (
        <div>
          {iconButton}
        </div>
      );
    }
  }
}

TeamIcon.defaultProps = {
  teamName: 'Team Name Here',
  iconSrc: 'https://s3.amazonaws.com/uifaces/faces/twitter/getsocial_now/128.jpg',
  unread: false,
  unreadCount: 2,
  active: false,
};
