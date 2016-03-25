import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '../core/components/main_layout.jsx';
import PostList from './containers/post_list.jsx';
import Speed from './containers/speed';

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

  FlowRouter.route('/test/speed/team/:teamId', {
    name: 'test-speed-team',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Speed />)
      });
    }
  });

  FlowRouter.route('/test/speed/team/:teamId/convo/:convoId', {
    name: 'test-speed-team-convo',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Speed />)
      });
    }
  });
}
