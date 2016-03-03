import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';
import TeamSettings from './containers/team_settings';

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

  FlowRouter.route('/home/team-settings', {
    name: 'team-settings',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<TeamSettings />)
      });
    }
  });
}
