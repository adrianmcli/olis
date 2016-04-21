import {
  Editor, EditorState, ContentState, ContentBlock,
  convertToRaw, convertFromRaw, convertFromHTML,
} from 'draft-js';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import { Random } from 'meteor/random';

export default {
  getPlainTextFromRaw(raw) {
    const blockArray = convertFromRaw(raw);
    const contentState = ContentState.createFromBlockArray(blockArray);
    const text = contentState.getPlainText('\r\n');
    // console.log(text);
    return text;
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
};
