import React from 'react';

export default class Speed extends React.Component {
  render() {
    const {convos, msgs, actions, convoId} = this.props;
    return (
      <div>
        <h1>Convos: {convoId}</h1>
        {convos.map(convo =>
          <div
            key={convo._id}
            onClick={actions().test['speed.selectConvo'].bind(null, convo._id)}
          >
            {convo._id} {convo.name}
          </div>
        )}

        <h2>Msgs</h2>
        {msgs.map(msg => <div key={msg._id}>{msg.text}</div>)}
      </div>
    );
  }
}
Speed.defaultProps = {
  convos: [],
  msgs: []
};
