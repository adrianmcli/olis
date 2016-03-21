import React from 'react';

import PeopleList from './PeopleList.jsx';
import ChipsContainer from './ChipsContainer.jsx';

export default class PeoplePicker extends React.Component {
  render() {
    const {usersNotAdded, usersToAdd, team, addUserId, removeUserId, search} = this.props;

    return (
      <div style={{display: 'flex'}}>
        <div style={{width: '360px', position: 'relative'}}>
          <PeopleList
            users={usersNotAdded}
            userClickHandler={addUserId}
            team={team}
            search={search}
          />
        </div>
        <div style={{
          width: '240px',
          height: '432px',
          position: 'relative',
          overflowY: 'scroll',
        }}>
          <ChipsContainer
            usersToAdd={usersToAdd}
            removeUserId={removeUserId}
          />
        </div>
      </div>
    );
  }
}
