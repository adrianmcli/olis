import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '../core/components/main_layout.jsx';
import PostList from './containers/post_list.jsx';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/test', {
    name: 'test',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<PostList />)
      });
    }
  });

  FlowRouter.route('/test-medium', {
    name: 'test-medium',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<TestMedium />)
      });
    }
  });
}
