import { Meteor } from 'meteor/meteor';
import { Locks, Widgets, Notes } from '/lib/collections';
import R from 'ramda';
import { check } from 'meteor/check';
import { TIMEOUT } from '/lib/constants/widgets';

export default function () {
  Meteor.methods({
    'locks.requestAndRelease'({widgetId}) {
      check(arguments[0], {
        widgetId: String
      });

      const userId = this.userId;
      const user = Meteor.users.findOne(userId);

      const widget = Widgets.findOne(widgetId);
      const lock = Locks.findOne({widgetId});
      const note = Notes.findOne(widget.noteId);

      const canTakeOver = getCanTakeOver(lock);
      const isMyLock = lock.userId === userId;

      if (!lock || canTakeOver || isMyLock) {
        Locks.upsert({noteId: note._id, widgetId}, {
          $set: {
            userId,
            username: user.username,
            updatedAt: new Date()
          }
        });
      }
      // Meteor.call('releaseLocks', {rawId, user, blockKeys: releaseBlockKeys});
    }
  });

  // Meteor.methods({
  //   releaseLocks({rawId, blockKeys, user}) {
  //     const userId = user._id;
  //     Locks.remove({
  //       userId,
  //       rawId,
  //       blockKey: { $in: blockKeys }
  //     });
  //   }
  // });

  // Meteor.methods({
  //   releaseAllLocks({user}) {
  //     if (user) {
  //       const userId = user._id;
  //       Locks.remove({ userId });
  //     }
  //     else { Locks.remove({}); }

  //   }
  // });

  // Meteor.methods({
  //   releaseOtherLocks({rawId, blockKeys, user}) {
  //     const userId = user._id;
  //     Locks.remove({
  //       userId,
  //       rawId,
  //       blockKey: { $nin: blockKeys }
  //     });
  //   }
  // });

  // Meteor.methods({
  //   editBlock({rawId, user, rawDraftContentState, block}) {
  //     // console.log(block);

  //     // RawDraftContentStates.update(rawId, rawDraftContentState);
  //     const lock = Locks.findOne({blockKey: block.key, userId: user._id});
  //     if (lock) {
  //       Locks.update(lock._id, {
  //         $set: { updatedAt: new Date() }
  //       });
  //     }
  //   }
  // });
}


function getCanTakeOver(_lock) {
  if (_lock) {
    const timeDiff = new Date() - _lock.updatedAt;
    return timeDiff >= TIMEOUT;
  }
  return true;
}
