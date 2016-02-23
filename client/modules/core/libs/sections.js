export default {
  releaseLock({Meteor, LocalState}) {
    const sectionId = LocalState.get('sectionId');
    console.log(`releaseLock ${sectionId}`);
    if (sectionId) {
      Meteor.call('sections.releaseLock', {sectionId}, (err, res) => {
        if (err) { alert(err); }
        else { console.log(res); }
      });
    }
    LocalState.set('sectionId', null);
  },

  acquireLock({Meteor, LocalState}, sectionId) {
    console.log(`acquireLock ${sectionId}`);
    Meteor.call('sections.acquireLock', {sectionId}, (err) => {
      if (err) { alert(err); }
      else { LocalState.set('sectionId', sectionId); }
    });
  }
};
