export default {
  add({Meteor}, noteId, type, data) {
    Meteor.call('widgets.add', {noteId, type, data}, err => {
      if (err) { alert(err); }
    });
  },

  remove({Meteor}, noteId, widgetId) {
    if (confirm('You are about to delete this widget!\nAre you sure?')) {
      Meteor.call('widgets.remove', {noteId, widgetId}, err => {
        if (err) { alert(err); }
      });
    }
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
  },

  lock({Meteor}, widgetId) {
    Meteor.call('locks.requestAndRelease',{widgetId}, err => {
      if (err) { alert(err); }
    });
  }
};
