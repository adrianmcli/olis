import React from 'react';
import ChatIcon from 'material-ui/lib/svg-icons/action/question-answer';

import RaisedButton from 'material-ui/lib/raised-button';
import HeaderNewConversation from '/client/modules/convos/components/HeaderNewConversation.jsx';

export default function NoConvoSelected() {
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
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <ChatIcon style={styles.icon} color={colors.foreground}/>
        <h1>Welcome to Olis!</h1>
        <p>Click the button to begin your first conversation:</p>
        <div style={{marginBottom: '50px'}}>
          <RaisedButton
            label="Create Your First Conversation"
            secondary={true}
          />
          <HeaderNewConversation />
        </div>
      </div>
    </div>
  );
}
