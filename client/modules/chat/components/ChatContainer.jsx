import React from 'react';
import ReactList from 'react-list';
// import ReactChatView from 'react-chatview';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import ChatInput from './ChatInput.jsx';
import GeminiScrollbar from 'react-gemini-scrollbar';
import ChatMessageItem from './ChatMessageItem.jsx';
import ChatHeader from './ChatHeader.jsx';

export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distanceFromBottom: 0,
      distanceFromTop: 0
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.handleEnterKeyDown = () => this.handleEnterKeyDown;
  }

  componentDidMount() {
    const ele = this._getScrollContainer();
    ele.on('scroll', this._scrollHandler.bind(this));
  }

  componentWillUnmount() {
    const ele = this._getScrollContainer();
    ele.off('scroll', this._scrollHandler.bind(this));
  }

  componentWillReceiveProps() {
    const ele = this._getScrollContainer();
    const distanceFromBottom = ele[0].scrollHeight - ele.scrollTop() - ele.outerHeight();
    const distanceFromTop = ele.scrollTop();
    this.setState({
      distanceFromBottom,
      distanceFromTop,
    });
  }

  componentDidUpdate() {
    const {distanceFromBottom, distanceFromTop} = this.state;
    const ele = this._getScrollContainer();

    const targetScrollTopValue = ele[0].scrollHeight - ele.outerHeight() - distanceFromBottom;
    if (distanceFromBottom <= 0 || distanceFromTop === 0) {
      ele.scrollTop(targetScrollTopValue);  // set the scrollTop value
    }
  }

  _getScrollContainer() {
    let ele = $(this._container);
    // detect if geminiScrollbar has been applied
    const gm = $('#chat-msg-area .gm-scrollbar-container');
    if (gm.length > 0) {
      ele = $('#chat-msg-area .gm-scroll-view');
    }
    return ele;
  }

  _scrollHandler() {
    const ele = this._getScrollContainer();

    const distanceFromTop = ele.scrollTop();
    if (distanceFromTop && distanceFromTop < 50) {
      console.log("I'm close to the top!");
    }
  }

  handleEnterKeyDown(e) {
    const {addMsg} = this.props;
    if (e.shiftKey === true) {
      // shift key pressed, do nothing
    } else {
      e.preventDefault();
      const text = e.target.value;
      if (text.trim() !== '') {
        addMsg(text);
        e.target.value = '';
        this.scrollToBottom();
      }
    }
  }

  scrollToBottom() {
    const ele = this._getScrollContainer();
    const scrollHeight = ele[0].scrollHeight;
    ele.scrollTop(scrollHeight);
    // ele.animate({ scrollTop: ele.prop('scrollHeight')}, 500);
  }

  renderMsgs() {
    const {
      msgs, userId, translations, langCode, convoUsers, translate
    } = this.props;

    return msgs.map(msg => {
      const otherUser = convoUsers[msg.userId];
      const authorName = otherUser ? otherUser.username : msg.username;
      const avatarSrc = otherUser ? otherUser.profileImageUrl : undefined;
      return (
        <ChatMessageItem
          key={msg._id}
          msgId={msg._id}
          authorName={authorName}
          avatarSrc={avatarSrc}
          content={msg.text}
          timestamp={msg.createdAt}
          selfAuthor={msg.userId === userId}
          translation={translations[msg._id] ? translations[msg._id].text : undefined}
          langCode={langCode}
          translate={translate}
        />
      );
    });
  }

  renderInfiniteMsgs() {
    const {
      msgs, userId, translations, langCode, convoUsers, translate
    } = this.props;

    const _renderItem = (index, key) => {
      const msg = msgs[index];
      const otherUser = convoUsers[msg.userId];
      const authorName = otherUser ? otherUser.username : msg.username;
      const avatarSrc = otherUser ? otherUser.profileImageUrl : undefined;
      return (
        <ChatMessageItem
          key={key}
          msgId={msg._id}
          authorName={authorName}
          avatarSrc={avatarSrc}
          content={msg.text}
          timestamp={msg.createdAt}
          selfAuthor={msg.userId === userId}
          translation={translations[msg._id] ? translations[msg._id].text : undefined}
          langCode={langCode}
          translate={translate}
        />
      );
    };

    return (
      <ReactList
        itemRenderer={_renderItem}
        length={msgs.length}
      />
    );
  }

  render() {
    const {
      convo,
      msgs,
      title,
      usersListString,
      loadMore,
      starred
    } = this.props;

    return (
      <div id="chat-container">
        <ChatHeader title={title} usersListString={usersListString} starred={starred} />
        <div id="chat-msg-area" ref={(x) => this._container = x}>
          <GeminiScrollbar>
            <div className="chat-wrapper">
              {convo && convo.numMsgs > msgs.length ?
                  <div id="load-more-btn" onClick={loadMore}>Load more messages</div> : null}
              {this.renderInfiniteMsgs()}
            </div>
          </GeminiScrollbar>
        </div>

        <ChatInput handleEnterKeyDown={this.handleEnterKeyDown} />
      </div>
    );
  }
}
ChatContainer.defaultProps = {
  msgs: []
};
