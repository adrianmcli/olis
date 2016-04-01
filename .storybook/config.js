import { configure } from '@kadira/storybook';

function loadStories() {
  require('../client/modules/chat/components/stories/button');
  // require as many as stories you need.
}

configure(loadStories, module);
