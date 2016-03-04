import React from 'react';

import PageWrapper from '/client/modules/core/components/PageWrapper.jsx';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class CreateAccountTeamName extends React.Component {
  componentDidMount() {
    this.input.focus();
  }

  handleClick() {
    const inputValue = this.input.getValue();
    const {setRegisterTeamName} = this.props;
    setRegisterTeamName(inputValue);
  }

  handleEnterKeyDown(e) {
    e.preventDefault();
    this.handleClick();
  }

  render() {
    const {registerTeamName} = this.props;
    return (
      <PageWrapper
        title="Create a Team"
        description="Give your team a name. You can change this later."
        showDescription={true}
        backButton={true}
        backButtonLabel='Back'
        fullHeight={false}
        width="420px"
      >
        <TextField
          hintText="Big Corporation Inc."
          floatingLabelText="Team Name"
          fullWidth
          defaultValue={registerTeamName}
          ref={(ref) => this.input = ref}
          onEnterKeyDown={this.handleEnterKeyDown.bind(this)}
        />
        <div style={{margin: '14px 0'}}>
          <RaisedButton
            label="Next Step"
            secondary={true}
            onClick={this.handleClick.bind(this)}
          />
        </div>
      </PageWrapper>
    );
  }
}
