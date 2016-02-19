import React from 'react';
import TeamsBar from '../../teams/containers/teams_bar';
import ConvosBar from '../../convos/containers/convos_bar';
import MsgsBar from '../../messages/containers/msgs_bar';

const Home = () => (
  <div>
    <TeamsBar />
    <ConvosBar />
    <MsgsBar />
  </div>
);

export default Home;
