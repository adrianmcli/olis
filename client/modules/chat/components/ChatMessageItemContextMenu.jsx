import React from 'react';
import LangCodes from '/lib/constants/lang_codes';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

export default class ChatMessageItemContextMenu extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {showTranslation, langCode, getTranslation, isHovering} = this.props;

    const buttonStyle = isHovering ?
      {
        padding: '0',
        width: '36px',
        height: '36px'
      } :
      {
        padding: '0',
        width: '36px',
        height: '36px',
        opacity: '0',
        pointerEvents: 'none',
      };

    return (
      <IconMenu
        // onItemTouchTap={this.handleItemTouchTap.bind(this)}
        iconButtonElement={
          <IconButton
            style={buttonStyle}
          >
            <MoreVertIcon color="rgba(0,0,0,0.5)" />
          </IconButton>
        }
        anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
      {
        showTranslation ?
        <MenuItem
          primaryText={`Translate to ${LangCodes[langCode]}`}
          onTouchTap={getTranslation}
        />
        : null
      }
        <MenuItem primaryText="Copy" />
        <MenuItem primaryText="Lorem Ipsum" />
      </IconMenu>
    );
  }
}
ChatMessageItemContextMenu.defaultProps = {
  isHovering: false,
  langCode: 'Elvish',
  showTranslation: true,
  getTranslation: () => console.log('getTranslation')
};

