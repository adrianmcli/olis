import React from 'react';
import SettingsCard from '/client/modules/core/components/SettingsCard.jsx';
import TextField from 'material-ui/lib/text-field';

export default class TeamInfo extends React.Component {
  submitHandler() {
    const {setTeamInfo} = this.props;
    const value = this._textField.getValue();
    setTeamInfo(value);
  }

  render() {
    const {teamInfo} = this.props;
    return (
      <SettingsCard
        title="Change Team Info"
        subtitle={teamInfo}
        submitButtonText="Change Team Info"
        handleSubmit={this.submitHandler.bind(this)}
        disableReset={true}
        initiallyExpanded={true}
      >
        <p>Edit the team info:</p>
        <TextField
          hintText="Edit team info"
          floatingLabelText="Team Info"
          ref={(x) => this._textField = x}
        />
      </SettingsCard>
    );
  }
}
TeamInfo.defaultProps = {
  teamInfo: 'This is the default team info.'
};
