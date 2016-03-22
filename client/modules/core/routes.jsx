import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/main_layout.jsx';
import Home from './containers/home';

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

  FlowRouter.route('/team', {
    name: 'no-team',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });

  FlowRouter.route('/team/:teamId', {
    name: 'team',
    triggersEnter: [ ensureSignedIn ],
    triggersExit: [ setLastTimeInTeam ],
    action(params) {
      Meteor.call('teams.isMember', {teamId: params.teamId}, (err, res) => {
        if (err) {
          mount(MainLayoutCtx, {
            content: () => (<div>You are not authorized to view this page.</div>)
          });
        }
        else {
          setLastTimeInTeam({params});
          mount(MainLayoutCtx, {
            content: () => (<Home />)
          });
        }
      });
    }
  });

  FlowRouter.route('/team/:teamId/convo/:convoId', {
    name: 'team-convo',
    triggersEnter: [ ensureSignedIn, removeNotifications ],
    triggersExit: [ setLastTimeInTeam, setLastTimeInConvo, removeNotifications ],
    action(params) {
      Meteor.call('convos.isMember', {convoId: params.convoId}, (err, res) => {
        if (err) {
          mount(MainLayoutCtx, {
            content: () => (<div>You are not authorized to view this page.</div>)
          });
        }
        else {
          setLastTimeInTeam({params});
          setLastTimeInConvo({params});
          mount(MainLayoutCtx, {
            content: () => (<Home />)
          });
        }
      });
    }
  });
}
