import React from 'react';

import AvatarWithDefault from '/client/modules/core/components/AvatarWithDefault.jsx';
import SettingContainer from '/client/modules/core/components/SettingContainer.jsx';

import RaisedButton from 'material-ui/lib/raised-button';
import Loading from '/client/modules/core/components/Loading.jsx';

// http://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded?rq=1
export class ProfilePic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      fileName: null,
      uploading: false,
      uploadComplete: false,
    };
  }

  componentWillReceiveProps() {
    this.setState({
      fileName: null,
      uploading: false,
      uploadComplete: true,
    });
  }

  handleFileChange(e) {
    const files = e.currentTarget.files;
    const fileName = files[0].name;
    this.setState({files, fileName, uploadComplete: false});
  }

  handleChooseFileClick() {
    setTimeout(() => {
      this._inputLabel.click();
    }, 200);
  }

  handleUpload() {
    const { uploadImage } = this.props;
    uploadImage(this.state.files);
    this.setState({fileName: null, uploading: true});
  }

  renderChooseFile() {
    return (
      <div>
        <input
          type="file" name="file" id="file"
          className="input-file"
          onChange={this.handleFileChange.bind(this)}
        />
        <label htmlFor="file" ref={x => this._inputLabel = x}>
          <RaisedButton label="Choose a File" onTouchTap={this.handleChooseFileClick.bind(this)}/>
        </label>
      </div>
    );
  }

  renderConfirmUpload() {
    return (
      <div style={{textAlign: 'center'}}>
        <div style={{marginTop: '12px'}}>File: { this.state.fileName }</div>
        <RaisedButton
          style={{marginTop: '12px'}}
          label="Confirm Upload"
          primary={true}
          onTouchTap={this.handleUpload.bind(this)}
        />
      </div>
    );
  }

  renderUploading() {
    return (
      <div>
        <Loading spinnerName='cube-grid' style={{marginTop: '12px', marginBottom: '12px'}}/>
        <h4 style={{fontWeight: '400', lineHeight: '1.6em', color: '#00BCD4'}}>
          Uploading...
        </h4>
      </div>
    );
  }

  renderUploadComplete() {
    return (
      <div>
        <h4 style={{fontWeight: '400', lineHeight: '1.6em', color: '#00BCD4'}}>
          Upload Complete!
        </h4>
      </div>
    );
  }

  render() {
    const { username, profileImageUrl } = this.props;
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
            style={{marginBottom: '24px'}}
            size={200}
            username={username}
            avatarSrc={profileImageUrl}
          />

          { !this.state.uploading ? this.renderChooseFile.bind(this)() : null }
          { this.state.fileName ? this.renderConfirmUpload.bind(this)() : null }
          { this.state.uploading ? this.renderUploading() : null }
          { this.state.uploadComplete ? this.renderUploadComplete() : null }

        </div>
      </SettingContainer>
    );
  }
}
