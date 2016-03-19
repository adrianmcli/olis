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

  select({FlowRouter}, teamId) {
    FlowRouter.go(`/team/${teamId}`);
  },

  addMembers({Meteor, LocalState}, teamId, userIds) {
    Meteor.call('teams.addMembers', {teamId, userIds}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  },

  goToManageTeams({FlowRouter}) {
    FlowRouter.go('/teams');
  },

  goToTeamSettings({FlowRouter}) {
    const teamId = FlowRouter.getParam('teamId');
    const convoId = FlowRouter.getParam('convoId');

    if (convoId) { FlowRouter.go(`/team/${teamId}/convo/${convoId}/settings`); }
    else { FlowRouter.go(`/team/${teamId}/settings`); }
  },

  setName({Meteor, FlowRouter}, name) {
    const teamId = FlowRouter.getParam('teamId');
    Meteor.call('teams.setName', {teamId, name}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  },

  setInfo({Meteor, FlowRouter}, info) {
    const teamId = FlowRouter.getParam('teamId');
    Meteor.call('teams.setInfo', {teamId, info}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  },

  setUserRole({Meteor, FlowRouter}, userId, role) {
    const teamId = FlowRouter.getParam('teamId');
    Meteor.call('teams.setUserRole', {teamId, changeUserId: userId, role}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  },

  invite({Meteor, LocalState, FlowRouter}, inviteEmails, callback) {
    const teamId = FlowRouter.getParam('teamId');

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
  },

  showUserInfo({LocalState}, userId) {
    LocalState.set('teamDirectory.userShown', userId);
  }
};
