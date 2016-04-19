import React from 'react';
import {Editor, EditorState, convertToRaw} from 'draft-js';

export default class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.focus = () => this.refs.editor.focus();
  }

  handleReturn(e) {
    const {addMsg} = this.props;
    if (e.shiftKey === true) {
      return false;
    }
    const contentState = this.state.editorState.getCurrentContent();
    const plainText = contentState.getPlainText();
    if (contentState.hasText()) {
      // const rawContentState = convertToRaw(contentState);
      // addMsg(rawContentState);
      addMsg(plainText);
      const empty = EditorState.createEmpty();
      this.setState({editorState: EditorState.moveFocusToEnd(empty)});
      this.focus();
    }
    return true;
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
            handleReturn={this.handleReturn.bind(this)}
          />
        </div>
      </div>
    );
  }
}
