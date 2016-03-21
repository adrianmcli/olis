import React from 'react';

import Dialog from '/client/modules/core/components/Dialog.jsx';

export default class AddPeople extends React.Component {

  handleSubmit() {
    console.log('submit');
  }

  handleClose() {
    this.props.onRequestClose();
  }

  render() {
    return (
      <Dialog
        title="Add People to Conversation"
        open={this.props.open}
        onRequestClose={this.handleClose.bind(this)}
        submitLabel="Add to Conversation"
        // onShow={() => {this._peoplePicker.focusSearchBar();}}
        bodyStyle={{padding: '0'}}
        width={540}
        actionsContainerStyle={{borderTop: '1px solid rgba(0,0,0,0.15)'}}
      >

      </Dialog>
    );
  }
}
