import R from 'ramda';
import TeamUtils from '/client/modules/core/libs/teams';

export default {
  register({Meteor, LocalState, FlowRouter}) {
    const email = LocalState.get('register.email');
    const username = LocalState.get('register.username');
    const teamName = LocalState.get('register.teamName');
    const inviteEmails = LocalState.get('register.inviteEmails');

    console.log(email);
    console.log(username);
    console.log(teamName);
    console.log(inviteEmails);

    LocalState.set('register.email', null);
    LocalState.set('register.username', null);
    LocalState.set('register.teamName', null);
    LocalState.set('register.inviteEmails', null);

    function _register() {
      return new Promise((resolve, reject) => {
        Meteor.call('account.register', {email, username, teamName}, (err, res) => {
          if (err) { reject(err); }
          else { resolve(res); }
        });
      });
    }

    function _login({password, teamId}) {
      return new Promise((resolve, reject) => {
        Meteor.loginWithPassword(username, password, (err) => {
          if (err) { reject(err); }
          else { resolve({teamId}); }
        });
      });
    }

    function _sendInvites({teamId}) {
      return new Promise((resolve, reject) => {
        Meteor.call('teams.invite', {inviteEmails, teamId}, (err) => {
          if (err) { reject(err); }
          else { resolve({teamId}); }
        });
      });
    }

    _register()
    .then(_login)
    .then(_sendInvites)
    .then(({teamId}) => FlowRouter.go(`/team/${teamId}`))
    .catch((err) => {
      console.log('REGISTRATION_ERROR');
      console.log(err);
    });
  },


  getMostRecentTeamId({Meteor}) {
    const user = Meteor.user();
    if (!user) { return null; }
    if (!user.lastTimeInTeam) {
      return null;
    }

    const pairs = R.toPairs(user.lastTimeInTeam);
    const sortByDate = R.sortBy(R.prop(1));
    const sorted = sortByDate(pairs); // asc
    const teamId = R.last(sorted)[0];

    return teamId;
  },

  getMostRecentConvoId({Meteor}) {
    const user = Meteor.user();
    if (!user) { return null; }
    if (!user.lastTimeInConvo) { return null; }

    const pairs = R.toPairs(user.lastTimeInConvo);

    const sortByTimestamp = R.sortBy(
      R.compose(
        R.prop('timestamp'),
        R.prop(1)
      )
    );
    const sorted = sortByTimestamp(pairs); // asc
    const convoId = R.last(sorted)[0];

    return convoId;
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
