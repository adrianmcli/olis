import React from 'react';

import SettingsCard from '/client/modules/core/components/SettingsCard.jsx';
import TextField from 'material-ui/lib/text-field';

export default class ChangeTeamName extends React.Component {
  submitHandler() {
    const {setTeamName} = this.props;
    const input = this._textField.getValue();
    setTeamName(input);
  }

  render() {
    return (
      <SettingsCard
        title="Change Team Name"
        subtitle="This is the name of your team."
        submitButtonText="Change Team Name"
        handleSubmit={this.submitHandler.bind(this)}
        disableReset={true}
        initiallyExpanded={true}
      >
        <p>Enter in a new name:</p>
        <TextField
          hintText="Choose a new team name"
          floatingLabelText="New Team Name"
          ref={(x) => this._textField = x}
        />
      </SettingsCard>
    );
  }
}
