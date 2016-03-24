import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Microsoft} from 'meteor/devian:mstranslate';
import {Messages} from '/lib/collections';

export default function () {
  const TRANSLATION_GET = 'translation.get';
  Meteor.methods({
    'translation.get'({msgId, langCode}) {
      check(arguments[0], {
        msgId: String,
        langCode: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TRANSLATION_GET, 'Must be logged in to get a translation.');
      }
      const msg = Messages.findOne(msgId);
      if (!msg) {
        throw new Meteor.Error(TRANSLATION_GET, 'Must translate an existing message.');
      }
      const text = msg.text;
      const translated = Microsoft.translate(text, langCode);

      msg.set(`translation.${langCode}`, translated);
      msg.save();
    }
  });

  const TRANSLATION_DETECT_LANG = 'translation.detectLang';
  Meteor.methods({
    'translation.detectLang'({text}) {
      check(arguments[0], {
        text: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TRANSLATION_DETECT_LANG, 'Must be logged in to detect language.');
      }

      // Some language code like 'en', I assume the translate method will recognize it
      return Microsoft.detect(text);
    }
  });
}
