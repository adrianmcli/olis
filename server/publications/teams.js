import {Teams} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
// import {check} from 'meteor/check';

/*  If you restrict the data you publish,
  the Astro Class will fill in the rest of the specified fields with null
  Also, if you don't restrict to only the client data,
  you will get
  Trying to set a value of the "serverOnly" field that does not exist in the "X" class
*/
export default function () {
  const TEAMS_LIST = 'teams.list';
  Meteor.publish(TEAMS_LIST, function () {
    if (!this.userId) {
      throw new Meteor.Error(TEAMS_LIST, 'Must be logged in to get teams list.');
    }
    return Teams.find({userIds: this.userId});
  });
}
