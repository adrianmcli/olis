import React from 'react';

import List from 'material-ui/lib/lists/list';
import Avatar from 'material-ui/lib/avatar';

import ResultItem from './ResultItem.jsx';

export default class ModalResultList extends React.Component {

  render() {

    return (
      <List>
        <ResultItem
          type='user'
          avatar={<Avatar src="http://www.fillmurray.com/201/200" />}
          name='Bob Saget'
        />
        <ResultItem
          type='convo'
          title='Hiring 2016'
        />
        <ResultItem
          type='notes'
          title='Hiring 2016'
        />
        <ResultItem
          type='msg'
          title='Hiring 2016'
          msg='These interviews are so boring...'
        />
      </List>
    );
  }
}
