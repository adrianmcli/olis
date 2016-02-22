import React from 'react';

const MsgsBar = ({msgs, addMsg}) => (
  <div>
    <h2>Msgs</h2>
    <button onClick={addMsg}>Add</button>
    {
      msgs.map(msg => <div>{msg.text} {msg._id}</div>)
    }
  </div>
);

export default MsgsBar;
