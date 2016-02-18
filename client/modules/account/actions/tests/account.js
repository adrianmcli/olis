const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import actions from '../account';

describe('account.actions.account', () => {
  describe('register', () => {
    it('should reject if username blank', () => {
      const LocalState = {set: spy()};
      const Meteor = {call: stub()};

      actions.register({Meteor, LocalState}, {
        email: 'test@test.com', username: '', password: '123456'
      });

      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('REGISTRATION_ERROR');
      expect(args[1]).to.match(/username/);
    });

    it('should reject if email username null', () => {
      const LocalState = {set: spy()};
      const Meteor = {call: stub()};

      actions.register({Meteor, LocalState}, {
        email: 'test@test.com', username: null, password: '123456'
      });

      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('REGISTRATION_ERROR');
      expect(args[1]).to.match(/username/);
    });

    it('should reject if email blank', () => {
      const LocalState = {set: spy()};
      const Meteor = {call: stub()};

      actions.register({Meteor, LocalState}, {
        email: '', username: 'test', password: '123456'
      });

      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('REGISTRATION_ERROR');
      expect(args[1]).to.match(/email/);
    });

    it('should reject if email email null', () => {
      const LocalState = {set: spy()};
      const Meteor = {call: stub()};

      actions.register({Meteor, LocalState}, {
        email: null, username: 'test', password: '123456'
      });

      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('REGISTRATION_ERROR');
      expect(args[1]).to.match(/email/);
    });

    it('should redirect to /home on register success', () => {
      const LocalState = {set: spy()};
      const Meteor = {call: stub(), loginWithPassword: stub()};
      const FlowRouter = {go: stub()};
      Meteor.call.callsArgWith(2, null, {username: 'test', password: '123456'});
      Meteor.loginWithPassword.callsArgWith(2, null);

      actions.register({Meteor, LocalState, FlowRouter}, {
        email: 'test@test.com', username: 'test', password: '123456'
      });

      expect(FlowRouter.go.args[0][0]).to.be.equal('/home');
    });
  });
});
