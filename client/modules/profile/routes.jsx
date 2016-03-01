import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';
import MyAccount from './containers/my_account';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/home/profile', {
    name: 'profile',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<MyAccount />)
      });
    }
  });
}
