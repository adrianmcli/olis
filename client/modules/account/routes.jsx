import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '../core/components/main_layout.jsx';
import RegisterEmail from './containers/register_email';
import RegisterUsername from './containers/register_username';
import RegisterTeamName from './containers/register_team-name';
import RegisterInvite from './containers/register_invite';
import Login from './containers/login';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/register/email', {
    name: 'register-email',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<RegisterEmail />)
      });
    }
  });

  FlowRouter.route('/register/username', {
    name: 'register-username',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<RegisterUsername />)
      });
    }
  });

  FlowRouter.route('/register/team-name', {
    name: 'register-team-name',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<RegisterTeamName />)
      });
    }
  });

  FlowRouter.route('/register/invite', {
    name: 'register-invite',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<RegisterInvite />)
      });
    }
  });

  FlowRouter.route('/login', {
    name: 'login',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Login />)
      });
    }
  });
}
