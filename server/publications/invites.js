import {Invites} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  const INVITES_LIST = 'invites.list';
  Meteor.publish(INVITES_LIST, function () {
    const userId = this.userId;
    if (!userId) {
      throw new Meteor.Error(INVITES_LIST, 'Must be logged in to get invites list.');
    }

    return Invites.find({userId});
  });
}
