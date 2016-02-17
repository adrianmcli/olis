import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '../core/components/main_layout.jsx';
import Register from './containers/register';
import Login from './containers/login';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/register', {
    name: 'register',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Register />)
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
