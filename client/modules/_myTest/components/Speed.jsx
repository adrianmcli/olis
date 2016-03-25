import React from 'react';
import SpeedConvos from '../containers/speed_convos';
import SpeedMsgs from '../containers/speed_msgs';

export default class Speed extends React.Component {
  render() {
    return (
      <div>
        <SpeedConvos />
        <SpeedMsgs />
      </div>
    );
  }
}
