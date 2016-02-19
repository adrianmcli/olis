import React from 'react';

const ConvosBar = ({convos, addConvo, selectConvo}) => (
  <div>
    <h2>Convos</h2>
    <button onClick={addConvo.bind(null)}>Add</button>
    {
      convos.map(convo => {
        return <div onClick={selectConvo.bind(null, convo._id)}>{convo.name} {convo._id}</div>;
      })
    }
  </div>
);

export default ConvosBar;
