import React from 'react';

const TeamsBar = ({teams, addTeam, selectTeam}) => (
  <div>
    <h2>Teams</h2>
    <button onClick={addTeam}>Add</button>
    {
      teams.map(team => {
        return <div onClick={selectTeam.bind(this, team._id)}>{team.name}</div>;
      })
    }
  </div>
);

export default TeamsBar;
