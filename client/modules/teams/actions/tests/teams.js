const {describe, it} = global;
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import actions from '../teams';

describe('teams.actions.teams', () => {
  describe('select', () => {
    it('should set a new teamId', () => {
      const LocalState = {set: spy()};

      actions.select({LocalState}, 'someTeamId');

      expect(LocalState.set.withArgs('teamId').calledOnce).to.be.true;
      expect(LocalState.set.withArgs('teamId', 'someTeamId').calledOnce).to.be.true;
    });

    it('should set convoId to null', () => {
      const LocalState = {set: spy()};

      actions.select({LocalState}, 'someTeamId');

      expect(LocalState.set.withArgs('convoId').calledOnce).to.be.true;
      expect(LocalState.set.withArgs('convoId', null).calledOnce).to.be.true;
    });
  });
});
