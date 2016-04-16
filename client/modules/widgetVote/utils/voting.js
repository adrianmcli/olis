// Returns a boolean: true if the user voted in any option
export function didUserVote(user, options) {
  const matchingOptions = options.filter(opt => _isUserAVoter(user, opt.voters));
  return Boolean(matchingOptions.length);
}

// Returns a boolean: true if the user voted in this specific option
export function didUserVoteOption(user, option) {
  return _isUserAVoter(user, option.voters);
}

// Returns the option object that the user voted in
export function userVotedOption(user, options) {
  const matchingOptions = options.filter(opt => _isUserAVoter(user, opt.voters));
  return matchingOptions[0];
}

// Returns the total number of votes across all options
export function getTotalVotes(options) {
  return options.reduce((total, option) => {
    return total + option.voters.length;
  }, 0);
}

// Returns an array of sorted options from most votes to least
export function sortOptions(options) {
  const sortFunc = (a, b) => b.voters.length - a.voters.length;
  return options.sort(sortFunc);
}

// Returns a string value of the proportion of votes (eg. '33%')
export function getPercentage(votes, total) {
  if (!total) {return '0%';}
  const unRounded = 100 * (votes / total);
  return `${Math.round(unRounded)}%`;
}

// Returns the options array with the specified user removed as a voter
export function clearUserFromOptions(user, options) {
  return options.map(option => {
    const {voters} = option;
    return _isUserAVoter(user, voters) ?
      Object.assign(option, {voters: _filterUser(user, voters)}) : option;
  });
}

/* INTERNAL FUNCTIONS */

// Returns a boolean: true if the user belongs in the voter array
function _isUserAVoter(user, voters) {
  return Boolean(voters.filter(voter => user === voter).length);
}

// Returns an array of voters with the user omitted
function _filterUser(user, voters) {
  return voters.filter(voter => voter !== user);
}
