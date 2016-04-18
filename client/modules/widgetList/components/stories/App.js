import React from 'react';
import App from '../App';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('List Widget', module)
  .add('empty', () => {
    return <App todos={[]} />;
  })
  .add('sample data', () => {
    const title = 'Stuff To Do';
    const items = [
      {
        id: 'id_one',
        text: 'Buy sandwiches',
      },
      {
        id: 'id_two',
        text: 'Design website',
      },
      {
        id: 'id_three',
        text: 'Sell widgets',
      },
    ];
    return <App data={{items, title}} />;
  });
