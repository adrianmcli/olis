import React from 'react';
import _ from 'lodash';

import Paper from 'material-ui/lib/paper';

import TitleBar from './TitleBar';
import Body from './Body';
// import './app.css';
// import './placeholder.css';

import {addTask, removeTask, toggleTask,
  updateTask, toggleAll, clearCompleted, updateTitle} from '../actions/actions';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const {data} = props;
    this.state = {
      title: canSetStateFromProps(data) ? data.title : 'To Do List',
      todos: canSetStateFromProps(data) ? data.todos : [],
    };
  }

  getActions() {
    return {
      addTask: addTask.bind(this),
      removeTask: removeTask.bind(this),
      toggleTask: toggleTask.bind(this),
      updateTask: updateTask.bind(this),
      toggleAll: toggleAll.bind(this),
      clearCompleted: clearCompleted.bind(this),
      updateTitle: updateTitle.bind(this),
    };
  }

  componentWillReceiveProps(nextProps) {
    const {data} = nextProps;
    if (canSetStateFromProps(data)) {
      this.setState({todos: data.todos, title: data.title});
    }
  }

  updateState(todos, title) {
    const {widgetId, update} = this.props;

    this.setState({todos, title});
    update(widgetId, {todos, title});
  }

  render() {
    const style = {
      position: 'relative',
      boxSizing: 'border-box',
      width: '100%',
    };
    const {todos, title} = this.state;
    const actions = this.getActions();
    return (
      <Paper className='todoapp' style={style}>
        <TitleBar title={title} updateTitle={actions.updateTitle} />
        <Body todos={todos} actions={actions} />
      </Paper>
    );
  }
}

function canSetStateFromProps(data) {
  const hasData = data;
  const hasTodos = hasData && _.has(data, 'todos');
  return hasTodos;
}

App.defaultProps = {
  data: {
    title: 'To Do List',
    todos: [],
  },
  update: () => console.log('update function'),
};
