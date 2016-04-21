import { Editor, EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';

export default {
  getPlainTextFromRaw(raw) {
    const blockArray = convertFromRaw(raw);
    const contentState = ContentState.createFromBlockArray(blockArray);
    return contentState.getPlainText('\r\n');
  },

  getRawFromEditorState(editorState) {
    const contentState = editorState.getCurrentContent();
    return convertToRaw(contentState);
  }
};
