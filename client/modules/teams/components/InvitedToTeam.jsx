import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import R from 'ramda';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

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

    return (
      <div>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={true}
          open={open}
        >
          You have been invited to the following teams:
          {invites.map(invite => {
            const {_id, teamId} = invite;
            return (
              <div key={_id} onClick={this.handleTeamClick.bind(this, teamId)}>
                {teams[teamId] ? teams[teamId].name : 'Default team name'}
              </div>
            );
          })}
        </Dialog>
      </div>
    );
  }
}
InvitedToTeam.defaultProps = {
  invites: [],
  teams: {}
};
