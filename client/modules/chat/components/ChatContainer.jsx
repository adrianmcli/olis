import React from 'react';
import ReactList from 'react-list';

import IconButton from 'material-ui/lib/icon-button';

import FilledStarIcon from 'material-ui/lib/svg-icons/toggle/star';
import EmptyStarIcon from 'material-ui/lib/svg-icons/toggle/star-border';

// import ChatMembers from './ChatMenuItems/ChatMembers.jsx';
// import ChangeConvoName from './ChatMenuItems/ChangeConvoName.jsx';
import ChangeConvoName from '../containers/change_convo_name';
import ChatMenu from './ChatMenu.jsx';

import TextField from 'material-ui/lib/text-field';
import GeminiScrollbar from 'react-gemini-scrollbar';
import ChatMessageItem from '../containers/chat_message_item';

export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distanceFromBottom: 0,
      distanceFromTop: 0,
      chatMembersOpen: false,
      changeTitleOpen: false,
    };
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

  openChatMembers() {this.setState({chatMembersOpen: true});}
  closeChatMembers() {this.setState({chatMembersOpen: false});}

  openChangeTitle() {this.setState({changeTitleOpen: true});}
  closeChangeTitle() {this.setState({changeTitleOpen: false});}

  renderChangeTitleDialog() {
    return (
      <ChangeConvoName
        open={this.state.changeTitleOpen}
        onRequestClose={this.closeChangeTitle.bind(this)}
      />
    );
  }

  renderItem(index, key) {
    const {msgs, convoUsers, userId, translations, langCode} = this.props;
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
      />
    );
  }

  scrollToBottom() {
    const ele = this._getScrollContainer();
    const scrollHeight = ele[0].scrollHeight;
    ele.scrollTop(scrollHeight);
    // ele.animate({ scrollTop: ele.prop('scrollHeight')}, 500);
  }

  render() {
    const {
      userId,
      translations,
      langCode,
      convoUsers,
      convo,
      msgs,
      title,
      usersListString,
      loadMore,
      starred
    } = this.props;

    return (
      <div id="chat-container">
        <div id="chat-header">
          <div className="header-body" onTouchTap={this.openChangeTitle.bind(this)}>
            { this.renderChangeTitleDialog() }
            <div className="chat-title">
              {title}
            </div>
            <div className="chat-meta">
              {usersListString}
            </div>
          </div>
          <div className="header-icon">
            <IconButton tooltip="Star this conversation">
              { starred ? <FilledStarIcon color="#FFC107"/> : <EmptyStarIcon color="#FFC107"/> }
            </IconButton>
          </div>
          <div className="header-icon">
            <ChatMenu />
          </div>
        </div>

        <div id="chat-msg-area" ref={(x) => this._container = x}>
          <GeminiScrollbar>
            <div className="chat-wrapper">
            {convo && convo.numMsgs > msgs.length ?
                <div id="load-more-btn" onClick={loadMore}>Load more messages</div> : null}

            {msgs.map(msg => {
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
                />
              );
            })}
            </div>
          </GeminiScrollbar>
        </div>

        <div id="chat-input">
        <div className="chat-input-container">
          <TextField
            hintText="Type your message here"
            multiLine={true}
            rows={1}
            rowsMax={10}
            style={{transition: 'none', width: '90%', margin: '8px'}}
            onEnterKeyDown={this.handleEnterKeyDown.bind(this)}
          />
          </div>
        </div>
      </div>
    );
  }
}
ChatContainer.defaultProps = {
  title: 'Default title',
  usersListString: 'Default users list string',
  starred: false,
};
