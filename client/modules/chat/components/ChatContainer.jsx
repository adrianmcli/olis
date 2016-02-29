import React from 'react';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import TextField from 'material-ui/lib/text-field';
import ChatMessageItem from './ChatMessageItem.jsx';

export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distanceFromBottom: 0,
      distanceFromTop: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    // before the new props come in, save the current scroll position
    const ele = $(this._container);
    const distanceFromBottom = ele[0].scrollHeight - ele.scrollTop() - ele.outerHeight();
    const distanceFromTop = ele.scrollTop();

    const {msgs} = this.props;
    const nextMsgs = nextProps.msgs;

    // console.log('-----');
    // console.log(`msgs ${msgs.length}`);
    // console.log(`nextMsgs ${nextMsgs.length}`);
    // console.log(`componentWillReceiveProps distanceFromBottom ${distanceFromBottom}`);
    // console.log(`componentWillReceiveProps distanceFromTop ${distanceFromTop}`);
    // console.log('-----');

    this.setState({
      distanceFromBottom,
      distanceFromTop
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const ele = $(this._container);
    // setting scrollTop is how we can programatically change the scroll position of a div
    // in order to find out what value to use, we rearrange the above equation to isolate for scrollTop
    const targetScrollTopValue = ele[0].scrollHeight - ele.outerHeight() - this.state.distanceFromBottom;

    const prevMsgs = prevProps.msgs;
    const {msgs} = this.props;

    // console.log('-----');
    // console.log(`prevMsgs ${prevMsgs.length}`);
    // console.log(`msgs ${msgs.length}`);
    // console.log(`componentDidUpdate distanceFromBottom ${this.state.distanceFromBottom}`);
    // console.log(`componentWillReceiveProps distanceFromTop ${this.state.distanceFromTop}`);
    // console.log('-----');
    
    const {distanceFromBottom, distanceFromTop} = this.state;
    if (distanceFromBottom === 0 || distanceFromTop === 0) {
      ele.scrollTop(targetScrollTopValue);  // set the scrollTop value
    }
  }

  handleEnterKeyDown(e) {
    const {addMsg} = this.props;
    if (e.shiftKey === true) {
      console.log('shift-key has been pressed');
    } else {
      e.preventDefault();
      const text = e.target.value;
      addMsg(text);
      e.target.value = '';
    }
  }

  scrollToBottom() {
    const ele = $(this._container);
    ele.animate({ scrollTop: ele.prop('scrollHeight')}, 500);
  }

  scrollHandler() {
    // Get the element
    const ele = $(this._container);

    // Compare these two metrics to get the distance scrolled from the bottom
    const metricA = ele[0].scrollHeight - ele.scrollTop();
    const metricB = ele.outerHeight();

    const distanceFromBottom = metricA - metricB;
    console.log(`distanceFromBottom: ${distanceFromBottom}`);
    return distanceFromBottom;
  }

  render() {
    const {msgs, userId, convoUsers, title, usersListString, loadMore} = this.props;
    return (
      <div id="chat-container">
        <div id="chat-header">
          <div className="header-body">
            <div className="chat-title">
              {title}
            </div>
            <div className="chat-meta">
              {usersListString}
            </div>
          </div>
          <div className="header-icon">
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Add people to chat" />
              <MenuItem primaryText="Change chat title" />
              <MenuItem primaryText="Chat info" />
            </IconMenu>
          </div>
        </div>

        <div id="chat-msg-area" ref={(x) => this._container = x}>
          <button onClick={loadMore}>Load more messages</button>
          <button onClick={this.scrollToBottom.bind(this)}>Scroll to bottom</button>
          {msgs.map(msg => {
            return (
              <ChatMessageItem
                key={msg._id}
                authorName={convoUsers[msg.userId].username}
                avatarSrc='http://www.placecage.com/200/200'
                content={msg.text}
                timestamp={msg.createdAt}
                selfAuthor={msg.userId === userId}
              />
            );
          })}
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
  usersListString: 'Default users list string'
};

