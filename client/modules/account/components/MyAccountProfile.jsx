import React from 'react';

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
    const {uploadImage} = this.props;
    const {files} = this.state;
    return (
      <div>
        My account profile
        <div>
          <input type="file" onChange={this.handleFileChange.bind(this)} />
          <button onClick={uploadImage.bind(null, files)}>UPLOAD</button>
        </div>
      </div>
    );
  }
}
