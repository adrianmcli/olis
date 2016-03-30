import React from 'react';
import R from 'ramda';
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
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    const ele = this._getScrollContainer();
    ele.on('scroll', this._scrollHandler.bind(this));

    this.scrollToBottom();
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

  componentDidUpdate(prevProps) {
    const {convo, msgs, userId} = this.props;
    const {distanceFromBottom, distanceFromTop} = this.state;
    const ele = this._getScrollContainer();

    function _maintainView() {
      const targetScrollTopValue = ele[0].scrollHeight - ele.outerHeight() - distanceFromBottom;
      ele.scrollTop(targetScrollTopValue);  // set the scrollTop value
    }

    if (convo && prevProps.convo) {
      const isDiffConvo = convo._id !== prevProps.convo._id;
      const isMoreMsgs = msgs.length > prevProps.msgs.length;

      const _getIsEarlierMsgs = () => {
        if (!prevProps.msgs) { return false; }
        if (R.isEmpty(prevProps.msgs)) { return false; }
        return isMoreMsgs && msgs[0].createdAt < prevProps.msgs[0].createdAt;
      };
      const isEarlierMsgs = _getIsEarlierMsgs();

      const _getIsNewMsgs = () => {
        if (!prevProps.msgs) { return false; }
        if (R.isEmpty(prevProps.msgs)) { return false; }
        return isMoreMsgs && R.last(msgs).createdAt > R.last(prevProps.msgs).createdAt;
      };
      const isNewMsgs = _getIsNewMsgs();

      const isMyMsg = isNewMsgs && R.last(msgs).userId === userId;

      if (isDiffConvo) { this.scrollToBottom(); }
      else if (isMyMsg) { this.scrollToBottom(); }
      else if (isEarlierMsgs || distanceFromBottom <= 0) { _maintainView(); }
      // distanceFromBottom <= 0 because of some browsers non overlaying scroll bars
      // gives an offset of like -17.
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
    const {incrementNumVisibleMsgs} = this.props;

    const ele = this._getScrollContainer();
    const distanceFromTop = ele.scrollTop();
    // const distanceFromBottom = ele[0].scrollHeight - ele.scrollTop() - ele.outerHeight();

    const scrollingToTop = distanceFromTop && distanceFromTop <= 100;
    // const scrollingFromBot = distanceFromBottom && distanceFromBottom <= 100;

    if (scrollingToTop) {
      incrementNumVisibleMsgs();
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
      starred,
      addMsg
    } = this.props;

    return (
      <div id="chat-container">
        <ChatHeader title={title} usersListString={usersListString} starred={starred} />
        <div id="chat-msg-area" ref={(x) => this._container = x}>
          <GeminiScrollbar>
            <div className="chat-wrapper">
              {convo && convo.numMsgs > msgs.length ?
                  <div id="load-more-btn" onClick={loadMore}>Load more messages</div> : null}
              {this.renderMsgs()}
            </div>
          </GeminiScrollbar>
        </div>

        <ChatInput
          addMsg={addMsg}
        />
      </div>
    );
  }
}
ChatContainer.defaultProps = {
  msgs: []
};
