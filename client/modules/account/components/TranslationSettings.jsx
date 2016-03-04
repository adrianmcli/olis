import React from 'react';
import R from 'ramda';
import LangCodes from '/lib/constants/lang_codes';

import SettingsCard from '/client/modules/core/components/SettingsCard.jsx';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class TranslationSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.translationLangCode};
    this.langCodeArr = R.keys(LangCodes);
  }

  handleChange(event, index, value) {
    this.setState({value});
    const {setTranslationLanguage} = this.props;
    setTranslationLanguage(value);
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
          {this.langCodeArr.map(code => {
            return <MenuItem key={code} value={code} primaryText={LangCodes[code]} />;
          })}
        </SelectField>
      </SettingsCard>
    );
  }
}
TranslationSettings.defaultProps = {
  translationLangCode: 'en'
};
