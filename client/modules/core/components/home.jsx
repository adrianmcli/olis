import React from 'react';
import TeamsBar from '../../teams/containers/teams_bar';
import ConvosBar from '../../convos/containers/convos_bar';
import MsgsBar from '../../messages/containers/msgs_bar';
import UsersBar from '../../users/containers/users_bar';

const Home = () => (
  <div>
    <TeamsBar />
    <ConvosBar />
    <MsgsBar />
    <UsersBar />
  </div>
);

export default Home;
