import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import ActionSearch from 'material-ui/lib/svg-icons/action/search';
import RaisedButton from 'material-ui/lib/raised-button';

import Dialog from '/client/modules/core/components/Dialog.jsx';
import FlatButton from 'material-ui/lib/flat-button';

import TextField from 'material-ui/lib/text-field';
import CircularProgress from 'material-ui/lib/circular-progress';

export default class HeaderSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    const iconColor = 'white';
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
    ];
    return (
      <div>

        <div className="header-icon">
          <IconButton tooltip="Search" onClick={this.handleOpen.bind(this)}>
            <ActionSearch color={iconColor} />
          </IconButton>
        </div>

        {/* Search Modal Dialog */}
        <Dialog
          title="Search"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          This is where the user will do some searching.
          <div>
            <TextField
              hintText="Hint Text"
              floatingLabelText="Floating Label Text"
            />
          </div>
          <div>
            <CircularProgress />
          </div>
        </Dialog>

      </div>
    );
  }
}
