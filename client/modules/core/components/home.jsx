import React from 'react';
import TeamsBar from '../../teams/containers/teams_bar';
import ConvosBar from '../../convos/containers/convos_bar';
import MsgsBar from '../../messages/containers/msgs_bar';
import UsersBar from '../../users/containers/users_bar';
import NotesBar from '../../notes/containers/notes_bar';

const Home = () => (
  <div id="main-page">
    <div id="teams-column">
      <TeamsBar />
    </div>
    <div id="sidebar">
      <ConvosBar />
    </div>
    <div id="chat-column">
      <MsgsBar />
    </div>
    <div id="notes-column">
      <NotesBar />
    </div>
  </div>
);

export default Home;
