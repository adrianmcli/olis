import React from 'react';

import EditorWidget from '/client/modules/widgets/editorWidget/components/EditorWidget';

export default class ListWidget extends React.Component {
  render() {
    return (
      <EditorWidget
        hideControls={true}
        {...this.props}
      />
    );
  }
}
