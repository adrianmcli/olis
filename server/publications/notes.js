import {Notes, Sections} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
// import {check} from 'meteor/check';

/*  If you restrict the data you publish,
  the Astro Class will fill in the rest of the specified fields with null
  Also, if you don't restrict to only the client data,
  you will get
  Trying to set a value of the "serverOnly" field that does not exist in the "X" class
*/
export default function () {
  const NOTES_SINGLE = 'notes.single';
  Meteor.publish(NOTES_SINGLE, function ({convoId}) {
    if (!this.userId) {
      throw new Meteor.Error(NOTES_SINGLE, 'Must be logged in to get note.');
    }
    return Notes.findOne({convoId});
  });
}
