export default {
  add({Meteor}, noteId, type, data) {
    Meteor.call('widgets.add', {noteId, type, data}, err => {
      if (err) { alert(err); }
    });
  },

  remove({Meteor}, noteId, widgetId) {
    Meteor.call('widgets.remove', {noteId, widgetId}, err => {
      if (err) { alert(err); }
    });
  },

  move({Meteor}, noteId, widgetId, position) {
    Meteor.call('widgets.move', {noteId, widgetId, position}, err => {
      if (err) { alert(err); }
    });
  },

  update({Meteor}, widgetId, data) {
    Meteor.call('widgets.update', {widgetId, data}, err => {
      if (err) { alert(err); }
    });
  }
};
