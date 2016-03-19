import React from 'react';

import Dialog from '/client/modules/core/components/Dialog.jsx';
import PeopleList from '/client/modules/core/components/PeopleList.jsx';
import UserInfo from '/client/modules/core/components/UserInfo.jsx';

export default class TeamDirectory extends React.Component {
  render() {
    return (
      <Dialog
        title="Team Directory"
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        closeActionOnly
        width={600}
        actionsContainerStyle={{borderTop: '1px solid rgba(0,0,0,0.15)'}}
        bodyStyle={{padding: '0'}}
        onShow={() => {this._peopleList.focusSearchBar();}}
      >
        <div style={{display: 'flex'}}>
          <div style={{width: '360px', position: 'relative'}}>
            <PeopleList ref={ x => this._peopleList = x }/>
          </div>
          <div style={{
            width: '280px',
            height: '432px',
            position: 'relative',
            overflowY: 'scroll',
          }}>
            <UserInfo />
          </div>
        </div>
      </Dialog>
    );
  }
}
