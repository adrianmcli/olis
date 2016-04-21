import React from 'react';

export default class ChatMessageImage extends React.Component {
  render() {
    const { imageUrl } = this.props;

    return (
      <div>
        <a href={imageUrl} target='_blank'>
          <img src={imageUrl} alt="user uploaded image" style={{width: '100%'}}/>
        </a>
      </div>
    );
  }
}
