import { Meteor } from 'meteor/meteor';
import { Notifications } from '/lib/collections';

export default function () {
  Notifications.after.insert(function (userId, doc) {
    console.log('notifications.after.insert');
    console.log('doc');

    const sendToUserId = doc.userId;
    Meteor.call('notifications.send.GCMMsg', {sendToUserId}, err => {
      if (err) { console.log(err); }
    });
  });
}
