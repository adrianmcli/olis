import actions from './actions';
import methodStubs from './configs/method_stubs';

import DraggableWidget from './draggableWidget/components/DraggableWidget.jsx';
import EditorWidget from './editorWidget/components/EditorWidget.jsx';
import TodoWidget from './todoWidget/components/App';
import VoteWidget from './voteWidget/components/App';
import ListWidget from './draftListWidget/components/App';

export default {
  actions,
  load(context) {
    methodStubs(context);
  }
};

export const Widgets = {
  draggable: DraggableWidget,
  editor: EditorWidget,
  list: ListWidget,
  todo: TodoWidget,
  vote: VoteWidget
};
