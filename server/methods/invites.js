import {Meteor} from 'meteor/meteor';
import {Invites} from '/lib/collections';
import {check} from 'meteor/check';

export default function () {
  const INVITES_REMOVE = 'invites.remove';
  Meteor.methods({
    'invites.remove'({teamId}) {
      check(arguments[0], {
        teamId: String,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(INVITES_REMOVE, 'Must be logged in to select invite.');
      }
      const invite = Invites.findOne({teamId});
      if (!invite) {
        throw new Meteor.Error(INVITES_REMOVE, 'Must select a existing invite.');
      }

      invite.remove();
    }
  });
}
