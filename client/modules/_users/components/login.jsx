import React from 'react';

class Login extends React.Component {
  handleClick() {
    const {login} = this.props;
    const usernameOrEmail = this.refs.usernameOrEmail.value;
    const password = this.refs.password.value;

    login({usernameOrEmail, password});
  }

  render() {
    return (
      <div>
        Login
        <div>Username or Email<input ref="usernameOrEmail" type="text"/></div>
        <div>Password <input ref="password" type="password"/></div>
        <button onClick={this.handleClick.bind(this)}>Login</button>
      </div>
    );
  }
}

export default Login;
