import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Badge from 'material-ui/lib/badge';

import TitleCounter from 'notification-count';
import FaviconNotification from 'favicon-notification';

export default class TeamIcon extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {teamId, unread, active} = this.props;
    return (
      teamId !== nextProps.teamId ||
      unread !== nextProps.unread ||
      active !== nextProps.active
    );
  }

  // componentWillReceiveProps(nextProps) {
  //   const before = this.props.unreadCount;
  //   const after = nextProps.unreadCount;
  //   if (before !== after) {
  //     let titleCount = new TitleCounter();
  //     titleCount.set(after);

  //     if (after > 0) FaviconNotification.add();
  //     if (after === 0) {
  //       try { FaviconNotification.remove(); }
  //       catch (err) { console.log(err); }
  //     }
  //     if (after > before) {
  //       if (!this.props.muteSound) {
  //         // make audible alert
  //         // init bunch of sounds
  //         ion.sound({
  //           sounds: [
  //             // {name: 'beer_can_opening'},
  //             {name: 'button_tiny'},
  //           ],
  //           // main config
  //           path: '/sounds/',
  //           preload: true,
  //           multiplay: true,
  //           volume: 0.9
  //         });

  //         // play sound
  //         ion.sound.play('button_tiny');
  //         // fire native alert
  //       }
  //     }
  //   }
  // }

  handleClick(e) {
    this.props.selectTeam();
  }

  _generateIcon(teamName) {
    const styles = {
      container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '90%',
        height: '90%',
        borderRadius: '5px',
        backgroundColor: '#2f3f70',
      },
      text: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        fontSize: '12px',
        color: 'white',
      },
    };
    return (
      <div style={styles.container}>
        <div style={styles.text}>
          { teamName }
        </div>
      </div>
    );
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
          { iconSrc ? <img src={iconSrc} alt={teamName}/> : this._generateIcon(teamName)}
        </div>
      </IconButton>
    );

    if (unread) {
      return (
        <Badge
          badgeContent={unreadCount}
          primary={true}
          style={{padding: '0',display: 'block'}}
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
  // iconSrc: 'https://s3.amazonaws.com/uifaces/faces/twitter/getsocial_now/128.jpg',
  unread: false,
  unreadCount: 2,
  active: false,
};
