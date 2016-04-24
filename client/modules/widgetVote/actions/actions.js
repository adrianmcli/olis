import {clearUserFromOptions} from '../utils/voting';

export function updatePrompt(prompt) {
  this.updateState(prompt, this.state.options);
}

export function createOption(label) {
  const {options} = this.state;
  const randomNum = Math.random();
  const newOption = {
    id: 'id_' + randomNum,
    label,
    voters: [],
  };
  const newOptions = options.concat(newOption);
  this.updateState(this.state.prompt, newOptions);
}

export function updateOptionLabel(id, text) {
  const {options} = this.state;
  const newOptions = options.map(option => {
    return option.id === id ? Object.assign(option, {label: text}) : option;
  });
  this.updateState(this.state.prompt, newOptions);
}

export function removeOption(id) {
  const {options} = this.state;
  const newOptions = options.filter(option => option.id !== id);
  this.updateState(this.state.prompt, newOptions);
}

export function cancelVote(user, optionId) {
  const {options} = this.state;
  const newOptions = options.map(option => {
    const filteredVoters = option.voters.filter(voter => voter !== user);
    return option.id === optionId ? Object.assign(option, {voters: filteredVoters}) : option;
  });
  this.updateState(this.state.prompt, newOptions);
}

export function createVote(user, optionId) {
  const {options} = this.state;
  const clearedOptions = clearUserFromOptions(user, options);
  const newOptions = clearedOptions.map(option => {
    if (option.id === optionId) {
      const newVoters = option.voters.concat(user);
      return Object.assign(option, {voters: newVoters});
    }
    return option;
  });
  this.updateState(this.state.prompt, newOptions);
}
