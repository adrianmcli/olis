import React from 'react';

import Loading from '/client/modules/core/components/Loading.jsx';
import ModalResultsList from './ModalResultsList.jsx';

export default class ModalResultsContainer extends React.Component {

  renderLoading() {
    const style = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center',
      },
      text: {
        fontWeight: '400',
        lineHeight: '1.6em',
        color: '#00BCD4',
      }
    };
    return (
      <div style={style.container}>
        <Loading spinnerName='cube-grid' />
        <h4 style={style.text}>
          Searching...
        </h4>
      </div>
    );
  }

  render() {
    const {results} = this.props;
    const waiting = false; // for debugging
    return (
      <div style={{height: '100%'}}>
        { waiting ? <this.renderLoading /> : <ModalResultsList results={results} /> }
      </div>
    );
  }
}
