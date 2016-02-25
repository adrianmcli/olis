import {Meteor} from 'meteor/meteor';
import {Teams} from '/lib/collections';
import R from 'ramda';

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
      `To setup your password and activate your account, simply click the link below:\n\n
      ${url}`;
    const text =
      user.invitedBy ? `You have been invited by ${user.invitedBy} to participate in their team, ${team.name}! ${append}` :
      `${append}`;

    return text;
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
    const text =
      `You requested a password change. To reset your password, simply click the link below:\n\n 
      ${url}`;
    return text;
  };
}
