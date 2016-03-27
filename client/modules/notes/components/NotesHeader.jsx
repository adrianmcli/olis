import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import UndoIcon from 'material-ui/lib/svg-icons/content/undo';
import RedoIcon from 'material-ui/lib/svg-icons/content/redo';
import SaveIcon from 'material-ui/lib/svg-icons/content/save';
import ShareIcon from 'material-ui/lib/svg-icons/social/share';
import IconButton from 'material-ui/lib/icon-button';
import Section from './Section.jsx';
import NotesHeader from './NotesHeader.jsx';

export default class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const iconColor = 'rgba(0,0,0,0.8)';
    return (
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
    );
  }
}
