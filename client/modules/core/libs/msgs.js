export default {
  routeToChat({FlowRouter}, teamId, convoId) {
    if (teamId && convoId) {
      FlowRouter.go(`/team/${teamId}/convo/${convoId}`);
      return null;
    }
    if (teamId) {
      FlowRouter.go(`/team/${teamId}`);
      return null;
    }
    FlowRouter.go(`/team`);
  }
};
