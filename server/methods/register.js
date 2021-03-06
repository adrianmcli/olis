import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import R from 'ramda';

export default function () {
  const IS_EMAIL_WHITELIST = 'register.isEmailOnWhitelist';
  Meteor.methods({
    'register.isEmailOnWhitelist'({email}) {
      check(arguments[0], {
        email: String,
      });

      const betaWhitelistDomains = Meteor.settings.betaWhitelistDomains;
      const split = email.split('@');
      const domain = R.toLower(split[1]);
      const domainIsAllowed = R.contains(domain, betaWhitelistDomains);

      const lowerEmail = R.toLower(email);
      const emailIsAllowed = R.contains(lowerEmail, Meteor.settings.whitelistEmails);
      const isAllowed = domainIsAllowed || emailIsAllowed;

      if (!isAllowed) {
        throw new Meteor.Error(IS_EMAIL_WHITELIST,
          `${email} is not an allowed beta user. Please contact ${Meteor.settings.public.contactEmail} to get on the beta.`);
      }
    },
  });
}
