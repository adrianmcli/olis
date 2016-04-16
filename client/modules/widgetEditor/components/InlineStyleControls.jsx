import React from 'react';
import StyleButton from './StyleButton.jsx';

import BoldIcon from 'material-ui/lib/svg-icons/editor/format-bold';
import ItalicIcon from 'material-ui/lib/svg-icons/editor/format-italic';
import UnderlineIcon from 'material-ui/lib/svg-icons/editor/format-underlined';

const INLINE_STYLES = [
  {icon: BoldIcon, label: 'Bold', style: 'BOLD'},
  {icon: ItalicIcon, label: 'Italic', style: 'ITALIC'},
  {icon: UnderlineIcon, label: 'Underline', style: 'UNDERLINE'},
  // {icon: Icon, label: 'Monospace', style: 'CODE'},
];

export default (props) => {
  const {editorState} = props;

  const selection = editorState.getSelection();
  const block = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey());

  const currentStyle = block ? props.editorState.getCurrentInlineStyle() : null;

  return (
    <span className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle ? currentStyle.has(type.style) : false}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      )}
    </span>
  );
};
