import React from 'react';
import RegisterIcon from 'material-ui/lib/svg-icons/social/group-add';
import FindIcon from 'material-ui/lib/svg-icons/action/search';

export default class NoAccount extends React.Component {

  render() {
    const iconStyle = {
      width: '200px',
      height: '200px',
    };
    return (
      <div className='no-account-page'>
        <div className="no-account-container">
          <a className="register-new-team" href="/register">
            <RegisterIcon color='#ff4081' style={iconStyle}/>
            <div className="title">Create a New Team</div>
            <div className="desc">Want to start using Olis with your team? Create a new account and invite your teammates!</div>
          </a>
          <a className="find-my-team" href="/find-my-team">
            <FindIcon color='#00bcd4' style={iconStyle}/>
            <div className="title">Find My Team</div>
            <div className="desc">If you lost your invite email or if you're not sure what team you are a part of, click here.</div>
          </a>
        </div>
      </div>
    );
  }
}