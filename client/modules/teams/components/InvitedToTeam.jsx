import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import R from 'ramda';

import FlatButton from 'material-ui/lib/flat-button';
import Dialog from '/client/modules/core/components/Dialog';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import PeopleIcon from 'material-ui/lib/svg-icons/social/people';

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

    const style = {
      height: '128px',
      width: '128px',
      display: 'block',
      margin: 'auto',
    };

    return (
      <div>
        <Dialog
          title={title}
          actions={actions}
          modal={true}
          open={open}
          width={425}
        >
          <PeopleIcon style={style}/>
          <List>
            {invites.map(invite => {
              const {_id, teamId} = invite;
              return (
                <ListItem
                  key={_id}
                  onClick={this.handleTeamClick.bind(this, teamId)}
                  primaryText={teams[teamId] ?
                    teams[teamId].name : 'Default team name'}
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
