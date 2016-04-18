import React from 'react';

import ListItem from './ListItem';
import ListInput from './ListInput';

export default class Body extends React.Component {

  renderItems() {
    const {items, actions} = this.props;
    if (!items) {return;}
    return (
      items.map(item =>
        <ListItem key={item.id} item={item} actions={actions} />)
    );
  }

  render() {
    const {items, actions} = this.props;
    return (
      <div>
        { this.renderItems() }
        <ListInput items={items} actions={actions} />
      </div>
    );
  }
}
