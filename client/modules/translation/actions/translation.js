export default {
  get({Meteor}, msgId, langCode) {
    const TRANSLATION_GET = 'actions.translation.get';
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
