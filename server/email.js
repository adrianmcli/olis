import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Teams } from '/lib/collections';
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
  Accounts.emailTemplates.from = `Olis <${Meteor.settings.public.contactEmail}>`;

  // Enroll account email
  Accounts.emailTemplates.enrollAccount.subject = function (user) {
    // console.log('enrollAccount subject');
    const text = user.invitedBy ?
      `${user.invitedBy} has invited you to join Olis` : // Invited to Olis by someone else
      `Welcome to Olis!`; // Finding my team
    return text;
  };

  Accounts.emailTemplates.enrollAccount.text = function (user, url) {
    // console.log('enrollAccount text');
    const team = Teams.findOne(R.keys(user.roles)[0]);

    const append =
      `In order to setup your account, click the link below:\r\n
      ${url}`;

    // Got invited to a team
    if (user.invitedBy) {
      Meteor.users.update(user._id, {
        $unset: {invitedBy: ''},
      });
      const text = `${user.invitedBy} has invited you to join ${team.name}, their team on Olis.\r\n${append}`;
      return text;
    }

    // Finding my team
    if (user.findingMyTeam) {
      Meteor.users.update(user._id, {
        $unset: {findingMyTeam: ''},
      });

      const teams = Teams.find({userIds: user._id}).fetch();
      const teamsList = teams.reduce((prev, curr) => {
        if (prev === '') { return `- ${curr.name}\r\n`; }
        return `${prev}\r\n- ${curr.name}\r\n`;
      }, '');

      const text = `Here are a list of the teams you belong to:\r\n
        ${teamsList}\r\n
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
      return `Welcome to Olis ${user.displayName}! Set Your Olis Account Password.`;
    }
    return `Reset Your Olis Account Password`;
  };
  Accounts.emailTemplates.resetPassword.text = function (user, url) {
    // console.log('resetPassword text');
    // console.log(user);

    // Register without a password
    if (user.isRegistering || !_.has(user, 'services.password.bcrypt')) {
      Meteor.users.update(user._id, {
        $unset: {isRegistering: ''}
      });

      const text = `To setup your password so that you can log into your account, click the link below:\r\n
        ${url}`;
      return text;
    }

    // Forgot password
    const text = `If you did not recently request to reset your password, you can ignore this email.\r\n
      To reset your password, click the link below:\r\n
      ${url}`;
    return text;
  };
}
