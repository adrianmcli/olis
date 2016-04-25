import {check} from 'meteor/check';

export default function ({Meteor, Collections}) {
  const ACCOUNT_LAST_TIME_CONVO = 'account.setLastTimeInConvo';
  Meteor.methods({
    'account.setLastTimeInConvo'({convoId}) {
      check(arguments[0], {
        convoId: String,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(ACCOUNT_LAST_TIME_CONVO, 'Must be logged in to set last time in convo.');
      }
      const convo = Collections.Convos.findOne(convoId);
      if (!convo) {
        throw new Meteor.Error(ACCOUNT_LAST_TIME_CONVO, 'Must set last time in an existing convo.');
      }
      if (!convo.isUserInConvo(userId)) {
        throw new Meteor.Error(ACCOUNT_LAST_TIME_CONVO, 'Must be member of convo to set last time in it.');
      }

      let setObj = {};
      setObj[`lastTimeInConvo.${convoId}`] = {
        timestamp: new Date(),
        numMsgs: 9999999,
      };
      const modifier = { $set: setObj };
      Meteor.users.update(userId, modifier);
    },
  });
}
