import Expression from './Expression.js';


class BinaryExpression extends Expression {
  constructor(operator, operandA, operandB) {
    super(operator);
    this.operandA = operandA;
    this.operandB = operandB;
  }

  set operandA(value) {
    this.__operandA = this.getOperandValue(value);
  }

  get operandA() {
    return this.__operandA;
  }

  set operandB(value) {
    this.__operandB = this.getOperandValue(value);
  }

  get operandB() {
    return this.__operandB;
  }
}

class Add extends BinaryExpression {
  constructor(operandA, operandB) {
    super('+', operandA, operandB);
  }

  get result() {
    return this.operandA + this.operandB;
  }
}

class Subtract extends BinaryExpression {
  constructor(operandA, operandB) {
    super('-', operandA, operandB);
  }

  get result() {
    return this.operandA - this.operandB;
  }
}

class Multiply extends BinaryExpression {
  constructor(operandA, operandB) {
    super('*', operandA, operandB);
  }

  get result() {
    return this.operandA * this.operandB;
  }
}

class Divide extends BinaryExpression {
  constructor(operandA, operandB) {
    super('/', operandA, operandB);
  }

  get result() {
    return this.operandA / this.operandB;
  }
}

export {BinaryExpression, Add, Subtract, Multiply, Divide};
