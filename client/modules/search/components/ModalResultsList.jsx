import React from 'react';

import List from 'material-ui/lib/lists/list';
import AvatarWithDefault from '/client/modules/core/components/AvatarWithDefault.jsx';

import ResultItem from './ResultItem.jsx';

export default class ModalResultsList extends React.Component {
  render() {
    const {msgs, users, convos, notes} = this.props;
    const isResultsEmpty = false;
    return (
      <List>
        {isResultsEmpty ? <div>No results found.</div> : null}

        {users.map(user =>
          <ResultItem
            key={user._id}
            type='user'
            name={user.username}
            avatar={<AvatarWithDefault avatarSrc={user.profileImageUrl} username={user.username} />}
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
            author={msg.username}
            msg={msg.text}
          />
        )}
      </List>
    );
  }
}
ModalResultsList.defaultProps = {
  msgs: [],
  convos: [],
  users: [],
  notes: []
};
