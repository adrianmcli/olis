import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Microsoft} from 'meteor/devian:mstranslate';

export default function () {
  const TRANSLATION_GET = 'translation.get';
  Meteor.methods({
    'translation.get'({text, langCode}) {
      check(arguments[0], {
        text: String,
        langCode: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TRANSLATION_GET, 'Must be logged in to get a translation.');
      }
      return Microsoft.translate(text, langCode);
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
