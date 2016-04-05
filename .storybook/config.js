import { configure } from '@kadira/storybook';

function loadStories() {
  require('../.stories/button');
  require('../.stories/login');
  // require as many as stories you need.
}

configure(loadStories, module);
