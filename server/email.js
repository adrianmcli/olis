import {Meteor} from 'meteor/meteor';
import {Teams} from '/lib/collections';
import R from 'ramda';
import _ from 'lodash';

export default function () {
  Meteor.startup(function () {
    const isLocalhost = Meteor.absoluteUrl().indexOf('localhost') > -1;
    console.log(`isLocalhost ${Meteor.absoluteUrl()} ${isLocalhost}`);
    if (!isLocalhost) {
      const username = encodeURIComponent(Meteor.settings.mailgun.address);
      const password = encodeURIComponent(Meteor.settings.mailgun.password);
      const host = encodeURIComponent(`smtp.mailgun.org`);
      const port = 587;

      process.env.MAIL_URL = `smtp://${username}:${password}@${host}:${port}`;
    }
  });

  Accounts.urls.enrollAccount = (token) => {
    return Meteor.absoluteUrl(`invite/${token}`);
  };
  Accounts.urls.resetPassword = (token) => {
    return Meteor.absoluteUrl(`reset/${token}`);
  };

  Accounts.emailTemplates.siteName = 'Olis';
  Accounts.emailTemplates.from = 'Olis <contact.aheadstudios@gmail.com>';

  // Enroll account email
  Accounts.emailTemplates.enrollAccount.subject = function (user) {
    console.log('enrollAccount subject');
    console.log(user);

    // const prepend = `Welcome to Olis, ${user.username}!`;
    // const text =
    //   user.invitedBy ? `${prepend} An account has been created for you by ${user.invitedBy}.` :
    //   `${prepend}`;
    const text = user.invitedBy ? `${user.invitedBy} has invited you to join Olis` : `Welcome to Olis!`;
    return text;
  };

  Accounts.emailTemplates.enrollAccount.text = function (user, url) {
    console.log('enrollAccount text');
    console.log(user);
    const team = Teams.findOne(R.keys(user.roles)[0]);

    const append =
      `In order to setup your account, click the link below:\n\n
      ${url}`;

    if (user.invitedBy) {
      Meteor.users.update(user._id, {
        $unset: {invitedBy: ''}
      });
      const text = `${user.invitedBy} has invited you to join ${team.name}, their team on Olis. \n\n${append}`;
      return text;
    }

    if (user.findingMyTeam) {
      Meteor.users.update(user._id, {
        $unset: {findingMyTeam: ''}
      });

      const teams = Teams.find({userIds: user._id}).fetch();
      const teamsList = teams.reduce((prev, curr) => {
        if (prev === '') { return `${curr.name}\n`; }
        return `${prev}\n${curr.name}\n`;
      }, '');

      const text = `Here are a list of the teams you belong to:\n\n
        ${teamsList}\n
        ${append}`;
      return text;
    }
    return append;
  };

  // Reset password email
  Accounts.emailTemplates.resetPassword.subject = function (user) {
    // console.log('resetPassword subject');
    // console.log(user);
    if (user.isRegistering || !_.has(user, 'services.password.bcrypt')) {
      return `Welcome to Olis ${user.username}! Set Your Olis Account Password.`;
    }
    return `Reset Your Olis Account Password`;
  };
  Accounts.emailTemplates.resetPassword.text = function (user, url) {
    // console.log('resetPassword text');
    // console.log(user);

    if (user.isRegistering || !_.has(user, 'services.password.bcrypt')) {
      Meteor.users.update(user._id, {
        $unset: {isRegistering: ''}
      });

      const text = `To setup your password so that you can log into your account, click the link below:\n\n
        ${url}`;
      return text;
    }
    const text = `If you did not recently request to reset your password, you can ignore this email.\n
      To reset your password, click the link below:\n\n
      ${url}`;
    return text;
  };
}
