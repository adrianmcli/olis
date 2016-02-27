import R from 'ramda';
import TeamUtils from '/client/modules/core/libs/teams';

export default {
  register({Meteor, LocalState, FlowRouter}) {
    const email = LocalState.get('register.email');
    const username = LocalState.get('register.username');
    const teamName = LocalState.get('register.teamName');
    const inviteEmails = LocalState.get('register.inviteEmails');

    LocalState.set('register.email', null);
    LocalState.set('register.username', null);
    LocalState.set('register.teamName', null);
    LocalState.set('register.inviteEmails', null);

    function _register() {
      return new Promise((resolve, reject) => {
        Meteor.call('account.register', {email, username, teamName, inviteEmails}, (err, res) => {
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

    _register()
    .then(_login)
    .then(({teamId}) => TeamUtils.select({Meteor, LocalState}, teamId))
    .then(() => FlowRouter.go('/home'))
    .catch((err) => {
      console.log('REGISTRATION_ERROR');
      console.log(err);
    });
  },


  getMostRecentTeamId({Meteor}) {
    const user = Meteor.user();
    if (!user) { return null; }
    if (!user.lastTimeInTeam) { return null; }

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
  }
};
