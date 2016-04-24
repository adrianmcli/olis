import React from 'react';

import RaisedButton from 'material-ui/lib/raised-button';

export default class TeamUserButtons extends React.Component {
  render() {
    const {user, makeTeamAdmin, removeFromTeam, showMakeAdminButton} = this.props;
    return (
      <div>
        {showMakeAdminButton ?
          <RaisedButton
            label="Make Admin"
            secondary={true}
            style={{marginTop: '12px', width: '100%'}}
            onClick={makeTeamAdmin.bind(null, user._id)}
          /> :
          null}
        <RaisedButton
          label="Remove"
          primary={true}
          style={{marginTop: '12px', width: '100%'}}
          onClick={removeFromTeam.bind(null, user._id)}
        />
      </div>
    );
  }
}
TeamUserButtons.defaultProps = {
  showButtons: false,
  makeTeamAdmin(userId = 'defaultUserId') { console.log(`Make ${userId} an admin`); },
  removeFromTeam(userId = 'defaultUserId') { console.log(`Remove ${userId} from team.`); }
};
