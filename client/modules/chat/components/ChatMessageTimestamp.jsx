import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TimeAgo from 'react-timeago';
import MsgUtils from '/client/modules/core/libs/msgs';

export default class ChatMessageTimestamp extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {timestamp} = this.props;
    return (
      <div className="chat-timestamp">
        <div className="chat-timestamp-string">
          <TimeAgo date={timestamp} formatter={MsgUtils.timestampFormatter} title={timestamp}/>
        </div>
      </div>
    );
  }
}
