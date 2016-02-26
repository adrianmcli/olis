import React from 'react';
import R from 'ramda';

export default class RegisterInvite extends React.Component {
  constructor(props) {
    super(props);
    this.refBase = 'input'; // Any kinda this component only vars must be defined in constructor
  }

  componentDidMount() {
    this.refs[`${this.refBase}0`].focus();
  }

  shiftFocusDown(index) {
    const {inviteEmails, numInviteInputs, addMoreInvites} = this.props;
    const totalInputs = inviteEmails.length + numInviteInputs;
    if (index < totalInputs - 1) {
      this.refs[`${this.refBase}${index + 1}`].focus();
    }
    else { addMoreInvites(); }
  }

  handleKeyDown(index, e) {
    if (e.keyCode === 13 || e.keyCode === 9) { // enter, tab
      const inputValue = this.refs[`${this.refBase}${index}`].value;
      const {validateEmail} = this.props;

      if (inputValue.trim() !== '') {
        const onSuccess = e.keyCode === 13 ? () => this.shiftFocusDown(index) : () => null;
        const onError = (err) => {
          alert(err);
          this.refs[`${this.refBase}${index}`].focus();
        };
        validateEmail(inputValue, onError, onSuccess);
      }
    }
  }

  handleBlur(index) {
    const {validateEmail} = this.props;
    const inputValue = this.refs[`${this.refBase}${index}`].value;
    if (inputValue.trim() !== '') {
      const onError = (err) => alert(err);
      validateEmail(inputValue, onError);
    }
  }

  handleInviteClick() {
    const {setRegisterInviteEmails} = this.props;
    const inputValues = R.keys(this.refs).map(key => this.refs[key].value);
    setRegisterInviteEmails(inputValues);
  }

  renderInputs() {
    const {numInviteInputs} = this.props;
    let {inviteEmails} = this.props;
    inviteEmails = inviteEmails ? inviteEmails : [];

    const oldInputs = inviteEmails.map((email, index) => {
      return (
        <div key={email}>
          <input
            type="text"
            placeholder="Invite someone!"
            defaultValue={email}
            ref={this.refBase + index}
            onKeyDown={this.handleKeyDown.bind(this, index)}
            onBlur={this.handleBlur.bind(this, index)}
          />
        </div>
      );
    });

    let inputs = [];
    for (let i = 0; i < numInviteInputs; i++) {
      const newIndex = inviteEmails.length + i;
      const ref = `${this.refBase}${newIndex}`;
      const input = (
        <div key={'myKey' + i}>
          <input
            type="text"
            placeholder="team.member@example.com"
            ref={ref}
            onKeyDown={this.handleKeyDown.bind(this, newIndex)}
            onBlur={this.handleBlur.bind(this, newIndex)}
          />
        </div>
      );
      inputs = [ ...inputs, input ];
    }

    return [ ...oldInputs, ...inputs ];
  }

  render() {
    const {addMoreInvites, skipInvites} = this.props;
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
              <button onClick={this.handleInviteClick.bind(this)}>Invite and start using Olis!</button>
              <div>No need to set your password right now. We'll send you an email at EMAIL, to set your password.</div>
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
