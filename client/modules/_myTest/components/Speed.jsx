import React from 'react';

class SpeedConvo extends React.Component {
  render() {
    const {convo, onClick} = this.props;
    console.log(`SpeedConvo render ${convo.name}`);
    return (
      <div onClick={onClick}>{convo._id} {convo.name}</div>
    );
  }
}

class SpeedMsg extends React.Component {
  render() {
    const {msg} = this.props;
    console.log(`SpeedMsg render ${msg.text}`);
    return (
      <div>{msg.text}</div>
    );
  }
}

export default class Speed extends React.Component {
  render() {
    const {convos, msgs, actions, convoId} = this.props;
    return (
      <div>
        <h1>Convos: {convoId}</h1>
        {convos.map(convo =>
          <SpeedConvo
            key={convo._id}
            convo={convo}
            onClick={actions().test['speed.selectConvo'].bind(null, convo._id)}
          />
        )}

        <h2>Msgs</h2>
        {msgs.map(msg => <SpeedMsg key={msg._id} msg={msg}/>)}
      </div>
    );
  }
}
Speed.defaultProps = {
  convos: [],
  msgs: []
};
