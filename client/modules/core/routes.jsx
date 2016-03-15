import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/main_layout.jsx';
import Home from './components/home.jsx';

import AccountUtils from '/client/modules/core/libs/account';
import TeamUtils from '/client/modules/core/libs/teams';
import ConvoUtils from '/client/modules/core/libs/convos';

export default function (injectDeps, {Meteor, LocalState, FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  function ensureSignedIn(context, redirect) {
    if (!Meteor.userId()) { redirect('/login'); }
  }

  function setLastTimeInTeam({params}) {
    TeamUtils.setLastTimeInTeam(params.teamId);
  }

  function setLastTimeInConvo({params}) {
    ConvoUtils.setLastTimeInConvo(params.convoId);
  }

  FlowRouter.route('/team/:teamId', {
    name: 'team',
    triggersEnter: [ ensureSignedIn ],
    triggersExit: [ setLastTimeInTeam ],
    action(params) {
      setLastTimeInTeam({params});

      mount(MainLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });

  FlowRouter.route('/team/:teamId/convo/:convoId', {
    name: 'team',
    triggersEnter: [ ensureSignedIn ],
    triggersExit: [ setLastTimeInTeam, setLastTimeInConvo ],
    action(params) {
      setLastTimeInTeam({params});
      setLastTimeInConvo({params});

      mount(MainLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });
}
