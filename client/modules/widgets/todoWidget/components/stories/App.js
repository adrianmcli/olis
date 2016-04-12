import React from 'react';
import App from '../App';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('Todo App', module)
  .add('empty', () => {
    return <App todos={[]} />;
  })
  .add('sample data', () => {
    const todos = [
      {
        id: 'id_one',
        text: 'Buy sandwiches',
        completed: false,
      },
      {
        id: 'id_two',
        text: 'Design website',
        completed: true,
      },
      {
        id: 'id_three',
        text: 'Sell widgets',
        completed: false,
      },
    ];
    return <App data={{todos}} />;
  })
  .add('all selected', () => {
    const todos = [
      {
        id: 'id_one',
        text: 'Buy sandwiches',
        completed: true,
      },
      {
        id: 'id_two',
        text: 'Design website',
        completed: true,
      },
      {
        id: 'id_three',
        text: 'Sell widgets',
        completed: true,
      },
    ];
    return <App data={{todos}} />;
  })
  .add('none selected', () => {
    const todos = [
      {
        id: 'id_one',
        text: 'Buy sandwiches',
        completed: false,
      },
      {
        id: 'id_two',
        text: 'Design website',
        completed: false,
      },
      {
        id: 'id_three',
        text: 'Sell widgets',
        completed: false,
      },
    ];
    return <App data={{todos}} />;
  });
