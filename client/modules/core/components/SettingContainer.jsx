import React from 'react';

export default class SettingContainer extends React.Component {

  componentDidMount() {
    setTimeout(() => {
    const { onShow } = this.props;
    // if (onShow) {onShow();}
    }, 250);
  }

  render() {

    const { title, children } = this.props;

    const containerStyle = {
      width: '100%',
      padding: '30px 28px 20px',
      color: '#9e9e9e',
    };

    const titleStyle = {
      fontWeight: '300',
      marginTop: '0px',
    };

    return (
      <div style={containerStyle}>
        <h1 style={titleStyle}> { title } </h1>
        { children }
      </div>
    );
  }
}
