import React from 'react';

export default class SystemMessageItem extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div style={getStyles().container}>
        <div style={getStyles().text}>{content}</div>
      </div>
    );
  }
}

function getStyles() {
  return {
    container: {
      padding: '6px',
      marginTop: '12px',
    },
    text: {
      textAlign: 'center',
      padding: '6px',
      background: 'rgba(255,255,255,0.5)',
      color: 'grey',
      borderRadius: '2px',
      fontSize: '14px',
      fontWeight: '300',
    },
  };
}
