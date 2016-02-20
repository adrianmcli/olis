import React from 'react';

const UsersBar = ({context, users, addToTeam, addToConvo}) => (
  <div>
    <h2>Users {context().Meteor.userId()}</h2>
    {
      users.map(user => {
        return (
          <div>
            {user.username} {user._id}
            <span><button onClick={addToTeam.bind(null, context().LocalState.get('teamId'), [ user._id ])}>Add to team</button></span>
            <span><button onClick={addToConvo.bind(null, context().LocalState.get('convoId'), [ user._id ])}>Add to convo</button></span>
          </div>
        );
      })
    }
  </div>
);

export default UsersBar;
