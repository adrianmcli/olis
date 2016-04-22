import {
  Editor, EditorState, ContentState, ContentBlock,
  convertToRaw, convertFromRaw, convertFromHTML,
} from 'draft-js';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import { Random } from 'meteor/random';
import R from 'ramda';

export default {
  getPlainTextFromRaw(raw) {
    if (this.isObjRaw(raw)) {
      const blockArray = convertFromRaw(raw);
      const contentState = ContentState.createFromBlockArray(blockArray);
      const text = contentState.getPlainText('\r\n');
      // console.log(text);
      return text;
    }
    return '';

  },

  getRawFromEditorState(editorState) {
    const contentState = editorState.getCurrentContent();
    return convertToRaw(contentState);
  },

  getRawFromHTML(html) {
    // const blockArray = convertFromHTML(html);
    // const blockArray = DraftPasteProcessor.processHTML(html);

    const keyLength = 5;
    const block = new ContentBlock({
      text: html,
      type: 'div',
      key: Random.id(keyLength),
    });
    const blockArray = [ block ];

    const contentState = ContentState.createFromBlockArray(blockArray);
    const raw = convertToRaw(contentState);
    // console.log(raw);
    return raw;
  },

  isObjRaw(obj) {
    const keys = R.keys(obj);
    const expected = [ 'entityMap', 'blocks' ];
    const common = R.intersection(keys, expected);
    return common.length === expected.length;
  },
};
