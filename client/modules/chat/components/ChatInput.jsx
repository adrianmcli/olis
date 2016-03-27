import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import WhyDidYouUpdateMixin from '/lib/vendor/WhyDidYouUpdateMixin';

import TextField from 'material-ui/lib/text-field';

export default class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidUpdate = WhyDidYouUpdateMixin.componentDidUpdate.bind(this);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {handleEnterKeyDown} = this.props;
    return (
      <div id="chat-input">
        <div className="chat-input-container">
          <TextField
            hintText="Type your message here"
            multiLine={true}
            rows={1}
            rowsMax={10}
            style={{transition: 'none', width: '90%', margin: '8px'}}
            onEnterKeyDown={handleEnterKeyDown}
          />
        </div>
      </div>
    );
  }
}
