import React from 'react';
import PageWrapper from '/client/modules/core/components/PageWrapper.jsx';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import EmailValidator from 'email-validator';
import R from 'ramda';

export default class RegisterEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorText: false
    };
  }

  componentDidMount() {
    this.input.focus();
  }

  handleClick() {
    const value = this.input.getValue();
    const {setRegisterEmail} = this.props;
    setRegisterEmail(value);
  }

  handleEnterKeyDown(e) {
    e.preventDefault();
    this.handleClick();
  }

  handleChange() {
    const value = this.input.getValue();
    if (EmailValidator.validate(value) || R.isEmpty(value)) {
      this.setState({showErrorText: false});
    }
    else {
      this.setState({showErrorText: true});
    }
  }

  render() {
    const {registerEmail} = this.props;
    return (
      <PageWrapper
        title="Set Your Email"
        description="Login, password changes, and notifications will be sent to this address. You can change this later."
        showDescription={true}
        backButton={true}
        backButtonLabel='Back'
        fullHeight={false}
        width="420px"
      >
        <TextField
          type="email"
          hintText="your.name@example.com"
          floatingLabelText="Email"
          defaultValue={registerEmail}
          fullWidth
          ref={(ref) => this.input = ref}
          onEnterKeyDown={this.handleEnterKeyDown.bind(this)}
          onChange={this.handleChange.bind(this)}
          errorText={this.state.showErrorText ? 'Enter a proper email.' : null}
        />
        <div style={{margin: '14px 0'}}>
          <RaisedButton
            label="Next Step"
            secondary={true}
            onClick={this.handleClick.bind(this)}
          />
        </div>
      </PageWrapper>
    );
  }
}
