import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import VoteIcon from 'material-ui/lib/svg-icons/action/thumb-up';
import RemoveIcon from 'material-ui/lib/svg-icons/navigation/close';

import OptionEditInput from './OptionEditInput';

import {getPercentage} from '../utils/voting';

export default class OptionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      editing: false,
    };
    this.handleMouseOver = () => this.setState({hovered: true});
    this.handleMouseOut = () => this.setState({hovered: false});
    this.startEditing = () => this.setState({editing: true});
    this.stopEditing = () => this.setState({editing: false});
  }

  handleCancelVote() {
    const {user, option, actions} = this.props;
    actions.cancelVote(user, option.id);
  }

  handleCreateVote() {
    const {user, option, actions} = this.props;
    actions.createVote(user, option.id);
  }

  handleRemoveOption() {
    const {option, actions} = this.props;
    actions.removeOption(option.id);
  }

  renderVoteBtn() {
    const {voted} = this.props;
    const styles = getButtonStyles();
    const {base, accent} = styles.iconColors;
    return (
      <IconButton
        onClick={voted ? this.handleCancelVote.bind(this) : this.handleCreateVote.bind(this)}
        style={styles.voteButton}
      >
        <VoteIcon color={voted ? accent : base }/>
      </IconButton>
    );
  }

  renderRemoveBtn() {
    const styles = getButtonStyles();
    const {base} = styles.iconColors;
    return (
      <IconButton
        onClick={this.handleRemoveOption.bind(this)}
        style={styles.removeButton}
      >
        <RemoveIcon color={base}/>
      </IconButton>
    );
  }

  renderEditing() {
    const {updateOptionLabel} = this.props.actions;
    return (
      <OptionEditInput
        option={this.props.option}
        stopEditing={this.stopEditing}
        updateOptionLabel={updateOptionLabel}
      />
    );
  }

  render() {
    const {option, totalVotes, voted} = this.props;
    const styles = getStyles();

    const votes = option.voters.length;
    const percentage = getPercentage(option.voters.length, totalVotes);
    const barStyle = Object.assign({width: percentage}, getStyles().bar);

    const renderNumbers = () => <div style={styles.numbers}>{votes}{' / '}{percentage}</div>;
    const renderLabel = () => {
      const labelStyle = voted ?
        Object.assign(styles.label, {color: styles.labelAccent}) : styles.label;
      return (
        <div style={labelStyle} onDoubleClick={this.startEditing}>
          {option.label}
        </div>
      );
    };

    return (
      <div
        style={styles.container}
        onMouseEnter={this.handleMouseOver}
        onMouseLeave={this.handleMouseOut}
      >
        <div style={barStyle} />
        { !this.state.editing ? this.renderVoteBtn() : null }
        { this.state.editing ? this.renderEditing() : renderLabel() }
        { this.state.hovered ? this.renderRemoveBtn() : renderNumbers() }
      </div>
    );
  }
}

function getStyles() {
  return {
    container: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      borderBottom: '1px solid #ededed',
      boxSizing: 'border-box',
      padding: '15px',
      fontSize: '16px',

    },
    label: {
      zIndex: '2',
    },
    labelAccent: '#ff4081',
    numbers: {
      display: 'flex',
      zIndex: '2',
      color: '#999',
      marginLeft: 'auto',
    },
    bar: {
      position: 'absolute',
      height: '100%',
      backgroundColor: 'rgba(70, 207, 224, 0.5)',
      opacity: '0.2',
      top: '0',
      left: '0',
      bottom: '0',
      zIndex: '0',
      transition: 'all 1s',
    },
  };
}

function getButtonStyles() {
  return {
    voteButton: {
      margin: '-14px 0px -15px -15px',
    },
    removeButton: {
      margin: '-14px -15px -15px auto',
    },
    iconColors: {
      base: '#999',
      accent: '#ff4081',
    },
  };
}
