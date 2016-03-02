import React from 'react';
import AvatarWithDefault from '/client/modules/core/components/AvatarWithDefault.jsx';

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
    return (
      <div>
        <AvatarWithDefault
          size={200}
          username={username}
          src={profileImageUrl}
        />

        <div>
          Change profile pic
          <div>
            <input type="file" onChange={this.handleFileChange.bind(this)} />
            <div><button onClick={uploadImage.bind(null, files)}>UPLOAD</button></div>
          </div>
        </div>
      </div>
    );
  }
}
MyAccountProfile.defaultProps = {
  username: 'Default username'
};
