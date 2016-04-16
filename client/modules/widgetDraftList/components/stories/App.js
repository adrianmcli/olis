import React from 'react';
import App from '../App';
import { storiesOf, action } from '@kadira/storybook';
import {EditorState} from 'draft-js';

storiesOf('Draft List Widget', module)
  .add('empty', () => {
    return <App editorState={EditorState.createEmpty()} />;
  });
