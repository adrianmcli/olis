import React from 'react';
import R from 'ramda';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class ResetPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showError1: false,
      showError2: false,
      errorText1: '',
      errorText2: '',
    };
  }

  componentDidMount() {
    this._newPassword1.focus();
  }

  _checkEmpty(pwd1, pwd2) {
    if (R.isEmpty(pwd1)) {
      this.setState({
        showError1: true,
        errorText1: 'Password cannot be empty.',
      });
      return false;
    }
    if (R.isEmpty(pwd2)) {
      this.setState({
        showError2: true,
        errorText2: 'Password cannot be empty.',
      });
      return false;
    }
    this.setState({showError1: false, showError2: false});
    return true;
  }

  _checkMatching(pwd1, pwd2) {
    if (pwd1 !== pwd2) {
      this.setState({
        showError1: true,
        showError2: true,
        errorText1: 'Passwords must match.',
        errorText2: 'Passwords must match.',
      });
      return false;
    }
    this.setState({
      showError1: false,
      showError2: false,
    });
    return true;
  }

  handleClick() {
    const {setRegisterPassword, nextPath, finishInviteeOnboard} = this.props;
    const pwd1 = this._newPassword1.getValue();
    const pwd2 = this._newPassword2.getValue();

    const notEmpty = this._checkEmpty(pwd1, pwd2);       // 1. ensure both new passwords are non-empty
    if (!notEmpty) {return false;}                      // -- terminate early if the above test fail
    const matching = this._checkMatching(pwd1, pwd2);    // 2. ensure that both new passwords are the same

    if (notEmpty && matching) {
      setRegisterPassword(pwd1, pwd2, nextPath);
      if (finishInviteeOnboard) { finishInviteeOnboard(); }
    } else {
      // There was an error
    }
  }

  handleEnterKeyDown(e) {
    e.preventDefault();
    this.handleClick();
  }

  render() {
    const {registerPassword} = this.props;
    return (
      <div>
        <p>Set your password by filling out the following:</p>
        <TextField
          hintText="Something hard to guess!"
          floatingLabelText="New Password"
          defaultValue={registerPassword}
          type="password"
          ref={ref => this._newPassword1 = ref}
          errorText={this.state.showError1 ? this.state.errorText1 : null}
        /><br/>
        <TextField
          hintText="Type it again"
          floatingLabelText="Confirm New Password"
          defaultValue={registerPassword}
          type="password"
          ref={ref => this._newPassword2 = ref}
          onEnterKeyDown={this.handleEnterKeyDown.bind(this)}
          errorText={this.state.showError2 ? this.state.errorText2 : null}
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
