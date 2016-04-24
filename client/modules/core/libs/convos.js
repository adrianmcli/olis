export default {
  setLastTimeInConvo({Meteor, Collections}, convoId) {
    if (Collections.Convos.findOne(convoId)) {
      Meteor.call('account.setLastTimeInConvo', {convoId}, (err) => {
        // if (err) { alert(err); }
      });
    }
  },

  checkForExistingPrivate({Meteor, Collections}, userIds) {
    if (userIds.length === 1) {
      const { Convos } = Collections;
      const userId = Meteor.userId();

      const convo = Convos.findOne({
        userIds: {
          $size: 2,
          $all: [ userId, ...userIds ]
        }
      });
      return convo ? convo._id : null;
    }
  }
};
