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

  function setLastTimeInTeam(teamId) {
    TeamUtils.setLastTimeInTeam({Meteor}, teamId);
  }

  function setLastTimeInConvo(convoId) {
    ConvoUtils.setLastTimeInConvo({Meteor, Collections}, convoId);
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
    action({teamId}) {
      Meteor.call('teams.isMember', {teamId}, (err, res) => {
        if (err) {
          mount(MainLayoutCtx, {
            content: () => (<div>You are not authorized to view this page.</div>)
          });
        }
        else {
          setLastTimeInTeam(teamId);
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
    action({teamId, convoId}) {
      Meteor.call('convos.isMember', {convoId}, (err, res) => {
        if (err) {
          mount(MainLayoutCtx, {
            content: () => (<div>You are not authorized to view this page.</div>)
          });
        }
        else {
          setLastTimeInTeam(teamId);
          setLastTimeInConvo(convoId);
          mount(MainLayoutCtx, {
            content: () => (<Home />)
          });
        }
      });
    }
  });
}
