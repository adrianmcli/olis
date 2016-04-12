import { configure } from '@kadira/storybook';

function loadStories() {
  require('../client/modules/widgets/todoWidget/components/stories/App');
  require('../client/modules/widgets/voteWidget/components/stories/App');
  require('../client/modules/widgets/listWidget/components/stories/App');
  require('../client/modules/widgets/draftListWidget/components/stories/App');
}

configure(loadStories, module);
