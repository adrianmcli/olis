import React from 'react';

export default class RegisterInvite extends React.Component {
  constructor(props) {
    super(props);
    this.refBase = 'input'; // Any kinda this component only vars must be defined in constructor
  }

  componentDidMount() {
    this.refs[`${this.refBase}0`].focus();
  }

  handleKeyDown(index, e) {
    if (e.keyCode === 13 || e.keyCode === 9) { // enter, tab
      const {inviteEmails, numInviteInputs} = this.props;
      const totalInputs = inviteEmails.length + numInviteInputs;
      const inputValue = this.refs[`${this.refBase}${index}`].value;
    }
  }

  renderInputs() {
    const {numInviteInputs} = this.props;
    let {inviteEmails} = this.props;
    inviteEmails = inviteEmails ? inviteEmails : [];

    const oldInputs = inviteEmails.map((email, index) => {
      return (
        <div>
          <input
            key={email}
            type="text"
            placeholder="Invite someone!"
            defaultValue={email}
            ref={this.refBase + index}
            onKeyDown={this.handleKeyDown.bind(this, index)}
          />
        </div>
      );
    });

    let inputs = [];
    for (let i = 0; i < numInviteInputs; i++) {
      const ref = `${this.refBase}${inviteEmails.length + i}`;
      const input = (
        <div>
          <input
            key={'myKey' + i}
            type="text"
            placeholder="team.member@example.com"
            ref={ref}
            onKeyDown={this.handleKeyDown.bind(this, inviteEmails.length + i)}
          />
        </div>
      );
      inputs = [ ...inputs, input ];
    }

    return [ ...oldInputs, ...inputs ];
  }

  render() {
    const {addMoreInvites, setRegisterInviteEmails, skipInvites} = this.props;
    return (
      <div>
        <h1>Step 4 of 4</h1>
        <h1>Invite your teammates!</h1>
        <div>
          <div>Enter the email addresses of the teammates you want to invite:</div>
          {this.renderInputs.bind(this)()}
          <button onClick={addMoreInvites}>Add more teammates</button>
          <div>
            <div>
              <button onClick={setRegisterInviteEmails}>Invite and start using Olis!</button>
              <button onClick={skipInvites}>Skip this step</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
RegisterInvite.defaultProps = {
  inviteEmails: [],
  numInviteInputs: 3
};
