import React from 'react';
import R from 'ramda';

import AvatarWithDefault from '/client/modules/core/components/AvatarWithDefault.jsx';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

export default class Permissions extends React.Component {
  handleRoleChange(userId, event, index, value) {
    const {setUserRole} = this.props;
    setUserRole(userId, value);
  }

  render() {
    const {teamId, users, pendingInviteIds} = this.props;
    const userRowItems = users.map(user => {
      const {
        _id,
        username,
        profileImageUrl,
        roles,
        emails
      } = user;

      const role = roles[teamId][0] ? roles[teamId][0] : 'Default role';

      return (
        <TableRow
          key={_id}
          displayBorder={false}
          style={{lineHeight: '64px'}}
        >
          <TableRowColumn style={{width: '72px'}}>
            <AvatarWithDefault
              username={username}
              avatarSrc={profileImageUrl}
            />
          </TableRowColumn>
          <TableRowColumn>
            {username}
            {emails[0].address}
            {R.contains(_id, pendingInviteIds) ? 'Invited' : null}
          </TableRowColumn>
          <TableRowColumn>
            <SelectField value={role} onChange={this.handleRoleChange.bind(this, _id)}>
              <MenuItem value="member" primaryText="Member" />
              <MenuItem value="admin" primaryText="Admin" />
            </SelectField>
          </TableRowColumn>
        </TableRow>
      );
    });

    return (
      <div>
        <p>Admins are able to delete messages and conversations. You must be an admin to change these settings.</p>
        <Table selectable={false}>
          <TableHeader
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn style={{width: '72px'}}></TableHeaderColumn>
              <TableHeaderColumn>User</TableHeaderColumn>
              <TableHeaderColumn>Role</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            { userRowItems }
          </TableBody>
        </Table>
      </div>
    );
  }
}

Permissions.defaultProps = {
  users: [
    {_id: 1, username: 'NickyC', avatarSrc: 'https://www.placecage.com/100/101', role: 1},
    {_id: 2, username: 'BillM', avatarSrc: 'https://www.placecage.com/101/101', role: 2},
    {_id: 3, username: 'ClintonD', avatarSrc: 'https://www.placecage.com/102/101', role: 2},
  ],
};
