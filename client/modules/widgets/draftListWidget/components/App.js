import React from 'react';
import _ from 'lodash';

import Paper from 'material-ui/lib/paper';
import {Editor, EditorState} from 'draft-js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const {data} = props;
    this.state = {
      editorState: canSetStateFromProps(data) ?
        data.editorState : EditorState.createEmpty(),
    };
    this.onChange = (editorState) => this.setState({editorState});
  }

  getActions() {
    return {
      // updateContent: updateTitle.bind(this),
      // addListItem: addListItem.bind(this),
      // removeListItem: removeListItem.bind(this),
      // updateListItem: updateListItem.bind(this),
      // removeLastListItem: removeLastListItem.bind(this),
    };
  }

  componentWillReceiveProps(nextProps) {
    const {data} = nextProps;
    if (canSetStateFromProps(data)) {
      this.setState({editorState: data.editorState});
    }
  }

  updateState(editorState) {
    const {widgetId, update} = this.props;

    this.setState({editorState});
    update(widgetId, {editorState});
  }

  render() {
    const style = {
      position: 'relative',
      boxSizing: 'border-box',
      width: '100%',
      padding: '15px',
    };
    const {editorState} = this.state;
    const actions = this.getActions();
    return (
      <Paper className='listapp' style={style}>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
        />
      </Paper>
    );
  }
}

function canSetStateFromProps(data) {
  const hasData = data;
  const hasEditorState = hasData && _.has(data, 'editorState');
  return hasEditorState;
}

App.defaultProps = {
  data: {
    editorState: EditorState.createEmpty(),
  },
  update: () => console.log('update function'),
};
