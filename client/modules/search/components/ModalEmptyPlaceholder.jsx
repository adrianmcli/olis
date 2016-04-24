import React from 'react';

import ActionSearch from 'material-ui/lib/svg-icons/action/search';

export default class ModalEmptyPlaceholder extends React.Component {

  render() {
    const baseColor = '#AAA';
    const style = {
      container: {
        color: baseColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center',
      },
      icon: {
        height: '64px',
        width: '64px',
      },
      text: {
        fontWeight: '400',
        lineHeight: '1.6em',
      },
    };
    return (
      <div style={style.container}>
        <ActionSearch
          color={baseColor}
          style={style.icon}
        />
        <h4 style={style.text}>
          Search results will appear here <br /> when you start typing.
        </h4>
      </div>
    );
  }
}
