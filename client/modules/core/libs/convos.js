export default {
  setLastTimeInConvo({Meteor, Collections}, convoId) {
    if (Collections.Convos.findOne(convoId)) {
      Meteor.call('account.setLastTimeInConvo', {convoId}, (err) => {
        // if (err) { alert(err); }
      });
    }
  }
};
