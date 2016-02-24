import React from 'react';

import UndoIcon from 'material-ui/lib/svg-icons/content/undo';
import RedoIcon from 'material-ui/lib/svg-icons/content/redo';
import SaveIcon from 'material-ui/lib/svg-icons/content/save';
import ShareIcon from 'material-ui/lib/svg-icons/social/share';
import IconButton from 'material-ui/lib/icon-button';
import Section from './Section.jsx';

export default class NotesContainer extends React.Component {
  render() {
    const {sections, userId, editSection, selectSection, releaseSectionLock} = this.props;
    const iconColor = 'rgba(0,0,0,0.8)';
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
            return (
              <Section
                key={section._id}
                section={section}
                userId={userId}
                editSection={editSection}
                selectSection={selectSection}
                releaseSectionLock={releaseSectionLock}
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
