import React from 'react';

export default class RegisterEmail extends React.Component {
  componentDidMount() {
    this.input.focus();
  }

  handleClick() {
    const inputValue = this.input.value;
    const {setRegisterEmail} = this.props;
    setRegisterEmail(inputValue);
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) { // enter
      e.preventDefault();
      this.handleClick();
    }
  }

  render() {
    const {registerEmail} = this.props;
    return (
      <div>
        <h1>Step 1 of 5</h1>
        <h1>Enter your email address</h1>
        <div>
          You can login with either your username or your email.
          You will need to access your email if you ever need to reset your password.
          You can always change this later.
        </div>
        <div>
          <input
            type="text"
            placeholder="your.name@example.com"
            defaultValue={registerEmail}
            label="Email Address"
            ref={(ref) => this.input = ref}
            onKeyDown={this.handleKeyDown.bind(this)}
          />
        </div>
        <button onClick={this.handleClick.bind(this)}>Next</button>
      </div>
    );
  }
}
