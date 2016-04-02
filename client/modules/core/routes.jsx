import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/main_layout.jsx';
import Home from './containers/home';

import AccountUtils from '/client/modules/core/libs/account';
import TeamUtils from '/client/modules/core/libs/teams';
import ConvoUtils from '/client/modules/core/libs/convos';

export default function (injectDeps, {Meteor, FlowRouter, Collections, LocalState}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  function ensureSignedIn(context, redirect) {
    if (!Meteor.userId()) { redirect('/login'); }
  }

  function rootRedirect(context, redirect) {
    if (Meteor.userId()) {
      const teamId = AccountUtils.getMostRecentTeamId({Meteor});
      const convoId = AccountUtils.getMostRecentConvoId({Meteor});

      if (teamId && convoId) { redirect(`/team/${teamId}/convo/${convoId}`); }
      else if (teamId && !convoId) { redirect(`/team/${teamId}`); }
    }
    else { redirect('/login'); }
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

  function resetNumVisibleMsgs({params}) {
    const convoId = params.convoId;
    LocalState.set(`${convoId}.msgs.visibleAfterDate`, undefined);
    LocalState.set(`${convoId}.msgs.numVisible`, undefined);
  }

  FlowRouter.route('/', {
    name: 'root',
    triggersEnter: [ rootRedirect ]
  });

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
      const {teamId} = params;
      Meteor.call('teams.isMember', {teamId}, (err, res) => {
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
    triggersEnter: [ ensureSignedIn, removeNotifications, resetNumVisibleMsgs ],
    triggersExit: [ setLastTimeInTeam, setLastTimeInConvo, removeNotifications, resetNumVisibleMsgs ],
    action(params) {
      const {convoId} = params;
      Meteor.call('convos.isMember', {convoId}, (err, res) => {
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

  FlowRouter.route('/team/:teamId/convo/:convoId/msg/:msgId', {
    name: 'team-convo-msg',
    triggersEnter: [ ensureSignedIn, removeNotifications, resetNumVisibleMsgs ],
    triggersExit: [ setLastTimeInTeam, setLastTimeInConvo, removeNotifications, resetNumVisibleMsgs ],
    action(params) {
      const {convoId} = params;
      Meteor.call('convos.isMember', {convoId}, (err, res) => {
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
