import { Meteor } from 'meteor/meteor';
import { Notifications } from '/lib/collections';

export default function () {
  Notifications.after.insert(function (userId, doc) {
    Meteor.call('notifications.send.GCMMsg', err => {
      if (err) { console.log(err); }
    });
  });
}
