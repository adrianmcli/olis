import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ActionQuestionAnswer from 'material-ui/lib/svg-icons/action/question-answer';
import NewConvoDialog from './NewConvoDialog.jsx';

export default class HeaderNewConversation extends React.Component {
  handleOpen() {
    this._dialog.handleOpen();
  }

  render() {
    return (
      <div>
        <div className="header-icon">
          <IconButton
            onClick={this.handleOpen.bind(this)}
            tooltip="New Chat"
          >
            <ActionQuestionAnswer color="white" />
          </IconButton>
        </div>
        <NewConvoDialog ref={x => this._dialog = x} {...this.props} />
      </div>
    );
  }
}
