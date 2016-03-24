import React from 'react';

import TimeAgo from 'react-timeago';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import AvatarWithInfo from './AvatarWithInfo.jsx';

import ReactMarkdown from 'react-markdown';

export default class ChatMessageItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
    };
  }

  handleMouseEnter() {
    this.setState({ isHovering: true });
  }

  handleMouseLeave() {
    this.setState({ isHovering: false });
  }

  handleItemTouchTap(event, child) {
    console.log('You have selected: ' + child.props.primaryText);
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

  render() {
    const {
      authorName,
      avatarSrc,
      content,
      timestamp,
      selfAuthor,
      translate,
      msgId
    } = this.props;

    const authorClass = selfAuthor ? ' you' : '';
    const buttonStyle = () => {
      if (this.state.isHovering) {
        return ({
          padding: '0',
          width: '36px',
          height: '36px'
        });
      } else {
        return ({
          padding: '0',
          width: '36px',
          height: '36px',
          opacity: '0',
          pointerEvents: 'none',
        });
      }
    };
    const contextMenu = (
      <IconMenu
        onItemTouchTap={this.handleItemTouchTap.bind(this)}
        iconButtonElement={
          <IconButton
            style={buttonStyle()}
          >
            <MoreVertIcon color="rgba(0,0,0,0.5)" />
          </IconButton>
        }
        anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <MenuItem primaryText="Translate" onTouchTap={translate.bind(null, msgId, 'ja')} />
        <MenuItem primaryText="Copy" />
        <MenuItem primaryText="Lorem Ipsum" />
      </IconMenu>
    );

    return (
      <div
        className={'chat-msg-item' + authorClass}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        <div className="chat-author">{authorName}</div>
        <div className="chat-primary">
          <div className="chat-avatar">
            <AvatarWithInfo username={authorName} avatarSrc={avatarSrc} />
          </div>
          <div className="chat-body">
            <div className="chat-bubble">
              <ReactMarkdown
                source={content}
                softBreak="br"
                escapeHtml
              />
            </div>
            <div className="chat-timestamp">
              <div className="chat-timestamp-string">
                <TimeAgo date={timestamp} formatter={this._timestampFormatter} title={timestamp}/>
              </div>
            </div>
          </div>
          <div>
            {contextMenu}
          </div>
        </div>
      </div>
    );
  }
}

ChatMessageItem.defaultProps = {
  content: 'Form inputs offer a great opportunity to add some subtle and interesting effects to a web page.',
  timestamp: '5 minutes ago',
  selfAuthor: false,
};
