import R from 'ramda';
import TeamUtils from '/client/modules/core/libs/teams';
import { Accounts } from 'meteor/accounts-base';

export default {
  register({Meteor, LocalState, FlowRouter}) {
    const email = LocalState.get('register.email');
    const displayName = LocalState.get('register.username');
    const password = LocalState.get('register.password');
    const teamName = LocalState.get('register.teamName');
    const inviteEmails = LocalState.get('register.inviteEmails');

    console.log(`email ${email}`);
    console.log(`displayName ${displayName}`);
    console.log(`password ${password}`);
    console.log(`teamName ${teamName}`);
    console.log(inviteEmails);

    LocalState.set('register.email', null);
    LocalState.set('register.username', null);
    LocalState.set('register.password', null);
    LocalState.set('register.teamName', null);
    LocalState.set('register.inviteEmails', null);

    function _register() {
      return new Promise((resolve, reject) => {
        Accounts.createUser({email, password}, (err) => {
          if (err) { reject(err); }
          else { resolve(); }
        });
      });
    }

    function _setDisplayName() {
      return new Promise((resolve, reject) => {
        Meteor.call('account.setDisplayName', {displayName}, err => {
          if (err) { reject(err); }
        });
        resolve();
      });
    }

    function _createTeam() {
      return new Promise((resolve, reject) => {
        Meteor.call('teams.add.withShadow', {
          name: teamName,
          userIds: [ Meteor.userId() ],
        }, (err, teamId) => {
          if (err) { reject(err); }
          else {
            resolve({teamId});
          }
        });
      });
    }

    function _route([ x, {teamId} ]) {
      console.log(x);
      console.log(teamId);
      return new Promise((resolve, reject) => {
        FlowRouter.go(`/team/${teamId}/`);
        resolve({teamId});
      });
    }

    function _sendInvites({teamId}) {
      return new Promise((resolve, reject) => {
        Meteor.call('teams.invite.withShadow', {inviteEmails, teamId}, (err) => {
          if (err) { reject(err); }
          else { resolve({teamId}); }
        });
      });
    }

    _register()
    .then(() => {
      return Promise.all([ _setDisplayName(), _createTeam() ]);
    })
    .then(_route)
    .then(_sendInvites)
    .catch((err) => {
      console.log('REGISTRATION_ERROR');
      console.log(err);
    });
  },

  resetPassword({Meteor, FlowRouter}, token, pwd1, pwd2, callback = () => null) {
    function _reset(newPassword) {
      return new Promise((resolve, reject) => {
        Accounts.resetPassword(token, newPassword, (err) => {
          if (err) { reject(err); }
          else { resolve(); }
        });
      });
    }

    try {
      if (pwd1 !== pwd2) {
        throw new Meteor.Error('actions.account.resetPassword', 'Your passwords must match.');
      }

      const newPassword = pwd1;
      _reset(newPassword)
      .then(() => {
        const teamId = this.getMostRecentTeamId({Meteor});
        FlowRouter.go(`/team/${teamId ? teamId : ''}`);
      })
      .then(callback)
      .catch((err) => alert(err));
    }
    catch (e) { alert(e); }
  },

  getMostRecentTeamId({Meteor}) {
    const user = Meteor.user();
    if (!user) { return null; }
    if (!user.lastTimeInTeam || R.isEmpty(user.lastTimeInTeam)) { return null; }

    const pairs = R.toPairs(user.lastTimeInTeam);
    const sortByDate = R.sortBy(R.prop(1));
    const sorted = sortByDate(pairs); // asc
    const teamId = R.last(sorted)[0];

    return teamId;
  },

  getMostRecentConvoId({Meteor}) {
    const user = Meteor.user();
    if (!user) { return null; }
    if (!user.lastTimeInConvo || R.isEmpty(user.lastTimeInConvo)) { return null; }

    const sorted = this.getOrderedByVisitConvoIds({Meteor}, 'desc');
    const convoId = sorted[0][0];
    return convoId;
  },

  getOrderedByVisitConvoIds({Meteor}, sortOrder = 'asc') {
    const user = Meteor.user();
    const pairs = R.toPairs(user.lastTimeInConvo);

    const sortByTimestamp = R.sortBy(
      R.compose(
        R.prop('timestamp'),
        R.prop(1)
      )
    );
    const sortedAsc = sortByTimestamp(pairs);
    if (sortOrder === 'asc') { return sortedAsc; }
    else if (sortOrder === 'desc') { return R.reverse(sortedAsc); }
  },

  convertStringToColor(str) {
    // All must be readable with white text
    // Using Material colors 500, or the next closest number
    const colors = {
      red500: '#f44336',
      pink500: '#e91e63',
      purple500: '#9c27b0',
      deepPurple500: '#673ab7',
      indigo500: '#3f51b5',
      blue500: '#2196f3',
      lightBlue600: '#039be5',
      cyan700: '#0097a7',
      teal500: '#009688',
      green600: '#43a047',
      lightGreen700: '#689f38',
      lime900: '#827717',
      orange800: '#ef6c00',
      deepOrange500: '#ff5722',
      brown500: '#795548',
      blueGrey500: '#607d8b',
      grey600: '#757575',
    };

    const colorsArr = R.keys(colors);
    const index = str.length % colorsArr.length;
    const key = colorsArr[index];
    const color = colors[key];

    return color;
  }
};
