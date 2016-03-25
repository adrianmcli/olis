import React from 'react';
import LangCodes from '/lib/constants/lang_codes';

import TimeAgo from 'react-timeago';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import AvatarWithInfo from './AvatarWithInfo.jsx';
import ReactMarkdown from 'react-markdown';
import Loading from '/client/modules/core/components/Loading.jsx';

export default class ChatMessageItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
      gettingTranslation: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {msgId} = this.props;
    const {isHovering, gettingTranslation} = this.state;
    return (
      msgId !== nextProps.msgId &&
      isHovering !== nextState.isHovering &&
      gettingTranslation !== nextState.gettingTranslation
    );
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

  handleItemTouchTap(event, child) {
    console.log('You have selected: ' + child.props.primaryText);
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

  renderTranslationArea() {
    const {translation} = this.props;
    const {gettingTranslation} = this.state;

    if (translation) {
      return (
        <div className="translation">
          <hr />
          <ReactMarkdown
            source={translation}
            softBreak="br"
            escapeHtml
          />
        </div>
      );
    }
    if (gettingTranslation) {
      const loadingColor = 'rgba(255,255,255,0.75)';
      const loadingStyle = {
        margin: 'auto',
        width: '20px',
        height: '20px',
      };
      return (
        <div className="translation">
          <hr />
          <Loading spinnerName='cube-grid' style={loadingStyle} color={loadingColor}/>
        </div>
      );
    }
    return null;
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

    // console.log(`ChatMessageItem RENDER ${content}`);

    const authorClass = selfAuthor ? ' you' : '';
    const buttonStyle = () => {
      if (this.state.isHovering) {
        return ({
          padding: '0',
          width: '36px',
          height: '36px'
        });
      } else {
        return ({
          padding: '0',
          width: '36px',
          height: '36px',
          opacity: '0',
          pointerEvents: 'none',
        });
      }
    };
    const contextMenu = (
      <IconMenu
        onItemTouchTap={this.handleItemTouchTap.bind(this)}
        iconButtonElement={
          <IconButton
            style={buttonStyle()}
          >
            <MoreVertIcon color="rgba(0,0,0,0.5)" />
          </IconButton>
        }
        anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
      {
        !translation || this.state.gettingTranslation ?
        <MenuItem
          primaryText={`Translate to ${LangCodes[langCode]}`}
          onTouchTap={this.getTranslation.bind(this)}
        />
        : null
      }
        <MenuItem primaryText="Copy" />
        <MenuItem primaryText="Lorem Ipsum" />
      </IconMenu>
    );

    return (
      <div
        className={'chat-msg-item' + authorClass}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        
        <div className="chat-primary">
          <div className="chat-avatar">
            <div className="chat-author">{authorName}</div>
            <AvatarWithInfo username={authorName} avatarSrc={avatarSrc} />
          </div>
          <div className="chat-body">
            <div className="chat-bubble">
              <ReactMarkdown
                source={content}
                softBreak="br"
                escapeHtml
              />
              {this.renderTranslationArea()}
            </div>
            <div className="chat-timestamp">
              <div className="chat-timestamp-string">
                <TimeAgo date={timestamp} formatter={this._timestampFormatter} title={timestamp}/>
              </div>
            </div>
          </div>
          <div>
            {contextMenu}
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
