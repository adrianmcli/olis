import React from 'react';
import StyleButton from './StyleButton.jsx';

import QuoteIcon from 'material-ui/lib/svg-icons/editor/format-quote';
import BulletListIcon from 'material-ui/lib/svg-icons/editor/format-list-bulleted';
import NumberedListIcon from 'material-ui/lib/svg-icons/editor/format-list-numbered';
import CodeIcon from 'material-ui/lib/svg-icons/action/code';

const BLOCK_TYPES = [
  // {label: 'H1', style: 'header-one'},
  // {label: 'H2', style: 'header-two'},
  // {label: 'H3', style: 'header-three'},
  // {label: 'H4', style: 'header-four'},
  // {label: 'H5', style: 'header-five'},
  // {label: 'H6', style: 'header-six'},
  {icon: BulletListIcon, label: 'UL', style: 'unordered-list-item'},
  {icon: NumberedListIcon, label: 'OL', style: 'ordered-list-item'},
  {icon: QuoteIcon, label: 'Blockquote', style: 'blockquote'},
  {icon: CodeIcon, label: 'Code Block', style: 'code-block'},
];

export default (props) => {
  const {editorState} = props;

  const selection = editorState.getSelection();
  const block = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey());
  const blockType = block ? block.getType() : null;

  return (
    <span className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={blockType ? type.style === blockType : false}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      )}
    </span>
  );
};
