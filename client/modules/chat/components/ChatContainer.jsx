import React from 'react';
import R from 'ramda';
import _ from 'lodash';

import PureRenderMixin from 'react-addons-pure-render-mixin';

import ChatInput from './ChatInput.jsx';
import GeminiScrollbar from 'react-gemini-scrollbar';
import ChatMessageItem from './ChatMessageItem.jsx';
import ChatHeader from './ChatHeader.jsx';

export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distFromBot: 0,
      distFromTop: 0
    };
    this.throttledFunc = _.throttle(() => this.incVisible.bind(this)(), 500);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    const ele = this._getContainerEle();
    ele.on('scroll', this.scrollHandler.bind(this));
    this.scrollToBottom();
  }

  componentWillUnmount() {
    const ele = this._getContainerEle();
    ele.off('scroll', this.scrollHandler.bind(this));
  }

  componentWillReceiveProps() {
    const ele = this._getContainerEle();
    const distFromBot = ele[0].scrollHeight - ele.scrollTop() - ele.outerHeight();
    const distFromTop = ele.scrollTop();
    this.setState({ distFromBot, distFromTop });
  }

  componentDidUpdate(prevProps) {
    const { convo, msgs, userId } = this.props;
    const { distFromBot } = this.state;

    if (convo && prevProps.convo && !R.isEmpty(msgs)) {

      const switchedConvo = convo._id !== prevProps.convo._id;
      const isMoreMsgs = msgs.length > prevProps.msgs.length;

      const lastMsgMine = R.last(msgs).userId === userId;
      const hasPrevMsgs = prevProps.msgs && !R.isEmpty(prevProps.msgs);

      const isOlder = hasPrevMsgs ? msgs[0].createdAt < prevProps.msgs[0].createdAt : false;
      const isNewer = hasPrevMsgs ?
        R.last(msgs).createdAt > R.last(prevProps.msgs).createdAt : false;

      const comingFromTop = isMoreMsgs && isOlder;
      const comingFromBottom = isMoreMsgs && isNewer;

      if (switchedConvo) { this.scrollToBottom(); }
      else if (comingFromBottom && lastMsgMine) { this.scrollToBottom(); }
      else if (comingFromTop || distFromBot <= 0) { this.maintainView(); }
    }
  }

  _getContainerEle() {
    const gm = $('#chat-msg-area .gm-scrollbar-container');
    return gm.length > 0 ? $('#chat-msg-area .gm-scroll-view') : $(this._container);
  }

  incVisible() {
    this.props.incrementNumVisibleMsgs();
  }

  scrollHandler() {
    const distFromTop = this._getContainerEle().scrollTop();
    if (distFromTop && distFromTop <= 100) { this.throttledFunc(); }
  }

  scrollToBottom() {
    const ele = this._getContainerEle();
    const scrollHeight = ele[0].scrollHeight;
    ele.scrollTop(scrollHeight);
  }

  maintainView() {
    const ele = this._getContainerEle();
    const targetVal = ele[0].scrollHeight - ele.outerHeight() - this.state.distFromBot;
    ele.scrollTop(targetVal);
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
              { this.renderMsgs() }
            </div>
          </GeminiScrollbar>
        </div>

        <ChatInput addMsg={addMsg} />
      </div>
    );
  }
}

ChatContainer.defaultProps = {
  msgs: []
};
