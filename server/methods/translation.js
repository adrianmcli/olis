import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Microsoft} from 'meteor/devian:mstranslate';
import {Messages, Translations} from '/lib/collections';
import Translation from '/lib/schemas/translation';

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
      const existingTrans = Translations.findOne({msgId, langCode});
      if (!existingTrans) {
        const text = msg.text;
        const translated = Microsoft.translate(text, langCode);

        const translation = new Translation({
          msgId,
          convoId: msg.convoId,
          langCode,
          text: translated
        });
        translation.save();
        return translated;
      }
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
