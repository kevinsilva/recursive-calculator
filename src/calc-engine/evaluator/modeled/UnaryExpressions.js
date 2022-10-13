import Expression from './Expression.js';

class UnaryExpression extends Expression {
  constructor(operator, operand) {
    super(operator);
    this.operand = operand;
  }

  set operand(value) {
    this.__operand = this.getOperandValue(value);
  }

  get operand() {
    return this.__operand;
  }
}

class Abs extends UnaryExpression {
  constructor(operand) {
    super('ABS', operand);
  }

  get result() {
    return Math.abs(this.operand);
  }
}

class Cos extends UnaryExpression {
  constructor(operand) {
    super('COS', operand);
  }

  get result() {
    return Math.cos(this.operand);
  }
}

class Log extends UnaryExpression {
  constructor(operand) {
    super('LOG', operand);
  }

  get result() {
    return Math.log(this.operand);
  }
}

class Ceil extends UnaryExpression {
  constructor(operand) {
    super('CEIL', operand);
  }

  get result() {
    return Math.ceil(this.operand);
  }
}

class Floor extends UnaryExpression {
  constructor(operand) {
    super('FLOOR', operand);
  }

  get result() {
    return Math.floor(this.operand);
  }
}

class Sin extends UnaryExpression {
  constructor(operand) {
    super('SIN', operand);
  }

  get result() {
    return Math.sin(this.operand);
  }
}

class Round extends UnaryExpression {
  constructor(operand) {
    super('ROUND', operand);
  }

  get result() {
    return Math.round(this.operand);
  }
}

class Exp extends UnaryExpression {
  constructor(operand) {
    super('EXP', operand);
  }

  get result() {
    return Math.exp(this.operand);
  }
}

export {UnaryExpression, Abs, Cos, Log, Floor, Ceil, Sin, Round, Exp};
