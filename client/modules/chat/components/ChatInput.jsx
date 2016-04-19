import React from 'react';
import {Editor, EditorState} from 'draft-js';

export default class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.focus = () => this.refs.editor.focus();
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
      }
    }
  }

  render() {
    const {editorState} = this.state;
    return (
      <div id="chat-input">
        <div className="chat-input-container" onClick={this.focus}>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            placeholder="Type your message here..."
            ref="editor"
          />
        </div>
      </div>
    );
  }
}
