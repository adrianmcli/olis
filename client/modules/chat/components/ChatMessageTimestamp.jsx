import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import TimeAgo from 'react-timeago';

export default class ChatMessageTimestamp extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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

  render() {
    const {timestamp} = this.props;
    return (
      <div className="chat-timestamp">
        <div className="chat-timestamp-string">
          <TimeAgo date={timestamp} formatter={this._timestampFormatter} title={timestamp}/>
        </div>
      </div>
    );
  }
}
