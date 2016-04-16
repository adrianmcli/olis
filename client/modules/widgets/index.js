import actions from './actions';
import methodStubs from './configs/method_stubs';

import DraggableWidget from '../widgetDraggable/components/DraggableWidget.jsx';
import EditorWidget from '../widgetEditor/components/App';
import ListWidget from '../widgetDraftList/components/App';
import TodoWidget from '../widgetTodo/components/App';
import VoteWidget from '../widgetVote/components/App';

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
