import React from 'react';

import OptionItem from './OptionItem';
import AddOption from './AddOption';
import FlipMove from 'react-flip-move';
import {sortOptions, didUserVoteOption, getTotalVotes} from '../utils/voting';

export default class Body extends React.Component {
  render() {
    const {user, options, actions} = this.props;
    const sortedOptions = sortOptions(options);
    return (
      <div>
        <FlipMove>
        {
          sortedOptions.map( (option, index) => {
            return (
              <OptionItem
                key={option.id}
                user={user}
                index={index}
                option={option}
                voted={didUserVoteOption(user, option)}
                totalVotes={getTotalVotes(options)}
                actions={actions}
              />
            );
          })
        }
        </FlipMove>
        <AddOption createOption={actions.createOption} />
      </div>
    );
  }
}
