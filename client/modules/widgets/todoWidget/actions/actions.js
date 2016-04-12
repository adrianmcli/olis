export function addTask(text) {
  const {todos} = this.state;
  const randomNum = Math.random();
  const newTodo = {
    id: 'id_' + randomNum,
    text,
    completed: false,
  };
  const newTodos = todos.concat(newTodo);
  this.updateState(newTodos);
}

export function removeTask(id) {
  const {todos} = this.state;
  const newTodos = todos.filter(todo => todo.id !== id);
  this.updateState(newTodos);
}

export function toggleTask(id) {
  const {todos} = this.state;
  const newTodos = todos.map(todo => {
    return todo.id === id ? Object.assign(todo, {completed: !todo.completed}) : todo;
  });
  this.updateState(newTodos);
}

export function updateTask(id, text) {
  const {todos} = this.state;
  const newTodos = todos.map(todo => {
    return todo.id === id ? Object.assign(todo, {text}) : todo;
  });
  this.updateState(newTodos);
}

export function clearCompleted() {
  const {todos} = this.state;
  const newTodos = todos.filter(todo => !todo.completed);
  this.updateState(newTodos);
}

export function toggleAll() {
  const {todos} = this.state;
  const isAllChecked = todos.length === todos.filter(todo => todo.completed).length;
  let newTodos = todos.map(todo => Object.assign(todo, {completed: !isAllChecked}));
  this.updateState(newTodos);
}
