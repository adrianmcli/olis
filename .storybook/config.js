import { configure } from '@kadira/storybook';

function loadStories() {
  // require('../client/modules/widgetTodo/components/stories/App');
  // require('../client/modules/widgetVote/components/stories/App');
  require('../client/modules/widgets/listWidget/components/stories/App');
  // require('../client/modules/widgetDraftList/components/stories/App');
}

configure(loadStories, module);
