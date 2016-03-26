import React from 'react';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class CreateAccountUsername extends React.Component {
  componentDidMount() {
    this.input.focus();
  }

  handleClick() {
    const inputValue = this.input.getValue();
    const {setRegisterUsername, go, nextPath} = this.props;
    setRegisterUsername(inputValue);
    go(nextPath);
  }

  handleEnterKeyDown(e) {
    e.preventDefault();
    this.handleClick();
  }

  render() {
    const {registerUsername} = this.props;
    return (
      <div>
        <p>This will be shown to others in your team, so pick something recognizable.</p>
        <p>You can always change this later.</p>
        <TextField
          hintText="UserName123"
          floatingLabelText="Username"
          defaultValue={registerUsername}
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
