import React from 'react';

class Register extends React.Component {
  handleClick() {
    const {register} = this.props;
    const email = this.refs.email.value;
    const username = this.refs.username.value;
    const password = this.refs.password.value;

    register({email, username, password});
  }

  render() {
    return (
      <div>
        Register
        <div>Email <input ref="email" type="text"/></div>
        <div>Username <input ref="username" type="text"/></div>
        <div>Password <input ref="password" type="password"/></div>
        <button onClick={this.handleClick.bind(this)}>Register</button>
      </div>
    );
  }
}

export default Register;
