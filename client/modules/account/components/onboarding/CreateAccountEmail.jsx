import React from 'react';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import EmailValidator from 'email-validator';
import R from 'ramda';

export default class RegisterEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorText: false
    };
  }

  componentDidMount() {
    this.input.focus();
  }

  handleClick() {
    const value = this.input.getValue();
    const {setRegisterEmail, go, nextPath} = this.props;
    setRegisterEmail(value);
    if (nextPath) { go(nextPath); }
  }

  handleEnterKeyDown(e) {
    e.preventDefault();
    this.handleClick();
  }

  handleChange() {
    const value = this.input.getValue();
    if (EmailValidator.validate(value) || R.isEmpty(value)) {
      this.setState({showErrorText: false});
    }
    else {
      this.setState({showErrorText: true});
    }
  }

  render() {
    const {registerEmail} = this.props;
    return (
      <div>
        <p>Login, password changes, and notifications will be sent to this address.</p>
        <p>You can always change this later.</p>
        <TextField
          type="email"
          hintText="your.name@example.com"
          floatingLabelText="Email"
          defaultValue={registerEmail}
          ref={(ref) => this.input = ref}
          onEnterKeyDown={this.handleEnterKeyDown.bind(this)}
          onChange={this.handleChange.bind(this)}
          errorText={this.state.showErrorText ? 'Enter a proper email.' : null}
        />
        <div style={{marginTop: '24px'}}>
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
