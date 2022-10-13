import Stack from './stack.js';


describe('stack', () => {
  it('starts by being empty', () => {
    const stack = new Stack();

    expect(stack.empty).toBe(true);
    expect(stack.top).toBe(null);
  });

  it('adds items to the top', () => {
    const stack = new Stack();
    const item = Math.random() * 1000;
    stack.add();

    expect(stack.empty).toBe(true);
    expect(stack.top).toBe(null);

    stack.add(item);

    expect(stack.empty).toBe(false);
    expect(stack.top).toBe(item);

    stack.add(1);

    expect(stack.top).toBe(1);
    stack.add(2);
    expect(stack.top).toBe(2);
    stack.add(3);
    expect(stack.top).toBe(3);
  });

  it('returns removed items from the top', () => {
    const stack = new Stack();
    const item = Math.random() * 1000;

    expect(stack.remove()).toBe(undefined);


    expect(stack.empty).toBe(true);
    expect(stack.top).toBe(null);

    stack.add(item);

    expect(stack.top).toBe(item);
    expect(stack.empty).toBe(false);

    expect(stack.remove()).toBe(item);
    expect(stack.empty).toBe(true);
    expect(stack.top).toBe(null);

    stack.add('first-in');
    stack.add('second-in');

    expect(stack.empty).toBe(false);
    expect(stack.top).toBe('second-in');

    expect(stack.remove()).toBe('second-in');
    expect(stack.top).toBe('first-in');

    expect(stack.remove()).toBe('first-in');

    expect(stack.top).toBe(null);
    expect(stack.empty).toBe(true);

    stack.add(1);
    stack.add(2);
    stack.add(3);
    stack.add(4);
    stack.add(5);

    expect(stack.top).toBe(5);
    expect(stack.empty).toBe(false);

    expect(stack.remove()).toBe(5);

    expect(stack.top).toBe(4);
    expect(stack.empty).toBe(false);
  });
});
