import React from 'react';
import R from 'ramda';
import _ from 'lodash';
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
    this.handleEditorClick = () => this._handleEditorClick();

    this.throttledHandleChange = _.throttle((editorState) => {
      const { requestAndReleaseOtherLocks, update, widgetId } = this.props;
      const contentState = editorState.getCurrentContent();
      const raw = convertToRaw(contentState);
      requestAndReleaseOtherLocks(widgetId);
      update(widgetId, raw);
    }, 1250);
  }

  onChange(editorState) {
    const {
      widgetId,
      releaseLock
    } = this.props;

    const selectionState = editorState.getSelection();
    const hasFocus = selectionState.getHasFocus();

    this.setState({editorState});

    if (hasFocus) { this.throttledHandleChange(editorState); }
    else { releaseLock(widgetId); }

    // console.log(`onChange ${widgetId}, hasFocus ${hasFocus}`);
  }

  _handleEditorClick() {
    const { widgetId, requestAndReleaseOtherLocks } = this.props;
    requestAndReleaseOtherLocks(widgetId);
    this.editor.focus();
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
    const {lock, userId, hideControls} = this.props;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = '';
    if (!hideControls) {
      className = 'RichEditor-editor';
      var contentState = this.state.editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          className += ' RichEditor-hidePlaceholder';
        }
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

    const statusStyle = {
      fontStyle: 'italic',
      fontWeight: '300',
      color: '#9197a3',
    };

    const readOnly = lock ? lock.userId !== userId : false;

    return (
      <Paper style={{padding: '12px', width: '100%'}}>
        {!hideControls ?
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
          </div> : null}
        <div className={className}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Type something..."
            handleDrop={() => true} // Prevent other React DnD things from being dropped into it
            readOnly={readOnly}

            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            handleKeyCommand={this.handleKeyCommand}
            ref={ref => this.editor = ref}
            spellCheck={true}
          />
          {lock && new Date() - lock.updatedAt < 5000 ? <div style={statusStyle}>{lock.username} is typing...</div> : null}
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

  // Selection state
  const currentSelectionState = editorState.getSelection();
  const hasFocus = currentSelectionState.getHasFocus();
  const maintainSelection = hasFocus ? EditorState.forceSelection : EditorState.acceptSelection;
  const newState = maintainSelection(newEditorState, currentSelectionState);

  // return newEditorState;
  return newState;
}

EditorWidget.defaultProps = {
  hideControls: false,
  widgetId: 'fakeWidgetId',
  update: () => console.log('update called'),
  requestAndReleaseOtherLocks: () => console.log('requestAndReleaseOtherLocks called'),
  releaseLock: () => console.log('releaseLock called')
};
