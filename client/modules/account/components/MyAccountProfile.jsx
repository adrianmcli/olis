import React from 'react';

import AvatarWithDefault from '/client/modules/core/components/AvatarWithDefault.jsx';
import SettingContainer from '/client/modules/core/components/SettingContainer.jsx';

import RaisedButton from 'material-ui/lib/raised-button';

// http://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded?rq=1
export class ProfilePic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      fileName: null,
    };
  }

  handleFileChange(e) {
    const files = e.currentTarget.files;
    const fileName = files[0].name;
    this.setState({files, fileName});
  }

  handleChooseFileClick() {
    setTimeout(() => {
      this._inputLabel.click();
    }, 200);
  }

  render() {
    const { username, profileImageUrl, uploadImage } = this.props;
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };
    return (
      <SettingContainer title='Change Profile Picture'>
        <div style={containerStyle}>

          <AvatarWithDefault
            style={{margin: '24px'}}
            size={200}
            username={username}
            avatarSrc={profileImageUrl}
          />

          <div>
            <input
              type="file"
              name="file"
              id="file"
              className="input-file"
              onChange={this.handleFileChange.bind(this)}
            />
            <label htmlFor="file" ref={x => this._inputLabel = x}>
              <RaisedButton label="Choose a File" onTouchTap={this.handleChooseFileClick.bind(this)}/>
            </label>
          </div>

          { this.state.fileName ? <div style={{marginTop: '12px'}}>Upload: { this.state.fileName } ?</div> : null }
          { this.state.fileName ?
            <RaisedButton
              style={{marginTop: '12px'}}
              label="Confirm Upload"
              primary={true}
              onTouchTap={uploadImage.bind(null, this.state.files)}
            />
          : null }

        </div>
      </SettingContainer>
    );
  }
}
