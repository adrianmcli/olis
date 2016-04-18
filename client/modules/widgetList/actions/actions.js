export function updateTitle(title) {
  this.updateState(this.state.items, title);
}

export function addListItem(text) {
  const {items} = this.state;
  const randomNum = Math.random();
  const newItem = {
    id: 'id_' + randomNum,
    text,
  };
  const newItems = items.concat(newItem);
  this.updateState(newItems, this.state.title);
}

export function removeListItem(id) {
  const {items} = this.state;
  const newItems = items.filter(item => item.id !== id);
  this.updateState(newItems, this.state.title);
}
export function updateListItem(id, text) {
  const {items} = this.state;
  const newItems = items.map(item => {
    return item.id === id ? Object.assign(item, {text}) : item;
  });
  this.updateState(newItems, this.state.title);
}

export function removeLastListItem() {
  const {items} = this.state;
  let newItems;
  if (items.length) {
    newItems = items.filter((x, index) => index !== items.length - 1);
  } else {
    newItems = items;
  }
  this.updateState(newItems, this.state.title);
}
