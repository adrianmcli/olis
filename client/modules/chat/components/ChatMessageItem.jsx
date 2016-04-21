import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import AvatarWithDefault from '/client/modules/core/components/AvatarWithDefault.jsx';
import ChatMessageItemContextMenu from './ChatMessageItemContextMenu.jsx';
import ChatMessageText from './ChatMessageText.jsx';
import ChatMessageTranslation from './ChatMessageTranslation.jsx';
import ChatMessageTimestamp from './ChatMessageTimestamp.jsx';
import ChatMessageImage from './ChatMessageImage';

export default class ChatMessageItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
      gettingTranslation: false,
      menuOpen: false,
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

  getHeight() {
    return $(this._container).outerHeight();
  }

  triggerHighlight() {
    const ele = $(this._container);
    ele.removeAttr('style');
    ele.css('background-color', '#FFDC00');
    setTimeout(() => {
      ele.css('transition', `background-color 2500ms`);
      ele.css('background-color', 'transparent');
    }, 2500);
  }

  openMenu() {
    this.setState({menuOpen: true});
  }

  closeMenu() {
    this.setState({menuOpen: false});
  }

  render() {
    const {
      authorName,
      avatarSrc,
      content,
      timestamp,
      selfAuthor,
      langCode,
      translation,
      imageUrl,
    } = this.props;
    const {gettingTranslation, isHovering, menuOpen} = this.state;
    const authorClass = selfAuthor ? ' you' : '';

    return (
      <div
        className={'chat-msg-item' + authorClass}
        // onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseOver={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        ref={ x => this._container = x }
      >
        <div className="chat-primary">
          <div className="chat-avatar">
            <div className="chat-author">{authorName}</div>
            <AvatarWithDefault size={51} username={authorName} avatarSrc={avatarSrc} />
          </div>
          <div className="chat-body">
            <div className="chat-bubble">

              {imageUrl ?
                <ChatMessageImage imageUrl={imageUrl} /> :
                <div>
                  <ChatMessageText content={content} />
                  <ChatMessageTranslation
                    translation={translation}
                    gettingTranslation={gettingTranslation}
                    selfAuthor={selfAuthor}
                  />
                </div>}

            </div>
            <ChatMessageTimestamp timestamp={timestamp} />
          </div>
          <div>
            {
              (isHovering || menuOpen) && (!translation) ?
              <ChatMessageItemContextMenu
                isHovering={this.state.isHovering}
                langCode={langCode}
                showTranslation={!translation || this.state.gettingTranslation}
                getTranslation={this.getTranslation}
                closeMenu={this.closeMenu.bind(this)}
                openMenu={this.openMenu.bind(this)}
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
  highlight: false,
};
