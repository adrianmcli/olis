import React from 'react';
import ImageIcon from 'material-ui/lib/svg-icons/editor/insert-photo';

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
          <ImageIcon color='#AAA' style={styles.uploadBtn}/>
        </label>
      </div>
    );
  }
}

function getStyles() {
  return {
    uploadBtn: {
      cursor: 'pointer',
      marginTop: '6px',
    },
  };
}
