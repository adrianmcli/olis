import { ContentState, ContentBlock, convertToRaw } from 'draft-js';
import { Random } from 'meteor/random';

export default {
  meetingMinutes() {
    const date = new Date();
    const indexes = [ 1, 2, 3 ];
    const keyLength = 5;

    const header = new ContentBlock({
      text: 'Meeting Minutes',
      type: 'header-one',
      key: Random.id(keyLength)
    });
    const dateHeader = new ContentBlock({
      text: `Date: ${date.toLocaleString()}`,
      type: 'header-three',
    });
    const participantsHeader = new ContentBlock({
      text: 'Participants',
      type: 'header-two',
      key: Random.id(keyLength)
    });
    const participants = indexes.map(index => {
      return new ContentBlock({
        text: `Participant ${index}`,
        type: 'unordered-list-item',
        key: Random.id(keyLength)
      });
    });
    const notesHeader = new ContentBlock({
      text: 'Notes',
      type: 'header-two',
      key: Random.id(keyLength)
    });
    const notes = indexes.map(index => {
      return new ContentBlock({
        text: `Note ${index}`,
        type: 'unordered-list-item',
        key: Random.id(keyLength)
      });
    });
    const actionsHeader = new ContentBlock({
      text: 'Actions',
      type: 'header-two',
      key: Random.id(keyLength)
    });
    const actions = indexes.map(index => {
      return new ContentBlock({
        text: `Action ${index}`,
        type: 'unordered-list-item',
        key: Random.id(keyLength)
      });
    });

    const blockArray = [
      header, dateHeader,
      participantsHeader, ...participants,
      notesHeader, ...notes,
      actionsHeader, ...actions
    ];

    const contentState = ContentState.createFromBlockArray(blockArray);
    const raw = convertToRaw(contentState);
    return raw;
  }
};
