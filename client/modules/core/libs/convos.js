import SectionUtils from '/client/modules/core/libs/sections';

export default {
  setLastTimeInConvo({Meteor}, convoId) {
    Meteor.call('account.setLastTimeInConvo', {convoId}, (err) => {
      if (err) { alert(err); }
    });
  }
};
