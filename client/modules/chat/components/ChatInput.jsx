import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import TextField from 'material-ui/lib/text-field';

export default class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  handleEnterKeyDown(e) {
    const {addMsg, scrollToBottom} = this.props;
    if (e.shiftKey === true) {
      // shift key pressed, do nothing
    } else {
      e.preventDefault();
      const text = e.target.value;
      if (text.trim() !== '') {
        addMsg(text);
        e.target.value = '';
      }
    }
  }

  render() {
    return (
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
    );
  }
}
