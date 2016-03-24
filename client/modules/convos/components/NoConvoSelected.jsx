import React from 'react';
import ChatIcon from 'material-ui/lib/svg-icons/action/question-answer';

import RaisedButton from 'material-ui/lib/raised-button';
import NewConvoDialog from '/client/modules/convos/components/NewConvoDialog.jsx';

export default function NoConvoSelected(props) {
  const {doConvosExist} = props;
  const colors = {
    foreground: '#999',
    background: '#EEE',
  };
  const styles = {
    container: {
      height: '100%',
      width: '100%',
      position: 'relative',
      backgroundColor: colors.background,
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: colors.foreground,
    },
    icon: {
      height: '128px',
      width: '128px',
      display: 'block',
      margin: 'auto',
    },
  };

  const _firstConvo = (
    <div>
      <h1>Welcome to Olis!</h1>
      <p>Click the button to begin your first conversation:</p>
      <div style={{marginBottom: '50px'}}>
        <RaisedButton
          label="Create Your First Conversation"
          secondary={true}
          onClick={() => this._dialog.handleOpen()}
        />
      </div>
    </div>
  );

  const _selectConvo = (
    <div>
      <p>Select a conversation on the right to start chatting!</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <ChatIcon style={styles.icon} color={colors.foreground}/>
        {doConvosExist ? _selectConvo : _firstConvo}
      </div>

      <NewConvoDialog ref={x => this._dialog = x} {...props} />
    </div>
  );
}
