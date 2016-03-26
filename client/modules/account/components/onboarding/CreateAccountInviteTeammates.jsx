import React from 'react';

import PageWrapper from '/client/modules/core/components/PageWrapper.jsx';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import IconButton from 'material-ui/lib/icon-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add-box';

import EmailValidator from 'email-validator';
import R from 'ramda';

export default class CreateAccountInviteTeammates extends React.Component {
  constructor(props) {
    super(props);
    this.refBase = 'input';

    const {numInviteInputs} = this.props;
    let showErrorText = [];
    for (let i = 0; i < numInviteInputs; i++) {
      showErrorText[i] = false;
    }

    this.state = {
      showErrorText
    };
  }

  componentDidMount() {
    this.refs[`${this.refBase}0`].focus();
  }

  handleChange(ref, i) {
    const input = this.refs[ref].getValue();
    const isValidEmail = EmailValidator.validate(input);

    let showErrorText = this.state.showErrorText;
    if (!R.isEmpty(input) && !isValidEmail) {
      showErrorText[i] = true;
    }
    else {
      showErrorText[i] = false;
    }
    this.setState({showErrorText});
  }

  handleInviteClick() {
    const {setRegisterInviteEmails, finishRegistration} = this.props;
    const inputValues = R.keys(this.refs).map(key => this.refs[key].getValue());
    setRegisterInviteEmails(inputValues);
    finishRegistration();
  }

  render() {
    const {numInviteInputs, addMoreInvites} = this.props;
    let inputs = [];
    for (let i = 0; i < numInviteInputs; i++) {
      const ref = `${this.refBase}${i}`;
      const input = (
        <div key={ref}>
          <TextField
            hintText="your.name@example.com"
            floatingLabelText="Email"
            ref={ref}
            onChange={this.handleChange.bind(this, ref, i)}
            errorText={this.state.showErrorText[i] ? 'Enter a proper email.' : null}
          />
          {
            i === numInviteInputs - 1 ?
              <IconButton tooltip="Invite More" onClick={addMoreInvites}>
                <AddIcon color="#aaaaaa"/>
              </IconButton>
            :
              null
          }
        </div>
      );
      inputs = [ ...inputs, input ];
    }

    return (
      <div>
        <p>You can always invite more teammates later.</p>
        {inputs}
        <p style={{opacity: '0.5'}}><em>This step is optional, you can always do this later.</em></p>
        <div style={{margin: '24px 0'}}>
          <RaisedButton
            label="Finish"
            primary={true}
            onClick={this.handleInviteClick.bind(this)}
          />
        </div>
      </div>
    );
  }
}
CreateAccountInviteTeammates.defaultProps = {
  inviteEmails: [],
  numInviteInputs: 3
};
