import React from 'react';

const TeamsBar = ({context, teams, addTeam, selectTeam}) => (
  <div>
    <h2>Teams {context().LocalState.get('teamId')}</h2>
    <button onClick={addTeam}>Add</button>
    {
      teams.map(team => {
        return (
          <div>
            <div onClick={selectTeam.bind(this, team._id)}>{team.name} {team._id}</div>
            <div>
              Users:
              {team.userIds.map(userId => <span>{userId}, </span>)}
            </div>
          </div>
        );
      })
    }
  </div>
);

export default TeamsBar;
