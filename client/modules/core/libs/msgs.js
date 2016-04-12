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
  },

  timestampFormatter(value, unit, suffix) {
    let timeStr = '';
    let resultingUnit = unit;

    if (unit === 'minute') { resultingUnit = 'min'; }
    if (unit === 'hour') { resultingUnit = 'hr'; }

    if (unit === 'second') {
      timeStr = 'Just now';
    } else {
      if (value !== 1) {
        resultingUnit += 's';
      }
      return value + ' ' + resultingUnit + ' ' + suffix;
    }
    return timeStr;
  }
};
