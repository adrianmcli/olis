import React from 'react';

import PageWrapper from '/client/modules/core/components/PageWrapper.jsx';
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
    return (
      <PageWrapper
        title=''
        hideTitle={true}
        fullHeight={false}
        width="420px"
      >
      <div style={{textAlign: 'center'}}>
        <div
          style={{
            fontSize: '72px',
            fontWeight: '900',
            color: 'rgba(0,0,0,0.5)'
          }}
        >
          Olis
        </div>

        <div>
          <TextField
            floatingLabelText="Username or Email"
            ref={ref => this.usernameOrEmail = ref}
          />
        </div>

        <div>
          <TextField
            floatingLabelText="Password"
            type="password"
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

        <p style={{opacity: '0.5'}}><a href="#">Forgot your password?</a></p>
      </div>
      </PageWrapper>
    );
  }
}
