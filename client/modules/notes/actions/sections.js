import SectionUtils from '/client/modules/core/libs/sections';

export default {
  add({Meteor}, noteId, text = '', afterSectionId) {
    Meteor.call('sections.add', {noteId, text, afterSectionId}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  },

  edit({Meteor}, sectionId, text) {
    Meteor.call('sections.edit', {sectionId, text}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  },

  select({Meteor, LocalState}, sectionId) {
    SectionUtils.releaseLock({Meteor, LocalState});
    SectionUtils.acquireLock({Meteor, LocalState}, sectionId);
  },

  releaseLock({Meteor, LocalState}) {
    SectionUtils.releaseLock({Meteor, LocalState});
  }
};
