export default {
  get({Meteor, LocalState}, msgId, langCode) {
    const TRANSLATION_GET = 'actions.translation.get';

    const msgIds = LocalState.get('translation.msgIds') ? LocalState.get('translation.msgIds') : [];
    LocalState.set('translation.msgIds', [ ...msgIds, msgId ]);

    Meteor.call('translation.get', {msgId, langCode}, (err, res) => {
      if (err) { alert(err); }
      else {
        console.log(res);
      }
    });
  },

  detectLang({Meteor}, text) {
    const TRANSLATION_DETECT_LANG = 'actions.translation.detectLang';
    Meteor.call('translation.detectLang', {text}, (err, res) => {
      if (err) { alert(err); }
      else {
        console.log(res);
      }
    });
  }
};
