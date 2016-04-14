import { Meteor } from 'meteor/meteor';
import { Locks, Widgets, Notes } from '/lib/collections';
import R from 'ramda';
import { check } from 'meteor/check';
import { TIMEOUT } from '/lib/constants/widgets';

export default function () {
  const LOCKS_REQ_REL = 'locks.requestAndRelease';
  Meteor.methods({
    'locks.requestAndRelease'({widgetId}) {
      check(arguments[0], {
        widgetId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(LOCKS_REQ_REL, 'Must be logged in to request locks.');
      }
      const user = Meteor.users.findOne(userId);
      const widget = Widgets.findOne(widgetId);
      if (!widget) {
        throw new Meteor.Error(LOCKS_REQ_REL, 'Must request lock for existing widget.');
      }
      const note = Notes.findOne(widget.noteId);
      if (!note) {
        throw new Meteor.Error(LOCKS_REQ_REL, 'Must request lock for widget of existing note.');
      }

      const lock = Locks.findOne({widgetId});
      const canTakeOver = getCanTakeOver(lock, userId);

      Meteor.call('locks.releaseAllOthers', {widgetId});

      if (!lock || canTakeOver) {
        Locks.upsert({noteId: note._id, widgetId}, {
          $set: {
            userId,
            username: user.username,
            updatedAt: new Date()
          }
        });
      }
    }
  });

  const LOCKS_RELEASE = 'locks.release';
  Meteor.methods({
    'locks.release'({widgetId}) {
      check(arguments[0], {
        widgetId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(LOCKS_RELEASE, 'Must be logged in to release lock.');
      }

      Locks.remove({
        userId,
        widgetId
      });
    }
  });

  const LOCKS_REL_ALL_OTHERS = 'locks.releaseAllOthers';
  Meteor.methods({
    'locks.releaseAllOthers'({widgetId}) {
      check(arguments[0], {
        widgetId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(LOCKS_REL_ALL_OTHERS,
          'Must be logged in to release all your other locks.');
      }

      Locks.remove({
        userId,
        widgetId: { $ne: widgetId }
      });
    }
  });

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


function getCanTakeOver(_lock, userId) {
  if (_lock) {
    const isMyLock = _lock.userId === userId;
    if (isMyLock) { return true; }

    const timeDiff = new Date() - _lock.updatedAt;
    return timeDiff >= TIMEOUT;
  }
  return true;
}
