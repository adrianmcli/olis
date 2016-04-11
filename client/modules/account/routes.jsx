import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '../core/components/main_layout.jsx';
import SetPassword from './containers/set_password';
import FindMyTeam from './containers/find_my_team';
import Login from './containers/login';
import MyAccount from './containers/my_account';

import Registration from './containers/registration';
import InviteeOnboard from './containers/invitee_onboard';
import ForgotPassword from './components/ForgotPassword.jsx';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  function redirectToRegisterEmail(context, redirect) {
    redirect('/register/email');
  }

  function redirectToInviteUsername(context, redirect) {
    redirect(`/invite/username/${context.params.token}`);
  }

  FlowRouter.route('/register', {
    name: 'register',
    triggersEnter: [ redirectToRegisterEmail ]
  });

  FlowRouter.route('/register/email', {
    name: 'register-email',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Registration />)
      });
    }
  });

  FlowRouter.route('/register/username', {
    name: 'register-username',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Registration />)
      });
    }
  });

  FlowRouter.route('/register/password', {
    name: 'register-password',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Registration />)
      });
    }
  });

  FlowRouter.route('/register/team-name', {
    name: 'register-team-name',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Registration />)
      });
    }
  });

  FlowRouter.route('/register/invite', {
    name: 'register-invite',
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
    name: 'invite',
    triggersEnter: [ redirectToInviteUsername ]
  });

  FlowRouter.route('/invite/username/:token', {
    name: 'invite-username',
    action(params) {
      mount(MainLayoutCtx, {
        content: () => (<InviteeOnboard token={params.token} />)
      });
    }
  });

  FlowRouter.route('/invite/password/:token', {
    name: 'invite-password',
    action(params) {
      mount(MainLayoutCtx, {
        content: () => (<InviteeOnboard token={params.token} />)
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

  FlowRouter.route('/forgot-password', {
    name: 'forgot-password',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<ForgotPassword />)
      });
    }
  });
}
