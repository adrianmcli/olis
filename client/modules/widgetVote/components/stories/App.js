import React from 'react';
import App from '../App';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('Voting App', module)
  .add('empty', () => {
    return (<App />);
  })
  .add('sample data - voted', () => {
    const data = {
      prompt: 'Where to go for lunch today?',
      options: [
        {
          id: 'id_1',
          label: `McDonald's`,
          voters: [
            'sallyB',
            'nickyC',
            'userOne',
          ],
        },
        {
          id: 'id_2',
          label: 'Cha Chaan Tang',
          voters: []
        },
        {
          id: 'id_3',
          label: `Morton's`,
          voters: [
            'timmyH',
          ],
        },
        {
          id: 'id_4',
          label: `Dan Ryan's`,
          voters: [
            'billyO',
            'sammyZ',
          ],
        }
      ],
    };
    return (<App data={data}/>);
  })
  .add('sample data - voted 2', () => {
    const data = {
      prompt: 'Where to go for lunch today?',
      options: [
        {
          id: 'id_1',
          label: `McDonald's`,
          voters: [
            'sallyB',
            'nickyC',
          ],
        },
        {
          id: 'id_2',
          label: 'Cha Chaan Tang',
          voters: [
            'userOne',
          ]
        },
        {
          id: 'id_3',
          label: `Morton's`,
          voters: [
            'timmyH',
          ],
        },
        {
          id: 'id_4',
          label: `Dan Ryan's`,
          voters: [
            'billyO',
            'sammyZ',
          ],
        }
      ],
    };
    return (<App data={data}/>);
  })
  .add('sample data - did not vote', () => {
    const data = {
      prompt: 'Where to go for lunch today?',
      options: [
        {
          id: 'id_1',
          label: `McDonald's`,
          voters: [
            'sallyB',
            'nickyC',
            'rickyD',
          ],
        },
        {
          id: 'id_2',
          label: 'Cha Chaan Tang',
          voters: [
            'sallyM',
          ],
        },
        {
          id: 'id_3',
          label: `Morton's`,
          voters: [
            'timmyH',
            'ZoeyZ',
          ],
        },
        {
          id: 'id_4',
          label: `Dan Ryan's`,
          voters: [
            'billyO',
            'sammyZ',
          ],
        }
      ],
    };
    return (<App data={data}/>);
  })
  .add('sample data - did not vote 2', () => {
    const data = {
      prompt: 'Where to go for lunch today?',
      options: [
        {
          id: 'id_1',
          label: `McDonald's`,
          voters: [
            'sallyB',
            'nickyC',
            'rickyD',
          ],
        },
        {
          id: 'id_2',
          label: 'Cha Chaan Tang',
          voters: [
            'sallyM',
          ],
        },
        {
          id: 'id_3',
          label: `Morton's`,
          voters: [
            'timmyH',
          ],
        },
        {
          id: 'id_4',
          label: `Dan Ryan's`,
          voters: [
            'billyO',
          ],
        }
      ],
    };
    return (<App data={data}/>);
  });
