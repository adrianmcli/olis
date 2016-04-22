import React from 'react';

export default class ChatMessageImage extends React.Component {
  render() {
    const { imageUrl } = this.props;

    return (
      <div>
        {imageUrl}
      </div>
    );
  }
}
