import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/main_layout.jsx';
import Home from './components/home.jsx';

import TeamUtils from '/client/modules/core/libs/teams';
import ConvoUtils from '/client/modules/core/libs/convos';

export default function (injectDeps, {Meteor, FlowRouter, Collections}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  function ensureSignedIn(context, redirect) {
    if (!Meteor.userId()) { redirect('/login'); }
  }

  function setLastTimeInTeam({params}) {
    TeamUtils.setLastTimeInTeam({Meteor}, params.teamId);
  }

  function setLastTimeInConvo({params}) {
    ConvoUtils.setLastTimeInConvo({Meteor, Collections}, params.convoId);
  }

  function removeNotifications({params}) {
    const {convoId} = params;
    Meteor.call('notifications.remove', {convoId}, (err) => {
      if (err) { alert(err); }
    });
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
    triggersEnter: [ ensureSignedIn, removeNotifications ],
    triggersExit: [ setLastTimeInTeam, setLastTimeInConvo, removeNotifications ],
    action(params) {
      setLastTimeInTeam({params});
      setLastTimeInConvo({params});

      mount(MainLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });
}
