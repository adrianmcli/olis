import React from 'react';

import SettingsCard from '/client/modules/core/components/SettingsCard.jsx';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class MyAccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'English'};
  }

  handleChange(event, index, value) {
    this.setState({value});
    console.log(`Change default translation language to ${value}`);
  }

  render() {
    return (
      <SettingsCard
        title="Change Translation Language"
        subtitle="Choose the default language to translate into."
        style={{marginBottom: 'none'}}
        resetButtonText="Reset to English"
        submitButtonText={`Change to ${this.state.value}`}
        handleReset={this.handleReset}
        handleSubmit={this.handleSubmit}
        disableReset
        disableSubmit
        actionText="This setting is updated automatically when changed."
      >
        <p>Select one of the following languages that you understand best:</p>
        <SelectField value={this.state.value} onChange={this.handleChange.bind(this)}>
          <MenuItem value="English" primaryText="English"/>
          <MenuItem value="French" primaryText="French"/>
          <MenuItem value="Spanish" primaryText="Spanish"/>
        </SelectField>
      </SettingsCard>
    );
  }
}
