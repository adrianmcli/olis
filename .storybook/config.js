import { configure } from '@kadira/storybook';

function loadStories() {
  require('../client/modules/widgets/todoWidget/components/stories/App');
  require('../client/modules/widgets/voteWidget/components/stories/App');
}

configure(loadStories, module);
