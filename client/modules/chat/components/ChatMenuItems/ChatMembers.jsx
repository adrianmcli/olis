import React from 'react';

import Dialog from '/client/modules/core/components/Dialog.jsx';
import PeopleList from '/client/modules/core/components/PeopleList.jsx';

export default class ChatMembers extends React.Component {

  handleClose() {
    this.props.onRequestClose();
  }

  render() {
    return (
      <Dialog
        title="Chat Members"
        open={this.props.open}
        onRequestClose={this.handleClose.bind(this)}
        closeActionOnly
        width={600}
        actionsContainerStyle={{borderTop: '1px solid rgba(0,0,0,0.15)'}}
        bodyStyle={{padding: '0'}}
        onShow={() => {this._peopleList.focusSearchBar();}}
      >
        <PeopleList ref={ x => this._peopleList = x }/>
      </Dialog>
    );
  }
}
