import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import R from 'ramda';

export default function () {
  const IS_EMAIL_WHITELIST = 'register.isEmailOnWhitelist';
  Meteor.methods({
    'register.isEmailOnWhitelist'({emails}) {
      check(arguments[0], {
        emails: [ String ],
      });

      const betaWhitelistDomains = Meteor.settings.betaWhitelistDomains;

      emails.forEach(email => {
        const split = email.split('@');
        const domain = split[1];
        const isAllowed = R.contains(domain, betaWhitelistDomains);

        if (!isAllowed) {
          throw new Meteor.Error(IS_EMAIL_WHITELIST,
            `${email} is not an allowed beta user. Please contact ${Meteor.settings.public.contactEmail} to get on the beta.`);
        }
      });
    },
  });
}
