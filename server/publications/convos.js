import {Convos} from '/lib/collections';
import {Meteor} from 'meteor/meteor';

export default function () {
  const CONVOS_LIST = 'convos.list';
  Meteor.publish(CONVOS_LIST, function () {
    if (!this.userId) {
      throw new Meteor.Error(CONVOS_LIST, 'Must be logged in to get convos list.');
    }
    return Convos.find({userIds: this.userId});
  });
}
