class Stack {
  constructor() {
    this.items = [];
  }

  add(item) {
    if (item === undefined) return;
    this.items.push(item);
  }

  remove() {
    return this.items.pop();
  }

  get top() {
    return this.items.length ?
            this.items[this.items.length - 1] :
            null;
  }

  get empty() {
    return this.items.length ? false : true;
  }
}

export default Stack;


