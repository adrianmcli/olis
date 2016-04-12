import React from 'react';

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/todoFilters';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed',
};

export default class Footer extends React.Component {

  getStyles() {
    return {
      footer: {
        color: '#777',
        padding: '10px 15px',
        textAlign: 'center',
        borderTop: '1px solid #e6e6e6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      todoCount: {
        fontSize: '14px',
        fontWeight: '300',
      },
      filterList: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexGrow: '1',
        padding: '0 12px',
        fontSize: '12px',
        maxWidth: '200px',
      },
      filter: {
        default: {
          cursor: 'pointer',
          borderRadius: '5px',
          padding: '4px 8px',
          border: '1px solid transparent',
        },
        active: {
          border: '1px solid #00bcd4',
          color: '#00bcd4',
        },
      },
      clearCompleted: {
        fontSize: '12px',
        color: 'inherit',
        opacity: '0.6',
        cursor: 'pointer',
      },
    };
  }

  renderFilterBtn(filter, active) {
    const {setFilter} = this.props;
    const title = FILTER_TITLES[filter];

    const defaultStyle = this.getStyles().filter.default;
    const activeStyle = this.getStyles().filter.active;
    const style = active ? Object.assign(defaultStyle, activeStyle) : defaultStyle;

    return (
      <div
        key={filter}
        style={style}
        onClick={setFilter.bind(null, filter)}
      >
        {title}
      </div>
    );
  }

  renderClearComplete(numComplete) {
    const {clearCompleted} = this.props.actions;
    const defaultStyle = this.getStyles().clearCompleted;
    const disabledStyle = {cursor: 'default', color: 'transparent'};

    let styles;
    let onClickFn;

    if (numComplete > 0) {
      styles = defaultStyle;
      onClickFn = clearCompleted;
    } else {
      styles = Object.assign(defaultStyle, disabledStyle);
      onClickFn = null;
    }
    return <div style={styles} onClick={onClickFn}>Clear completed</div>;
  }

  render() {
    const {todos, filter} = this.props;
    const styles = this.getStyles();

    const completedTasks = todos.filter(todo => todo.completed);
    const numComplete = completedTasks.length;
    const numLeft = todos.length - numComplete;

    const renderTodoCount = () => {
      const affix = numLeft === 1 ? ' item left' : ' items left';
      return <span style={styles.todoCount}><strong>{numLeft}</strong>{affix}</span>;
    };

    const activeFilter = filter;

    return (
      <footer style={styles.footer}>
        {renderTodoCount()}
        <div style={styles.filterList}>
          {[ SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED ].map(listFilter => {
            const active = listFilter === activeFilter;
            return this.renderFilterBtn(listFilter, active);
          }
          )}
        </div>
        {this.renderClearComplete(numComplete)}
      </footer>
    );
  }
}
