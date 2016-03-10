import React from 'react';

export default class SettingContainer extends React.Component {

  render() {

    const { title, children } = this.props;

    const containerStyle = {
      width: '100%',
      height: '100%',
      padding: '0 20px 20px',
      color: '#9e9e9e',
    };

    const titleStyle = {
      fontWeight: '300',
      marginTop: '20px',
    };

    return (
      <div style={containerStyle}>
        <h1 style={titleStyle}> { title } </h1>
        { children }
      </div>
    );
  }
}
