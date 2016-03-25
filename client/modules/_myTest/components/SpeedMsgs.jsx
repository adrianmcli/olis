import React from 'react';

class SpeedMsg extends React.Component {
  render() {
    const {msg} = this.props;
    console.log(`SpeedMsg render ${msg.text}`);
    return (
      <div>{msg.text}</div>
    );
  }
}

export default class SpeedMsgs extends React.Component {
  render() {
    const {msgs} = this.props;
    return (
      <div>
        <h2>Msgs</h2>
        {msgs.map(msg => <SpeedMsg key={msg._id} msg={msg}/>)}
      </div>
    );
  }
}
