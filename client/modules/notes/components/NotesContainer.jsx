import React from 'react';

import UndoIcon from 'material-ui/lib/svg-icons/content/undo';
import RedoIcon from 'material-ui/lib/svg-icons/content/redo';
import SaveIcon from 'material-ui/lib/svg-icons/content/save';
import ShareIcon from 'material-ui/lib/svg-icons/social/share';

import IconButton from 'material-ui/lib/icon-button';
import Editor from 'react-medium-editor/lib/editor';

export default class NotesContainer extends React.Component {
  handleChange(sectionId, text, medium) {
    const {editSection} = this.props;
    console.log(sectionId);
    console.log('Content Has Changed');
    console.log(text);

    editSection(sectionId, text);
  }

  handleClick() {
    console.log('handleClick');
  }

  handleKeyDown(e) {
    console.log(e.target);
    if (e.keyCode === 13) { // enter
      console.log('enter pressed');
    }
  }

  handleBlur() {
    console.log('handleBlur');
  }

  render() {
    const {sections, addSection} = this.props;
    const iconColor = 'rgba(0,0,0,0.8)';

    const editorOptions = {
      disableEditing: false,
      disableReturn: true,
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
          <button onClick={addSection.bind(null, '<p>test section</div></p>', '')}>Add section</button>
          {sections.map(section => {
            return (
              <Editor
                key={section._id}
                text={section.text}
                onChange={this.handleChange.bind(this, section._id)}
                onClick={this.handleClick.bind(this)}
                onKeyDown={this.handleKeyDown.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                options={editorOptions}
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
