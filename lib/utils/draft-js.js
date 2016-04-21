import { Editor, EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';

export default {
  getPlainTextFromRaw(raw) {
    const blockArray = convertFromRaw(raw);
    const contentState = ContentState.createFromBlockArray(blockArray);
    return contentState.getPlainText('.');
  },

  getRawFromEditorState(editorState) {
    const contentState = editorState.getCurrentContent();
    return convertToRaw(contentState);
  }
};
