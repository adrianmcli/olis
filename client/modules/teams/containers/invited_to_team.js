import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import InvitedToTeam from '../components/InvitedToTeam.jsx';
import R from 'ramda';

const depsMapper = (context, actions) => ({
  context: () => context,
  goToTeam: actions.teams.select
});

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('invites.list').ready()) {
    const invites = Collections.Invites.find({userId: Meteor.userId()}).fetch();

    if (Meteor.subscribe('teams.list').ready()) {
      const teamsArr = Collections.Teams.find({userIds: Meteor.userId()}).fetch();
      const teams = R.zipObj(teamsArr.map(team => team._id), teamsArr);

      onData(null, {invites, teams});
    }
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(InvitedToTeam);
