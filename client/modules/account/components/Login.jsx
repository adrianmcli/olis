import React from 'react';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class Login extends React.Component {
  handleSubmit() {
    const usernameOrEmail = this.usernameOrEmail.getValue();
    const password = this.password.getValue();

    const {login} = this.props;
    login(usernameOrEmail, password);
  }

  render() {
    const linkStyle = {
      color: 'white',
      marginTop: '12px',
    };
    return (
      <div style={{
        color: 'white',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#2F3F70',
      }}>
        <div
          style={{
            fontSize: '72px',
            fontWeight: '900',
          }}
        >
          Olis
        </div>

        <div>
          <TextField
            floatingLabelText="Username or Email"
            floatingLabelStyle={{color: 'rgba(255,255,255,0.5)'}}
            inputStyle={{color: 'white'}}
            onEnterKeyDown={this.handleSubmit.bind(this)}
            ref={ref => this.usernameOrEmail = ref}
          />
        </div>

        <div>
          <TextField
            floatingLabelText="Password"
            floatingLabelStyle={{color: 'rgba(255,255,255,0.5)'}}
            inputStyle={{color: 'white'}}
            type="password"
            onEnterKeyDown={this.handleSubmit.bind(this)}
            ref={ref => this.password = ref}
          />
        </div>

        <div style={{margin: '14px 0'}}>
          <RaisedButton
            label="Login"
            primary={true}
            onClick={this.handleSubmit.bind(this)}
          />
        </div>

        <a href="/forgot-password" style={linkStyle}>Forgot your password?</a>
        <a href="/register" style={linkStyle}>No Account?</a>
      </div>
    );
  }
}
