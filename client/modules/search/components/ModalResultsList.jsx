import React from 'react';
import R from 'ramda';

import List from 'material-ui/lib/lists/list';
import AvatarWithDefault from '/client/modules/core/components/AvatarWithDefault.jsx';

import ResultItem from './ResultItem.jsx';

export default class ModalResultsList extends React.Component {
  render() {
    const {
      msgs, users, convos, notes,
      onClickConvo,
      closeModal
    } = this.props;
    const isResultsEmpty = () => R.isEmpty(msgs) && R.isEmpty(users) &&
      R.isEmpty(convos) && R.isEmpty(notes);

    return (
      <List>
        {isResultsEmpty() ? <div>No results found.</div> : null}

        {users.map(user =>
          <ResultItem
            key={user._id}
            type='user'
            name={user.username}
            email={user.emails[0].address}
            avatar={<AvatarWithDefault avatarSrc={user.profileImageUrl} username={user.username} />}
            closeModal={closeModal}
          />
        )}
        {convos.map(convo =>
          <ResultItem
            key={convo._id}
            type='convo'
            title={convo.name}
            onClick={onClickConvo.bind(null, convo._id)}
            closeModal={closeModal}
          />
        )}
        {notes.map(note =>
          <ResultItem key={note._id} type='notes' title='Hiring 2016' closeModal={closeModal}/>
        )}
        {msgs.map(msg =>
          <ResultItem
            key={msg._id}
            type='msg'
            title={msg.convoName}
            author={msg.username}
            msg={msg.text}
            closeModal={closeModal}
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
