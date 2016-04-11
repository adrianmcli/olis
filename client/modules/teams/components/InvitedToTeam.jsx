import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import R from 'ramda';

import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

export default class InvitedToTeam extends React.Component {
  constructor(props) {
    super(props);
    const {invites} = props;
    this.state = {
      open: !R.isEmpty(invites)
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: !R.isEmpty(nextProps.invites)
    });
  }

  handleClose() {
    this.setState({open: false});
  }

  handleTeamClick(teamId) {
    const {selectInvite} = this.props;
    this.handleClose();
    selectInvite(teamId);
  }

  render() {
    const {invites, teams} = this.props;
    const {open} = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose.bind(this)}
      />
    ];

    const title = invites.length > 1 ?
      `You've been invited to some new teams!` :
      `You've been invited to a new team!`;

    return (
      <div>
        <Dialog
          title={title + ` Click its name to jump in.`}
          actions={actions}
          modal={true}
          open={open}
        >
          <List>
            {invites.map(invite => {
              const {_id, teamId} = invite;
              return (
                <ListItem
                  key={_id}
                  onClick={this.handleTeamClick.bind(this, teamId)}
                  primaryText={teams[teamId] ?
                    teams[teamId].name :
                    'Default team name'
                  }
                />
              );
            })}
          </List>
        </Dialog>
      </div>
    );
  }
}
InvitedToTeam.defaultProps = {
  invites: [],
  teams: {}
};
