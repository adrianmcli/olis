import React from 'react';
import _ from 'lodash';

import Paper from 'material-ui/lib/paper';

import TitleBar from './TitleBar';
import Body from './Body';
// import './app.css';
// import './placeholder.css';

import {updateTitle, addListItem, removeListItem,
  updateListItem, removeLastListItem} from '../actions/actions';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const {data} = props;
    this.state = {
      title: canSetStateFromProps(data) ? data.title : 'My List',
      items: canSetStateFromProps(data) ? data.items : [],
    };
  }

  getActions() {
    return {
      updateTitle: updateTitle.bind(this),
      addListItem: addListItem.bind(this),
      removeListItem: removeListItem.bind(this),
      updateListItem: updateListItem.bind(this),
      removeLastListItem: removeLastListItem.bind(this),
    };
  }

  componentWillReceiveProps(nextProps) {
    const {data} = nextProps;
    if (canSetStateFromProps(data)) {
      this.setState({items: data.items, title: data.title});
    }
  }

  updateState(items, title) {
    const {widgetId, update} = this.props;

    this.setState({items, title});
    update(widgetId, {items, title});
  }

  render() {
    const style = {
      position: 'relative',
      boxSizing: 'border-box',
      width: '100%',
    };
    const {items, title} = this.state;
    const actions = this.getActions();
    return (
      <Paper className='listapp' style={style}>
        <TitleBar title={title} updateTitle={actions.updateTitle} />
        <Body items={items} actions={actions} />
      </Paper>
    );
  }
}

function canSetStateFromProps(data) {
  const hasData = data;
  const hasItems = hasData && _.has(data, 'items');
  return hasItems;
}

App.defaultProps = {
  data: {
    title: 'My List',
    items: [],
  },
  update: () => console.log('update function'),
};
