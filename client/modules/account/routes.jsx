import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '../core/components/main_layout.jsx';
import RegisterEmail from './containers/register_email';
import RegisterUsername from './containers/register_username';
import RegisterTeamName from './containers/register_team-name';
import RegisterInvite from './containers/register_invite';
import SetPassword from './containers/set_password';
import FindMyTeam from './containers/find_my_team';
import Login from './containers/login';
import MyAccount from './containers/my_account';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/register', {
    name: 'register',
    triggersEnter: [ function (context, redirect) {
      redirect('/register/email');
    } ]
  });

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

  FlowRouter.route('/find-my-team', {
    name: 'find-my-team',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<FindMyTeam />)
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

  FlowRouter.route('/invite/:token', {
    name: 'enroll-account',
    action(params) {
      mount(MainLayoutCtx, {
        content: () => (<SetPassword token={params.token} />)
      });
    }
  });

  FlowRouter.route('/reset/:token', {
    name: 'reset-password',
    action(params) {
      mount(MainLayoutCtx, {
        content: () => (<SetPassword token={params.token} />)
      });
    }
  });

  FlowRouter.route('/account/:username', {
    name: 'account',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<MyAccount />)
      });
    }
  });
}
