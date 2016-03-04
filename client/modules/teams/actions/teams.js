import TeamUtils from '/client/modules/core/libs/teams';
import R from 'ramda';
import EmailValidator from 'email-validator';

export default {
  add({Meteor, LocalState}, name, userIds) {
    Meteor.call('teams.add', {name, userIds}, (err, teamId) => {
      if (err) { alert(err); }
      else { TeamUtils.select({Meteor, LocalState}, teamId); }
    });
  },

  select({Meteor, LocalState}, teamId) {
    TeamUtils.select({Meteor, LocalState}, teamId);
  },

  addMembers({Meteor, LocalState}, teamId, userIds) {
    Meteor.call('teams.addMembers', {teamId, userIds}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  },

  goToManageTeams({Meteor, LocalState, FlowRouter}) {
    TeamUtils.select({Meteor, LocalState}, null);
    FlowRouter.go('/home/teams');
  },

  goToTeamSettings({FlowRouter}) {
    FlowRouter.go('/home/team-settings');
  },

  'manageTeams.selectAndGo'({Meteor, LocalState, FlowRouter}, teamId) {
    TeamUtils.select({Meteor, LocalState}, teamId);
    LocalState.set('ignoreDefaultTeamAndConvo', true);
    FlowRouter.go('/home');
  },

  setName({Meteor, LocalState}, name) {
    const teamId = LocalState.get('teamId');
    Meteor.call('teams.setName', {teamId, name}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  },

  setUserRole({Meteor, LocalState}, userId, role) {
    const teamId = LocalState.get('teamId');
    Meteor.call('teams.setUserRole', {teamId, changeUserId: userId, role}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  },

  invite({Meteor, LocalState}, inviteEmails, callback) {
    const teamId = LocalState.get('teamId');

    try {
      let numNonEmpty = 0;
      inviteEmails.forEach(email => {
        if (!EmailValidator.validate(email) && !R.isEmpty(email)) {
          throw new Meteor.Error('actions.teams.invite', 'Enter proper emails.');
        }

        if (!R.isEmpty(email)) { numNonEmpty++; }
        if (numNonEmpty === 0) {
          throw new Meteor.Error('actions.teams.invite', 'Enter at least one email.');
        }
      });

      Meteor.call('teams.invite', {inviteEmails, teamId}, (err, res) => {
        if (err) { alert(err); }
        else {
          console.log(res);
          callback();
        }
      });
    }
    catch (e) { alert(e); }
  }
};
