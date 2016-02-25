import React from 'react';

export default class RegisterTeamName extends React.Component {
  componentDidMount() {
    this.input.focus();
  }

  handleClick() {
    const inputValue = this.input.value;
    const {setRegisterTeamName} = this.props;
    setRegisterTeamName(inputValue);
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) { // enter
      e.preventDefault();
      this.handleClick();
    }
  }

  render() {
    const {registerTeamName} = this.props;
    return (
      <div>
        <h1>Step 3 of 5</h1>
        <h1>Enter your team name</h1>
        <div>
          A team could be your community, company, department, a project team, or even just a group of friends.
          Your account will have adminstrator privileges for this team. You can change the team name later.
        </div>
        <div>
          <input
            type="text"
            placeholder="The B Team"
            defaultValue={registerTeamName}
            ref={(ref) => this.input = ref}
            onKeyDown={this.handleKeyDown.bind(this)}
          />
        </div>
        <button onClick={this.handleClick.bind(this)}>Next</button>
      </div>
    );
  }
}
