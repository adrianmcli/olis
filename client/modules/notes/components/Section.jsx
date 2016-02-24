import React from 'react';
import MediumEditor from 'react-medium-editor/lib/editor';
import R from 'ramda';

export default class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleChange(sectionId, text, medium) {
    const {editSection} = this.props;
    console.log('Content Has Changed');
    console.log(text);

    editSection(sectionId, text);
  }

  handleClick(sectionId) {
    console.log(`handleClick ${sectionId}`);
    const {selectSection} = this.props;
    selectSection(sectionId);
  }

  handleKeyDown(sectionId, e) {
    // console.log(e.target);
    if (e.keyCode === 13) { // enter
      console.log('enter pressed');
      const {addSection} = this.props;
      addSection('', sectionId);
      // Focus on new section
    }
  }

  handleBlur() {
    console.log('handleBlur');
    const {releaseSectionLock} = this.props;
    releaseSectionLock();

    // TODO Save edits
  }

  render() {
    const {section, userId, editSection, selectSection, releaseSectionLock} = this.props;
    const iconColor = 'rgba(0,0,0,0.8)';

    const editorOptions = {
      // disableEditing: false,
      disableReturn: true,
      disableExtraSpaces: false,
      toolbar: {
        buttons: [
          'bold', 'italic', 'underline',
          'anchor',
          'h1', 'h2', 'h3',
          'quote',
          'orderedlist', 'unorderedlist',
        ]
      }
    };

    const editorOptions2 = R.merge(editorOptions, {disableEditing: !section.canEdit(userId)});
    return (
      <MediumEditor
        key={section._id}
        ref={section._id}
        text={section.text}
        onChange={this.handleChange.bind(this, section._id)}
        onClick={this.handleClick.bind(this, section._id)}
        onKeyDown={this.handleKeyDown.bind(this, section._id)}
        onBlur={this.handleBlur.bind(this, section._id)}
        options={editorOptions2}
      />
    );
  }
}
