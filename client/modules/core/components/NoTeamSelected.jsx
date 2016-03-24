import React from 'react';
import PeopleIcon from 'material-ui/lib/svg-icons/social/people';

import RaisedButton from 'material-ui/lib/raised-button';

export default function NoTeamSelected() {
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
        <PeopleIcon style={styles.icon} color={colors.foreground}/>
        <h1>No Team Selected</h1>
        <p>Please select a team on the sidebar to your left.</p>
        <hr/>
        <p>You may also choose one of the following:</p>
        <div style={{marginBottom: '50px'}}>
          <RaisedButton
            label="Account Settings"
            secondary={true}
          />
          <RaisedButton
            label="Logout"
            primary={true}
            style={{marginLeft: '24px'}}
          />
        </div>
      </div>
    </div>
  );
}
