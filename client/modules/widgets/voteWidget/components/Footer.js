import React from 'react';

import {didUserVote, userVotedOption, getTotalVotes} from '../utils/voting';

export default class Footer extends React.Component {

  renderVotingStatus(user, options) {
    if (didUserVote(user, options)) {
      const option = userVotedOption(user, options);
      return <div>You have voted for: <strong>{option.label}</strong></div>;
    }
    return <div>You have not voted yet.</div>;
  }

  render() {
    const {user, options} = this.props;
    const styles = getStyles();
    const totalVotes = getTotalVotes(options);
    const desc = totalVotes === 1 ? ' vote' : ' votes';
    return (
      <div style={styles.footer}>
        {this.renderVotingStatus(user, options)}
        <div><strong>{totalVotes}</strong>{desc}</div>
      </div>
    );
  }
}

function getStyles() {
  return {
    footer: {
      color: '#777',
      padding: '10px 15px',
      textAlign: 'center',
      borderTop: '1px solid #e6e6e6',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      fontSize: '14px',
    },
  };
}
