import React from 'react';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class CreateAccountTeamName extends React.Component {
  componentDidMount() {
    this.input.focus();
  }

  handleClick() {
    const inputValue = this.input.getValue();
    const {setRegisterTeamName, go, nextPath} = this.props;
    setRegisterTeamName(inputValue);
    go(nextPath);
  }

  handleEnterKeyDown(e) {
    e.preventDefault();
    this.handleClick();
  }

  render() {
    const {registerTeamName} = this.props;
    return (
      <div>
        <p>Give your team a name. You can always change this later.</p>
        <TextField
          hintText="Big Corporation Inc."
          floatingLabelText="Team Name"
          fullWidth
          defaultValue={registerTeamName}
          ref={(ref) => this.input = ref}
          onEnterKeyDown={this.handleEnterKeyDown.bind(this)}
        />
        <div style={{margin: '24px 0'}}>
          <RaisedButton
            label="Next Step"
            secondary={true}
            onClick={this.handleClick.bind(this)}
          />
        </div>
      </div>
    );
  }
}
