import React from 'react';

import List from 'material-ui/lib/lists/list';
import Avatar from 'material-ui/lib/avatar';

import ResultItem from './ResultItem.jsx';

export default class ModalResultsList extends React.Component {
  render() {
    const {results} = this.props;
    const {msgs, convos, users, notes} = results;
    const isResultsEmpty = false;
    return (
      <List>
        {isResultsEmpty ? <div>No results found.</div> : null}

        {users.map(user =>
          <ResultItem
            key={user._id}
            type='user'
            name={user.username}
            avatar={<Avatar src="http://www.fillmurray.com/201/200"/>}
          />
        )}
        {convos.map(convo =>
          <ResultItem key={convo._id} type='convo' title={convo.name} />
        )}
        {notes.map(note =>
          <ResultItem key={note._id} type='notes' title='Hiring 2016' />
        )}
        {msgs.map(msg =>
          <ResultItem
            key={msg._id}
            type='msg'
            title='Hiring 2016'
            author='Nicky Cage'
            msg={msg.text}
          />
        )}
      </List>
    );
  }
}
ModalResultsList.defaultProps = {
  results: {
    msgs: [],
    convos: [],
    users: [],
    notes: []
  }
};
