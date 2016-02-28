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

  FlowRouter.route('/home', {
    name: 'home',
    triggersEnter: [ ensureSignedIn ],
    action() {
      if (!LocalState.get('ignoreDefaultTeamAndConvo')) {
        const teamId = AccountUtils.getMostRecentTeamId({Meteor});
        const convoId = AccountUtils.getMostRecentConvoId({Meteor});

        if (teamId) { TeamUtils.select({LocalState, Meteor}, teamId); }
        if (convoId) { ConvoUtils.select({LocalState, Meteor}, convoId); }
      }
      mount(MainLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });
}
