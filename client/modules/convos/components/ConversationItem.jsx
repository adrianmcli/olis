import React from 'react';

import Avatar from 'material-ui/lib/avatar';
import Badge from 'material-ui/lib/badge';
import StarIcon from 'material-ui/lib/svg-icons/toggle/star';

import TimeAgo from 'react-timeago';

export default class ConversationItem extends React.Component {
  handleClick(e) {
    console.log('User has clicked conversation: ' + this.props.title);
    // TODO - make sure the conversation ID is passed into this component
    // TODO - fire an action to reflect the fact that user wants 
    //        to switch to that conversation ID
    this.props.selectConvo();
  }

  _timestampFormatter(value, unit, suffix) {
    let timeStr = '';
    let resultingUnit = unit;

    if (unit === 'minute') { resultingUnit = 'min'; }
    if (unit === 'hour') { resultingUnit = 'hr'; }

    if (unit === 'second') {
      timeStr = 'Just now';
    } else {
      if (value !== 1) {
        resultingUnit += 's';
      }
      return value + ' ' + resultingUnit + ' ' + suffix;
    }
    return timeStr;
  }

  renderStar() {
    if (this.props.starred) 
    return (<StarIcon color="#FFC107" />);
  }

  render() {
    const {
      title,
      lastUpdated,
      previewText,
      avatarSrc,
      unread,
      unreadCount,
      active,
      starred,
    } = this.props;

    const badgeStyle = {
      top: '-6px',
      right: '-6px',
      pointerEvents: 'none',
      transform: 'scale(0.8)',
    };
    const unreadClass = unread ? ' unread' : '';
    const activeClass = active ? ' active' : '';
    return (
      <div
        className={'conversation-item' + unreadClass + activeClass}
        onClick={this.handleClick.bind(this)}
      >
        <div className="chat-avatar">
          { unread ?
          <Badge
                badgeContent={unreadCount}
                primary={true}
                style={{padding: '0',display: 'block'}}
                badgeStyle={badgeStyle}
              >
              <Avatar size={51} src={avatarSrc} />
            </Badge>
            :
            <Avatar size={51} src={avatarSrc} />
          }
        </div>
        <div className="chat-body">
          <div className="chat-main">
            <div className="chat-title">{title}</div>
            <div className="chat-time">
              <TimeAgo date={lastUpdated} formatter={this._timestampFormatter}/>
            </div>
          </div>
          <div className="chat-secondary">
            <div className="chat-status">{previewText}</div>
            <div className="chat-star-icon">
              { starred ? <StarIcon color="#FFC107" /> : null }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ConversationItem.defaultProps = {
  title: 'Chat Title',
  lastUpdated: null,
  previewText: 'Today\'s meeting minutes has been summarized into the notes on the side of this conversation.',
  avatarSrc: 'http://www.placecage.com/200/200',
  unread: false,
  unreadCount: 2,
  active: false,
  starred: false,
};
