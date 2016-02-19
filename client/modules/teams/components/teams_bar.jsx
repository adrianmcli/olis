import React from 'react';

const TeamsBar = ({teams, addTeam}) => (
  <div>
    Teams
    <button onClick={addTeam}>Add</button>
    {
      teams.map(team => { return <div>{team.name}</div>; })
    }
  </div>
);

export default TeamsBar;
