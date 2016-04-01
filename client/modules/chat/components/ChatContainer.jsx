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
    const { convo, msgs, userId, searchMsgId, needsCentering } = this.props;
    const { distFromBot } = this.state;

    if (convo && prevProps.convo && !R.isEmpty(msgs)) {
      const atBot = distFromBot <= 0;
      const switchedConvo = convo._id !== prevProps.convo._id;
      const isMoreMsgs = msgs.length > prevProps.msgs.length;

      const lastMsgMine = R.last(msgs).userId === userId;
      const hasPrevMsgs = prevProps.msgs && !R.isEmpty(prevProps.msgs);

      const isOlder = hasPrevMsgs ? msgs[0].createdAt < prevProps.msgs[0].createdAt : false;
      const isNewer = hasPrevMsgs ?
        R.last(msgs).createdAt > R.last(prevProps.msgs).createdAt : false;

      const comingFromTop = isMoreMsgs && isOlder;
      const comingFromBottom = isMoreMsgs && isNewer;
      const isMoreNewMsgsThanOne = msgs.length - prevProps.msgs.length > 1;
      const isOneNewMsg = msgs.length - prevProps.msgs.length === 1;

      if (switchedConvo && !needsCentering) { this.scrollToBottom(); return null; }
      else if (needsCentering) { this.centerViewOnMsg(searchMsgId); return null; }
      else if (comingFromBottom && isOneNewMsg && lastMsgMine) { this.scrollToBottom(); return null; }
      else if (comingFromTop) { this.maintainView(); return null; }
      else if (comingFromBottom && isMoreNewMsgsThanOne) { return null; }
      else if (atBot && comingFromBottom && isOneNewMsg) { this.maintainView(); return null; }
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
    if (distFromTop && distFromTop <= 200) { this.throttledFunc(); }
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

  centerViewOnMsg(msgId) {
    const {msgs} = this.props;
    const index = R.findIndex(R.propEq('_id', msgId))(msgs);

    console.log(`centerViewOnMsg ${index}`);
    // TODO center the view
  }

  renderMsgs() {
    const {
      msgs, userId, translations, langCode, convoUsers, translate, searchMsgId
    } = this.props;

    return msgs.map(msg => {
      const otherUser = convoUsers[msg.userId];
      const authorName = otherUser ? otherUser.username : msg.username;
      const avatarSrc = otherUser ? otherUser.profileImageUrl : undefined;
      const highlight = searchMsgId ? searchMsgId === msg._id : false;

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
          highlight={highlight}
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
      loadMoreOlder,
      loadMoreOlderSearch, loadMoreNewerSearch,
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
                  <div id="load-more-btn" onClick={loadMoreOlder}>Load more messages</div> : null}

              {msgs.length > 0 ?
                <button onClick={loadMoreOlderSearch.bind(null, msgs[0]._id)}>load more old</button> : null}

              { this.renderMsgs() }

              {msgs.length > 0 ?
                <button onClick={loadMoreNewerSearch.bind(null, R.last(msgs)._id)}>load more new</button> : null}
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
