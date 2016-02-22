import React from 'react';
import randomWords from 'random-words';

class NotesBar extends React.Component {
  renderAddBtn(noteId, sections, index) {
    const {addSection} = this.props;
    return (
      <span>
        <button onClick={addSection.bind(null, noteId, 'test section', '')}>
          Add section above
        </button>
        <button onClick={addSection.bind(null, noteId, 'test section', sections[index]._id)}>
          Add section below
        </button>
      </span>
    );
  }

  render() {
    const {note, sections, editSection, addSection} = this.props;
    return (
      <div>
        <h2>Note {note._id} {note.title}</h2>
        <button onClick={addSection.bind(null, note._id, 'test section', '')}>
          Prepend section
        </button>

        {sections.map((section, index) => {
          return (
            <div>
              <div>
                {section.text}, {section._id}
                {this.renderAddBtn(note._id, sections, index)}
              </div>
              <div>
                {section.editingByUserId}, {section.unlocksAt.toDateString()}
                <button onClick={editSection.bind(null, section._id, randomWords({ exactly: 3, join: ' ' }))}>Randomize</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default NotesBar;
