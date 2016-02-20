import React from 'react';

const ConvosBar = ({context, convos, addConvo, selectConvo}) => (
  <div>
    <h2>Convos {context().LocalState.get('convoId')}</h2>
    <button onClick={addConvo.bind(null, 'convo name', [ context().Meteor.userId() ])}>Add</button>
    {
      convos.map(convo => {
        return (
          <div>
            <div onClick={selectConvo.bind(null, convo._id)}>{convo.name} {convo._id}</div>
            <div>
              Users:
              {convo.userIds.map(userId => <span>{userId}, </span>)}
            </div>
          </div>
        );
      })
    }
  </div>
);

export default ConvosBar;
