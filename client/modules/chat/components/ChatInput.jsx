import React from 'react';
import TextField from 'material-ui/lib/text-field'

export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
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
