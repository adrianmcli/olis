import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ToggleIcon from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-down';

import Footer from './Footer';
import TodoItem from './TodoItem';

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/todoFilters';

export default class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: SHOW_ALL
    };
  }

  getStyles() {
    return {
      main: {
        position: 'relative',
      },
      todoList: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
      },
      toggleAll: {
        position: 'absolute',
        top: '-54px',
        left: '8px',
      }
    };
  }

  renderTodoList() {
    const {todos, actions} = this.props;
    const styles = this.getStyles().todoList;

    let filteredTodos;
    switch (this.state.filter) {
      case SHOW_COMPLETED:
        filteredTodos = todos.filter(todo => todo.completed);
        break;
      case SHOW_ACTIVE:
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      default:
        filteredTodos = todos;
    }

    return (
      <ul style={styles}>
        {filteredTodos.map(todo => <TodoItem todo={todo} actions={actions} />)}
      </ul>
    );
  }

  renderToggleAll() {
    const {todos, actions} = this.props;
    const styles = this.getStyles().toggleAll;

    const completedTasks = todos.filter(todo => todo.completed);
    const allChecked = todos.length === completedTasks.length;
    const iconColor = allChecked ? '#737373' : 'rgb(230,230,230)';

    return (
      <IconButton
        onClick={actions.toggleAll}
        style={styles}
      >
        <ToggleIcon color={iconColor}/>
      </IconButton>
    );
  }

  setFilter(filter) {
    this.setState({filter});
  }

  render() {
    const {todos, actions} = this.props;
    const styles = this.getStyles().main;

    if (todos.length > 0) {
      return (
      <div>
        <section style={styles}>
          {this.renderToggleAll()}
          {this.renderTodoList()}
        </section>
        <Footer
          todos={todos}
          filter={this.state.filter}
          actions={actions}
          setFilter={this.setFilter.bind(this)}
        />
        </div>
      );
    }
    return null;
  }
}
