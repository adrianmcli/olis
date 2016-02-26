import React from 'react';

export default class SetPasswordPage extends React.Component {
  handleKeyDown(e) {
    if (e.keyCode === 13) { // enter
      e.preventDefault();
      this.submit();
    }
  }

  submit() {
    const {token, resetPassword} = this.props;
    const newPassword = this.input.value;
    if (token) {
      resetPassword(token, newPassword);
    }
  }

  render() {
    return (
      <div>
        <h1>Set your password</h1>
        <div>Passwords must be at least 6 characters long. You'll need this to login.</div>
        <div>
          <input
            type="password"
            placeholder='Something secret...like "bosco"'
            ref={(ref) => this.input = ref}
            onKeyDown={this.handleKeyDown.bind(this)}
          />
        </div>
        <button onClick={this.submit.bind(this)}>Save</button>
      </div>
    );
  }
}
SetPasswordPage.propTypes = {
  token: React.PropTypes.string,
  resetPassword: React.PropTypes.func
};
