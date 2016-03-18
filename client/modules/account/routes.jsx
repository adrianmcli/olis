import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '../core/components/main_layout.jsx';
import SetPassword from './containers/set_password';
import FindMyTeam from './containers/find_my_team';
import Login from './containers/login';
import MyAccount from './containers/my_account';

import Registration from './containers/registration';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/register', {
    name: 'register',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Registration />)
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
