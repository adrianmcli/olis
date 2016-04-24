import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';
import ManageTeams from './containers/manage_teams';
import TeamSettings from './containers/team_settings';
import NotAuthorized from '/client/modules/core/components/NotAuthorized.jsx';

export default function (injectDeps, {Meteor, FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/teams', {
    name: 'teams',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<ManageTeams />)
      });
    }
  });

  FlowRouter.route('/team/:teamId/settings', {
    name: 'team-settings',
    action({teamId}) {
      Meteor.call('teams.isAdmin', {teamId}, (err, res) => {
        if (err) {
          mount(MainLayoutCtx, {
            content: () => (<NotAuthorized />)
          });
        }
        else {
          mount(MainLayoutCtx, {
            content: () => (<TeamSettings />)
          });
        }
      });
    }
  });

  FlowRouter.route('/team/:teamId/convo/:convoId/settings', {
    name: 'team-settings',
    action({teamId}) {
      Meteor.call('teams.isAdmin', {teamId}, (err, res) => {
        if (err) {
          mount(MainLayoutCtx, {
            content: () => (<NotAuthorized />)
          });
        }
        else {
          mount(MainLayoutCtx, {
            content: () => (<TeamSettings />)
          });
        }
      });
    }
  });
}
