import React from 'react';

import PageWrapper from '/client/modules/core/components/PageWrapper.jsx';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class CreateAccountUsername extends React.Component {
  componentDidMount() {
    this.input.focus();
  }

  handleClick() {
    const inputValue = this.input.getValue();
    const {setRegisterUsername} = this.props;
    setRegisterUsername(inputValue);
  }

  handleEnterKeyDown(e) {
    e.preventDefault();
    this.handleClick();
  }

  render() {
    const {registerUsername, goBack} = this.props;
    return (
      <PageWrapper
        title="Create a Username"
        description="This will be shown to others in your team. You can change this later."
        showDescription={true}
        backButton={true}
        backButtonLabel='Back'
        fullHeight={false}
        width="420px"
        handleBackButtonPress={goBack}
      >
        <TextField
          hintText="UserName123"
          floatingLabelText="Username"
          fullWidth
          defaultValue={registerUsername}
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
