import React from 'react';

import RaisedButton from 'material-ui/lib/raised-button';

export default class ChatUserButtons extends React.Component {
  render() {
    const {user, removeFromConvo} = this.props;
    return (
      <div>
        <RaisedButton
          label="Remove from chat"
          primary={true}
          style={{marginTop: '12px', width: '100%'}}
          onClick={removeFromConvo.bind(null, user._id)}
        />
      </div>
    );
  }
}
ChatUserButtons.defaultProps = {
  showButtons: false,
  removeFromConvo(userId = 'defaultUserId') { console.log(`Remove ${userId} from convo.`); }
};
