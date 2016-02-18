const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import actions from '../account';

describe('account.actions.account', () => {
  describe('register', () => {
    it('should reject if username blank', () => {
      const Meteor = {call: stub()};
      const LocalState = {set: spy()};

      actions.register({Meteor, LocalState}, {
        email: 'test@test.com', username: '', password: '123456'
      });

      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('REGISTRATION_ERROR');
      expect(args[1]).to.match(/username/);
    });

    it('should reject if email username null', () => {
      const Meteor = {call: stub()};
      const LocalState = {set: spy()};

      actions.register({Meteor, LocalState}, {
        email: 'test@test.com', username: null, password: '123456'
      });

      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('REGISTRATION_ERROR');
      expect(args[1]).to.match(/username/);
    });

    it('should reject if email blank', () => {
      const Meteor = {call: stub()};
      const LocalState = {set: spy()};

      actions.register({Meteor, LocalState}, {
        email: '', username: 'test', password: '123456'
      });

      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('REGISTRATION_ERROR');
      expect(args[1]).to.match(/email/);
    });

    it('should reject if email email null', () => {
      const Meteor = {call: stub()};
      const LocalState = {set: spy()};

      actions.register({Meteor, LocalState}, {
        email: null, username: 'test', password: '123456'
      });

      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('REGISTRATION_ERROR');
      expect(args[1]).to.match(/email/);
    });

    describe('after Meteor.call account.register', () => {
      describe('if success', () => {
        it('should redirect to /home on register success', () => {
          const Meteor = {call: stub(), loginWithPassword: stub()};
          const LocalState = {set: spy()};
          const FlowRouter = {go: stub()};

          Meteor.call.callsArgWith(2, null, {username: 'test', password: '123456'});
          Meteor.loginWithPassword.callsArgWith(2, null);

          actions.register({Meteor, LocalState, FlowRouter}, {
            email: 'test@test.com', username: 'test', password: '123456'
          });

          expect(FlowRouter.go.args[0][0]).to.be.equal('/home');
        });
      });

      describe('if error in Meteor.call account.register', () => {
        it('should set REGISTRATION_ERROR with error reason', () => {
          const Meteor = {call: stub(), loginWithPassword: stub()};
          const LocalState = {set: spy()};
          const FlowRouter = {go: stub()};

          const err = {reason: 'fail'};
          Meteor.call.callsArgWith(2, err, {username: 'test', password: '123456'});

          actions.register({Meteor, LocalState, FlowRouter}, {
            email: 'test@test.com', username: 'test', password: '123456'
          });

          expect(LocalState.set.args[1]).to.deep.equal([ 'REGISTRATION_ERROR', err.reason ]);
        });
      });

      describe('if error in Meteor.loginWithPassword', () => {
        it('should set REGISTRATION_ERROR with error reason', () => {
          const Meteor = {call: stub(), loginWithPassword: stub()};
          const LocalState = {set: spy()};
          const FlowRouter = {go: stub()};

          const err = {reason: 'fail'};
          Meteor.call.callsArgWith(2, null, {username: 'test', password: '123456'});
          Meteor.loginWithPassword.callsArgWith(2, err);

          actions.register({Meteor, LocalState, FlowRouter}, {
            email: 'test@test.com', username: 'test', password: '123456'
          });

          expect(LocalState.set.args[1]).to.deep.equal([ 'REGISTRATION_ERROR', err.reason ]);
        });
      });
    });
  });

  describe('login', () => {
    describe('after Meteor.loginWithPassword call', () => {
      describe('if success', () => {
        it('should redirect to /home on login success', () => {
          const LocalState = {set: spy()};
          const Meteor = {loginWithPassword: stub()};
          const FlowRouter = {go: stub()};

          Meteor.loginWithPassword.callsArgWith(2, null);

          actions.login({Meteor, LocalState, FlowRouter}, {
            email: 'test@test.com', username: 'test', password: '123456'
          });

          expect(FlowRouter.go.args[0][0]).to.be.equal('/home');
        });
      });
      describe('if error', () => {
        it('should set LOGIN_ERROR with error reason', () => {
          const LocalState = {set: spy()};
          const Meteor = {loginWithPassword: stub()};
          const FlowRouter = {go: stub()};
          const err = {reason: 'failed'};

          Meteor.loginWithPassword.callsArgWith(2, err);

          actions.login({Meteor, LocalState, FlowRouter}, {
            email: 'test@test.com', username: 'test', password: '123456'
          });
          // The 2nd time LocalState is called, args for each call are stored as array
          expect(LocalState.set.args[1]).to.deep.equal([ 'LOGIN_ERROR', err.reason ]);
        });
      });
    });
  });
});
