import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import TimeAgo from 'react-timeago';
import AvatarWithDefault from '/client/modules/core/components/AvatarWithDefault.jsx';
import ChatMessageItemContextMenu from './ChatMessageItemContextMenu.jsx';
import ChatMessageText from './ChatMessageText.jsx';
import ChatMessageTranslation from './ChatMessageTranslation.jsx';

export default class ChatMessageItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
      gettingTranslation: false,
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.getTranslation = () => this.getTranslation;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.translation) {
      this.setState({gettingTranslation: false});
    }
  }

  handleMouseEnter() {
    this.setState({ isHovering: true });
  }

  handleMouseLeave() {
    this.setState({ isHovering: false });
  }

  getTranslation() {
    const {translate, msgId, langCode} = this.props;
    if (!this.state.gettingTranslation) {
      this.setState({gettingTranslation: true});
      translate(msgId, langCode);
    }
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
      langCode,
      translation
    } = this.props;

    const {gettingTranslation} = this.state;

    // console.log(`ChatMessageItem RENDER ${content}`);

    const authorClass = selfAuthor ? ' you' : '';

    return (
      <div
        className={'chat-msg-item' + authorClass}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        <div className="chat-primary">
          <div className="chat-avatar">
            <div className="chat-author">{authorName}</div>
            <AvatarWithDefault size={51} username={authorName} avatarSrc={avatarSrc} />
          </div>
          <div className="chat-body">
            <div className="chat-bubble">
              <ChatMessageText content={content} />
              <ChatMessageTranslation translation={translation} gettingTranslation={gettingTranslation} />
            </div>
            <div className="chat-timestamp">
              <div className="chat-timestamp-string">
                <TimeAgo date={timestamp} formatter={this._timestampFormatter} title={timestamp}/>
              </div>
            </div>
          </div>
          <div>
            <ChatMessageItemContextMenu
              isHovering={this.state.isHovering}
              langCode={langCode}
              showTranslation={!translation || this.state.gettingTranslation}
              getTranslation={this.getTranslation}
            />
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
