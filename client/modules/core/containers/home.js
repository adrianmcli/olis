import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Home from '../components/Home.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  goToMyAccount: actions.account.goToMyAccount,
  logout: actions.account.logout
});

export const composer = ({context}, onData) => {
  const {Meteor, FlowRouter, Collections} = context();
  const teamId = FlowRouter.getParam('teamId');
  const convoId = FlowRouter.getParam('convoId');

  const user = Meteor.user();
  const team = Collections.Teams.findOne(teamId);
  if (team && !team.isUserInTeam(user._id)) {
    FlowRouter.go('/team');
  }

  const numConvos = Collections.Convos.find({teamId}).count();
  const doConvosExist = numConvos > 0;

  onData(null, {
    teamId,
    convoId,
    doConvosExist
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Home);
