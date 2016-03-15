export default {
  routeToChat({FlowRouter}, teamId, convoId) {
    if (convoId) { FlowRouter.go(`/team/${teamId}/convo/${convoId}`); }
    else { FlowRouter.go(`/team/${teamId}`); }
  }
};
