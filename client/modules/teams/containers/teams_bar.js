import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Teams from '../components/Teams.jsx';
import R from 'ramda';

const depsMapper = (context, actions) => ({
  context: () => context,
  addTeam: actions.teams.add,
  selectTeam: actions.teams.select,
  goToManageTeams: actions.teams.goToManageTeams
});

export const composer = ({context}, onData) => {
  const {Meteor, Collections, FlowRouter} = context();

  const teamId = FlowRouter.getParam('teamId');
  const convoId = FlowRouter.getParam('convoId');

  function mergeTeamId(selectObj) {
    if (teamId) { return R.merge(selectObj, {teamId: {$ne: teamId}}); }
    return selectObj;
  }
  function mergeConvoId(selectObj) {
    if (convoId) { return R.merge(selectObj, {convoId: {$ne: convoId}}); }
    return selectObj;
  }
  const getSelector = R.compose(mergeConvoId, mergeTeamId);
  const selector = getSelector({userId: Meteor.userId()});

  if (Meteor.subscribe('teams.list', {teamId, convoId}).ready()) {
    const teams = Collections.Teams.find({userIds: Meteor.userId()}).fetch();

    const notifications = Collections.Notifications.find(selector).fetch();
    const byTeam = R.groupBy(notif => notif.teamId);
    const notificationsByTeam = byTeam(notifications);

    onData(null, {
      teams,
      teamId,
      notificationsByTeam
    });
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Teams);
