import React from 'react';
import R from 'ramda';
import { Editor, EditorState, ContentState } from 'draft-js';
import { convertToRaw, convertFromRaw } from 'draft-js';
import { RichUtils } from 'draft-js';
import Paper from 'material-ui/lib/paper';

import BlockStyleControls from './BlockStyleControls.jsx';
import InlineStyleControls from './InlineStyleControls.jsx';

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
  }

  onChange(editorState) {
    const {
      widgetId,
      update
    } = this.props;

    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);

    update(widgetId, raw);
    this.setState({editorState});
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
    const { widget } = nextProps;

    if (canSetStateFromProps(widget)) {
      this._injectChanges.bind(this)(this.state.editorState, widget.data);
    }
  }

  render() {
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = this.state.editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    const controlsContainerStyle = {
      display: 'flex',
      alignItems: 'center',
    };

    const separatorStyle = {
      width: '1px',
      height: '24px',
      backgroundColor: 'rgba(0,0,0,0.2)',
      marginRight: '16px',
    };

    return (
      <Paper style={{padding: '12px', width: '100%'}}>
        <div style={controlsContainerStyle}>
          <InlineStyleControls
            editorState={this.state.editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div style={separatorStyle} />
          <BlockStyleControls
            editorState={this.state.editorState}
            onToggle={this.toggleBlockType}
          />
        </div>
        <div className={className} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Type something..."
            handleDrop={() => true} // Prevent other React DnD things from being dropped into it

            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            handleKeyCommand={this.handleKeyCommand}
            ref="editor"
            spellCheck={true}
          />
        </div>
      </Paper>
    );
  }
}

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

function getSelectedBlocks(editorState) {
  const selectionState = editorState.getSelection();

  const hasFocus = selectionState.getHasFocus();
  const start = selectionState.getStartKey();
  const end = selectionState.getEndKey();

  if (start && hasFocus) {
    const contentState = editorState.getCurrentContent();
    const blockArray = contentState.getBlocksAsArray();

    /* eslint-disable curly */
    let index = {start: null, end: null};
    blockArray.map((block, i) => {
      if (block.getKey() === start) index.start = i;
      if (block.getKey() === end) index.end = i;
    }); /* eslint-enable */

    return blockArray.filter((_, i) => i >= index.start && i <= index.end);
  }
  return [];
}

function mergeBlockArrays(editorState, newBlocks, selectedBlocks) {
  const contentState = editorState.getCurrentContent();

  return newBlocks.map( newBlock => {
    const key = newBlock.getKey();
    const selectedBlock = contentState.getBlockForKey(key);
    const isSelected = R.contains(key, selectedBlocks.map(x => x.getKey()));

    return isSelected ? selectedBlock : newBlock;
  });
}

function getNewState(editorState, raw) {
  // Getting current data
  const currentSelectionState = editorState.getSelection();

  // Get the two block arrays and then merge them to form a new one
  const newContentBlocks = convertFromRaw(raw);       // from server
  const selectedBlocks = getSelectedBlocks(editorState);    // from user selection
  const newBlockArray = mergeBlockArrays(
    editorState, newContentBlocks, selectedBlocks
  );

  // Wrapping it all back up into an EditorState object
  const newContentState = ContentState.createFromBlockArray(newBlockArray);
  const newEditorState = EditorState.push(editorState, newContentState);

  const hasFocus = currentSelectionState.getHasFocus();
  const maintainSelection = hasFocus ? EditorState.forceSelection : EditorState.acceptSelection;
  const newState = maintainSelection(newEditorState, currentSelectionState);
  return newState;
}
