import React from 'react';

export default class RegisterUsername extends React.Component {
  componentDidMount() {
    this.input.focus();
  }

  handleClick() {
    const inputValue = this.input.value;
    const {setRegisterUsername} = this.props;
    setRegisterUsername(inputValue);
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) { // enter
      e.preventDefault();
      this.handleClick();
    }
  }

  render() {
    const {registerUsername} = this.props;
    return (
      <div>
        <h1>Step 2 of 5</h1>
        <h1>Enter your username</h1>
        <div>
          Your username is how people will see you in your team conversations.
          You can login with your username or email.
          You can always change this later.
        </div>
        <div>
          <input
            type="text"
            placeholder="Amanda Huginkiss"
            defaultValue={registerUsername}
            ref={(ref) => this.input = ref}
            onKeyDown={this.handleKeyDown.bind(this)}
          />
        </div>
        <button onClick={this.handleClick.bind(this)}>Next</button>
      </div>
    );
  }
}
