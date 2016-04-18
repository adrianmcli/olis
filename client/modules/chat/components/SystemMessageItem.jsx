import React from 'react';

export default class SystemMessageItem extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div>{content}</div>
    );
  }
}
