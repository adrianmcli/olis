import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import AccountUtils from '/client/modules/core/libs/account';
import R from 'ramda';

// http://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded?rq=1
export default class MyAccountProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {files: []};
  }

  handleFileChange(e) {
    const files = e.currentTarget.files;
    this.setState({files});
  }

  render() {
    const {username, profileImageUrl, uploadImage} = this.props;
    const {files} = this.state;

    const avatarString = profileImageUrl ? null : R.take(2, username);
    return (
      <div>
        <Avatar
          size={200}
          src={profileImageUrl}
          // onClick={this.handleOpen.bind(this)}
          style={{cursor: 'pointer'}}
          backgroundColor={AccountUtils.convertStringToColor(username)}
        >
          {avatarString}
        </Avatar>

        <div>
          Change profile pic
          <input type="file" onChange={this.handleFileChange.bind(this)} />
          <button onClick={uploadImage.bind(null, files)}>UPLOAD</button>
        </div>
      </div>
    );
  }
}
MyAccountProfile.defaultProps = {
  username: 'Default username'
};
