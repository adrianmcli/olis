export default {
  add({Meteor}, noteId, text, afterSectionId) {
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
  }
};
