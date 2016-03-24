import React from 'react';
import TeamsBar from '../../teams/containers/teams_bar';
import ConvosBar from '../../convos/containers/convos_bar';
import MsgsBar from '../../chat/containers/msgs_bar';
import NotesBar from '../../notes/containers/notes_bar';

import NoTeamSelected from './NoTeamSelected.jsx';
import NoConvoSelected from './NoConvoSelected.jsx';

const Home = ({teamId, convoId, goToMyAccount, logout}) => (
  <div id="main-page">
    <div id="teams-column"><TeamsBar /></div>
    {teamId ?
      <div id="sidebar"><ConvosBar /></div> :
      <NoTeamSelected goToMyAccount={goToMyAccount} logout={logout} />
    }
    {teamId && convoId ? <div id="chat-column"><MsgsBar /></div> : null}
    {teamId && convoId ? <div id="notes-column"><NotesBar /></div> : null}
    {teamId && !convoId ? <NoConvoSelected /> : null}
  </div>
);

export default Home;
