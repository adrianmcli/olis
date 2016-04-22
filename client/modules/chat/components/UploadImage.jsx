import React from 'react';

export default class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      fileName: null,
      uploading: false,
      uploadComplete: false,
    };
  }

  handleFileChange(e) {
    const files = e.currentTarget.files;
    const fileName = files[0].name;
    this.setState({files, fileName, uploadComplete: false});

    // upload
    if (fileName) {
      const { uploadImage } = this.props;
      uploadImage(files);
      this.setState({fileName: null, uploading: true});
    }
  }

  render() {
    const styles = getStyles();
    return (
      <div className="upload-image">
        <input
          type="file" name="file" id="file"
          className="input-file"
          onChange={this.handleFileChange.bind(this)}
        />
        <label htmlFor="file">
          <div style={styles.uploadBtn}>Upload Image</div>
        </label>
      </div>
    );
  }
}

function getStyles() {
  return {
    uploadBtn: {
      background: 'grey',
      color: 'white',
      padding: '6px',
      cursor: 'pointer',
    },
  };
}
