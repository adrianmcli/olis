import actions from './actions';

import DraggableWidget from './draggableWidget/components/DraggableWidget.jsx';
import EditorWidget from './editorWidget/components/EditorWidget.jsx';
import TodoWidget from './todoWidget/components/App';
import VoteWidget from './voteWidget/components/App';

export default {
  actions
};

export const Widgets = {
  draggable: DraggableWidget,
  editor: EditorWidget,
  'meeting-minutes': EditorWidget,
  todo: TodoWidget,
  vote: VoteWidget
};
