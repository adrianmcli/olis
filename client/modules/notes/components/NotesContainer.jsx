import React from 'react';

import UndoIcon from 'material-ui/lib/svg-icons/content/undo';
import RedoIcon from 'material-ui/lib/svg-icons/content/redo';
import SaveIcon from 'material-ui/lib/svg-icons/content/save';
import ShareIcon from 'material-ui/lib/svg-icons/social/share';

import IconButton from 'material-ui/lib/icon-button';
import Editor from 'react-medium-editor';

export default class NotesContainer extends React.Component {
  handleChange(text, medium) {
    console.log('Content Has Changed');
    console.log(text);
  }

  render() {
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
          <Editor
            text="<h1>Meeting Notes</h1><p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>"
            onChange={this.handleChange.bind(this)}
            options={{toolbar:
              {buttons: [
                'bold',
                'italic',
                'underline',
                'anchor',
                'h1',
                'h2',
                'h3',
                'quote',
                'orderedlist',
                'unorderedlist',
              ]}
            }}
          />
        </div>
      </div>
    );
  }
}
