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
export default class SpeedConvos extends React.Component {
  render() {
    const {convoId, convos, actions} = this.props;
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
      </div>
    );
  }
}
