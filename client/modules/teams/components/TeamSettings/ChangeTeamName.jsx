import React from 'react';

import SettingsCard from '/client/modules/core/components/SettingsCard.jsx';
import TextField from 'material-ui/lib/text-field';

export default class ChangeTeamName extends React.Component {
  submitHandler() {
    const input = this._textField.getValue();
    console.log(input + 'is the new name to be set');
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
