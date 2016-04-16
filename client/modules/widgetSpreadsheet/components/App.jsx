import React from 'react';

import Table from './Table';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Table {...this.props} />
      </div>
    );
  }
}
