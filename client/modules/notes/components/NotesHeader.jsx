import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import UndoIcon from 'material-ui/lib/svg-icons/content/undo';
import RedoIcon from 'material-ui/lib/svg-icons/content/redo';
import SaveIcon from 'material-ui/lib/svg-icons/content/save';
import ShareIcon from 'material-ui/lib/svg-icons/social/share';
import IconButton from 'material-ui/lib/icon-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import Popover from 'material-ui/lib/popover/popover';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import EditorIcon from 'material-ui/lib/svg-icons/editor/insert-drive-file';

export default class NotesHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleOpenWidgetsList = this.handleOpenWidgetsList.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleItemTouchTap = this.handleItemTouchTap.bind(this);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  handleOpenWidgetsList(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleRequestClose() {
    this.setState({open: false});
  }

  handleItemTouchTap() {
    this.handleRequestClose();
  }

  render() {
    const { addWidget, noteId } = this.props;
    const iconColor = 'rgba(0,0,0,0.8)';
    return (
      <div className="notes-header">
        <div className="notes-status">Last Updated: 23 min ago</div>
        <div className="notes-icon-bar">
          {/*<IconButton tooltip="Share">
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
          </IconButton>*/}
          <IconButton tooltip="Add widget" onTouchTap={this.handleOpenWidgetsList}>
            <AddIcon color={iconColor}/>
          </IconButton>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <Menu
              style={{position: 'relative'}}
              zDepth={0}
              onItemTouchTap={this.handleItemTouchTap}
            >
              <MenuItem
                primaryText="Text Editor"
                leftIcon={<EditorIcon />}
                onClick={addWidget.bind(null, noteId, 'editor')}
              />
            </Menu>
        </Popover>

        </div>
      </div>
    );
  }
}
