import React from 'react';
import randomWords from 'random-words';

const NotesBar = ({note, sections, addSection, editSection}) => (
  <div>
    <h2>Note {note._id} {note.title}</h2>
    <button onClick={addSection.bind(null, note._id, 'test section')}>Add section</button>
    {sections.map(section => {
      return (
        <div>
          <div>{section.text}, {section._id}</div>
          <div>
            {section.editingByUserId}, {section.unlocksAt.toDateString()}
            <button onClick={editSection.bind(null, section._id, randomWords({ exactly: 3, join: ' ' }))}>Randomize</button>
          </div>
        </div>
      );
    })}
  </div>
);

export default NotesBar;
