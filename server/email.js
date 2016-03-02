import {Meteor} from 'meteor/meteor';
import {Teams} from '/lib/collections';
import R from 'ramda';
import _ from 'lodash';

export default function () {
  Meteor.startup(function () {
    const username = encodeURIComponent(Meteor.settings.mailgun.address);
    const password = encodeURIComponent(Meteor.settings.mailgun.password);
    const host = encodeURIComponent(`smtp.mailgun.org`);
    const port = 587;

    if (R.contains('localhost', Meteor.absoluteUrl())) {
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

    const prepend = `Welcome to Olis, ${user.username}!`;
    const text =
      user.invitedBy ? `${prepend} An account has been created for you by ${user.invitedBy}.` :
      `${prepend}`;
    return text;
  };

  Accounts.emailTemplates.enrollAccount.text = function (user, url) {
    console.log('enrollAccount text');
    console.log(user);
    const team = Teams.findOne(R.keys(user.roles)[0]);

    const append =
      `To setup your password and activate your account, click the link below:\n\n
      ${url}`;

    if (user.invitedBy) {
      const text = `You have been invited by ${user.invitedBy} to participate in their team, ${team.name}! ${append}`;
      return text;
    }
    return append;
  };

  // Reset password email
  Accounts.emailTemplates.resetPassword.subject = function (user) {
    console.log('resetPassword subject');
    console.log(user);
    return `Olis Account Password Reset`;
  };
  Accounts.emailTemplates.resetPassword.text = function (user, url) {
    console.log('resetPassword text');
    console.log(user);

    if (user.isRegistering || !_.has(user, 'services.password.bcrypt')) {
      Meteor.users.update(user._id, {$set: {isRegistering: false}});

      const text = `To setup your password so that you can log into your account, click the link below:\n\n
        ${url}`;
      return text;
    }
    const text = `You requested a password change. To reset your password, click the link below:\n\n
      ${url}`;
    return text;
  };
}
