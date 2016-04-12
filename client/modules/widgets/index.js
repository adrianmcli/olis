import actions from './actions';

import DraggableWidget from './draggableWidget/components/DraggableWidget.jsx';
import EditorWidget from './editorWidget/components/EditorWidget.jsx';
import TodoWidget from './todoWidget/components/App';

export default {
  actions
};

export const Widgets = {
  draggable: DraggableWidget,
  editor: EditorWidget,
  todo: TodoWidget
};
