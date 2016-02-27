import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';
import ManageTeams from './components/ManageTeams.jsx';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/home/teams', {
    name: 'teams',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<ManageTeams />)
      });
    }
  });
}
