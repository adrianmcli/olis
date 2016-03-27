import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import AvatarWithDefault from '/client/modules/core/components/AvatarWithDefault.jsx';
import ChatMessageItemContextMenu from './ChatMessageItemContextMenu.jsx';
import ChatMessageText from './ChatMessageText.jsx';
import ChatMessageTranslation from './ChatMessageTranslation.jsx';
import ChatMessageTimestamp from './ChatMessageTimestamp.jsx';

export default class ChatMessageItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
      gettingTranslation: false,
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.getTranslation = this.getTranslation.bind(this);
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
    const {gettingTranslation, isHovering} = this.state;
    const authorClass = selfAuthor ? ' you' : '';

    // console.log(`ChatMessageItem RENDER ${content}`);

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
            <ChatMessageTimestamp timestamp={timestamp} />
          </div>
          <div>
            {
              isHovering ?
              <ChatMessageItemContextMenu
                isHovering={this.state.isHovering}
                langCode={langCode}
                showTranslation={!translation || this.state.gettingTranslation}
                getTranslation={this.getTranslation}
              />
              :
              <div style={{
                display: 'inline-block',
                position: 'relative',
                width: '36px',
                height: '36px',
              }}>
              </div>
            }
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
