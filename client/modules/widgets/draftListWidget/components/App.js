import React from 'react';
import R from 'ramda';
import { Editor, EditorState, ContentState } from 'draft-js';
import { convertToRaw, convertFromRaw } from 'draft-js';
import { RichUtils } from 'draft-js';
import Paper from 'material-ui/lib/paper';

export default class EditorWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: canSetStateFromProps(props.data) ?
        getNewState(EditorState.createEmpty(), props.data) :
        EditorState.createEmpty()
    };

    this.onChange = this.onChange.bind(this);

    this.focus = () => this.refs.editor.focus();
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.handleEditorClick = () => this._handleEditorClick();
  }

  _handleEditorClick() {
    const { widgetId, requestAndReleaseOtherLocks } = this.props;

    requestAndReleaseOtherLocks(widgetId);
    this.focus();
  }

  onChange(editorState) {
    const {
      widgetId,
      update,
      requestAndReleaseOtherLocks,
      releaseLock
    } = this.props;

    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const hasFocus = selectionState.getHasFocus();

    if (hasFocus) {
      const raw = convertToRaw(contentState);
      requestAndReleaseOtherLocks(widgetId);
      update(widgetId, raw);
      this.setState({editorState});
    }
    else {
      releaseLock(widgetId);
      this.setState({editorState});
    }
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  _injectChanges(editorState, raw) {
    const newState = getNewState(editorState, raw);
    this.setState({editorState: newState});
  }

  componentWillReceiveProps(nextProps) {
    const { data, lock, userId } = nextProps;

    const isMyLock = lock && lock.userId === userId;
    if (!isMyLock && canSetStateFromProps(data)) {
      this._injectChanges.bind(this)(this.state.editorState, data);
    }
  }

  render() {
    const {lock, userId} = this.props;
    const readOnly = lock ? lock.userId !== userId : false;

    return (
      <Paper style={{padding: '12px', width: '100%'}}>
        <div onClick={this.handleEditorClick}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Type something..."
            handleDrop={() => true} // Prevent other React DnD things from being dropped into it
            readOnly={readOnly}

            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            handleKeyCommand={this.handleKeyCommand}
            ref="editor"
            spellCheck={true}
          />
          {lock && new Date() - lock.updatedAt < 5000 ? <div>{lock.username} is typing...</div> : null}
        </div>
      </Paper>
    );
  }
}
EditorWidget.defaultProps = {
  lock: undefined
};

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

function canSetStateFromProps(data) {
  const hasData = data && !R.isEmpty(data);
  const keys = R.keys(data);
  const expectedKeys = [ 'entityMap', 'blocks' ];
  const hasAllKeys = R.isEmpty(R.difference(expectedKeys, keys));

  return hasData && hasAllKeys;
}

function getNewState(editorState, raw) {
  const newContentBlocks = convertFromRaw(raw); // from server

  // Wrapping it all back up into an EditorState object
  const newContentState = ContentState.createFromBlockArray(newContentBlocks);
  const newEditorState = EditorState.push(editorState, newContentState);
  return newEditorState;
}
