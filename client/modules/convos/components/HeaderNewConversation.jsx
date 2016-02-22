import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ActionQuestionAnswer from 'material-ui/lib/svg-icons/action/question-answer';
// import Popover from 'material-ui/lib/popover/popover';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import TextField from 'material-ui/lib/text-field';

export default class HeaderNewConversation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
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
          <IconButton
            onClick={this.handleOpen.bind(this)}
            tooltip="New Conversation"
          >
            <ActionQuestionAnswer color={iconColor} />
          </IconButton>
        </div>

        <Dialog
          title="New Conversation"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          Select who you would like to add to this new conversation.
          <div>
            <TextField
              hintText="Hint Text"
              floatingLabelText="Floating Label Text"
            />
          </div>
        </Dialog>

      </div>
    );
  }
}

// <Popover
//   open={this.state.open}
//   anchorEl={this.state.anchorEl}
//   anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
//   targetOrigin={{horizontal: 'middle', vertical: 'top'}}
//   useLayerForClickAway={false}
//   onRequestClose={this.handleClose.bind(this)}
// >
//   <h1>New Convo Stuff Here</h1>
// </Popover>
