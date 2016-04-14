import {Meteor} from 'meteor/meteor';
import {Locks} from '/lib/collections';
import R from 'ramda';
import {check} from 'meteor/check';
import Lock from '/lib/lock';

export default function () {
  Meteor.methods({
    'locks.requestAndRelease'({noteId, requestedWidgetId}) {
      check(arguments[0], {
        noteId: String,
        requestedWidgetId: String
      });

      const userId = this.userId;
      const user = Meteor.users.findOne(userId);

      const lock = Locks.findOne(requestedWidgetId);
      const getCanTakeOver = () => {
        if (lock) {
          const timeout = 5000;
          const timeDiff = new Date() - lock.updatedAt;
          return timeDiff >= timeout;
        }
        return true;
      };
      const canTakeOver = getCanTakeOver();

      if (!lock || canTakeOver) {
        Locks.upsert({noteId, widgetId: requestedWidgetId}, {
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
