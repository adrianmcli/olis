import {check} from 'meteor/check';

export default function ({Meteor, Collections, Schemas}) {
  const INVITES_REMOVE = 'invites.remove';
  Meteor.methods({
    'invites.remove'({teamId}) {
      check(arguments[0], {
        teamId: String,
      });

      const userId = Meteor.userId();
      if (!userId) {
        throw new Meteor.Error(INVITES_REMOVE, 'Must be logged in to select invite.');
      }
      const invite = Collections.Invites.findOne({teamId});
      if (!invite) {
        throw new Meteor.Error(INVITES_REMOVE, 'Must select a existing invite.');
      }

      invite.remove();
    }
  });
}
