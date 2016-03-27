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
    $(this._container).on("scroll", this._scrollHandler.bind(this));
  }

  componentWillUnmount() {
    $(this._container).off("scroll", this._scrollHandler.bind(this));
  }

  componentWillReceiveProps() {
    const ele = $(this._container);
    const distanceFromBottom = ele[0].scrollHeight - ele.scrollTop() - ele.outerHeight();
    const distanceFromTop = ele.scrollTop();
    this.setState({
      distanceFromBottom,
      distanceFromTop,
    });
  }

  componentDidUpdate() {
    const {distanceFromBottom, distanceFromTop} = this.state;
    const ele = $(this._container);
    const targetScrollTopValue = ele[0].scrollHeight - ele.outerHeight() - distanceFromBottom;
    if (distanceFromBottom <= 0 || distanceFromTop === 0) {
      ele.scrollTop(targetScrollTopValue);  // set the scrollTop value
    }
  }

  _scrollHandler() {
    const distanceFromTop = $(this._container).scrollTop();
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
    const ele = $(this._container);
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
            {convo && convo.numMsgs > msgs.length ?
                <div id="load-more-btn" onClick={loadMore}>Load more messages</div> : null}

            {this.renderMsgs()}
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
