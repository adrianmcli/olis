import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/main_layout.jsx';
import Home from './components/home.jsx';

import AccountUtils from '/client/modules/core/libs/account';
import TeamUtils from '/client/modules/core/libs/teams';
import ConvoUtils from '/client/modules/core/libs/convos';

export default function (injectDeps, {Meteor, LocalState, FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/home', {
    name: 'home',
    action() {
      const teamId = AccountUtils.getMostRecentTeamId({Meteor});
      const convoId = AccountUtils.getMostRecentConvoId({Meteor});

      TeamUtils.select({Meteor, LocalState}, teamId);
      ConvoUtils.select({Meteor, LocalState}, convoId);

      mount(MainLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });
}
