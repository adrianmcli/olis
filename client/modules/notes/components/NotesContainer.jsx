import React from 'react';

import UndoIcon from 'material-ui/lib/svg-icons/content/undo';
import RedoIcon from 'material-ui/lib/svg-icons/content/redo';
import SaveIcon from 'material-ui/lib/svg-icons/content/save';
import ShareIcon from 'material-ui/lib/svg-icons/social/share';

import IconButton from 'material-ui/lib/icon-button';
import Editor from 'react-medium-editor/lib/editor';

import R from 'ramda';

export default class NotesContainer extends React.Component {
  handleChange(sectionId, text, medium) {
    const {editSection} = this.props;
    console.log('Content Has Changed');
    console.log(text);

    editSection(sectionId, text);
  }

  handleClick(sectionId) {
    console.log(`handleClick ${sectionId}`);
    const {selectSection} = this.props;
    selectSection(sectionId);
  }

  handleKeyDown(sectionId, e) {
    // console.log(e.target);
    if (e.keyCode === 13) { // enter
      console.log('enter pressed');
      const {addSection} = this.props;
      addSection('', sectionId);
      // Focus on new section
    }
  }

  handleBlur() {
    console.log('handleBlur');
    const {releaseSectionLock} = this.props;
    releaseSectionLock();

    // TODO Save edits
  }

  render() {
    const {sections, userId} = this.props;
    const iconColor = 'rgba(0,0,0,0.8)';

    const editorOptions = {
      // disableEditing: false,
      disableReturn: true,
      disableExtraSpaces: false,
      toolbar: {
        buttons: [
          'bold', 'italic', 'underline',
          'anchor',
          'h1', 'h2', 'h3',
          'quote',
          'orderedlist', 'unorderedlist',
        ]
      }
    };

    return (
      <div id="notes-container">
        <div className="notes-header">
          <div className="notes-icon-bar">
            <IconButton tooltip="Share">
              <ShareIcon color={iconColor}/>
            </IconButton>
            <IconButton tooltip="Save to file...">
              <SaveIcon color={iconColor}/>
            </IconButton>
            <IconButton tooltip="Undo">
              <UndoIcon color={iconColor}/>
            </IconButton>
            <IconButton tooltip="Redo">
              <RedoIcon color={iconColor}/>
            </IconButton>
          </div>
        </div>

        <div className="notes-data-wrapper">
          {sections.map(section => {
            const editorOptions2 = R.merge(editorOptions, {disableEditing: !section.canEdit(userId)});
            return (
              <Editor
                key={section._id}
                ref={section._id}
                text={section.text}
                onChange={this.handleChange.bind(this, section._id)}
                onClick={this.handleClick.bind(this, section._id)}
                onKeyDown={this.handleKeyDown.bind(this, section._id)}
                onBlur={this.handleBlur.bind(this, section._id)}
                options={editorOptions2}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
NotesContainer.defaultProps = {
  sections: []
};
