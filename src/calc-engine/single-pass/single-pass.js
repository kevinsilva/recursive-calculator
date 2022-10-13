import {
  BINARY_OPERATORS,
  UNARY_OPERATORS,
  BAD_EXP,
  toNumber,
} from '../../utilities.js';

import Stack from './stack.js';
import {validator} from '../validator/validator.js';

const singlePassEvaluator = (expression) => {
  const stack = new Stack();
  const isValid = validator(expression);

  if (!isValid) return BAD_EXP;

  const tokens = expression
      .replace(/[\(\)]/g, '')
      .split(' ')
      .reverse();

  for (const token of tokens) {
    if (token in UNARY_OPERATORS) {
      const operand = toNumber(stack.remove());

      if (operand[1]) return BAD_EXP;
      const calculation = UNARY_OPERATORS[token](operand[0]);
      stack.add(calculation);
      continue;
    } else if (token in BINARY_OPERATORS) {
      const operandA = toNumber(stack.remove());
      const operandB = toNumber(stack.remove());

      if (operandA[1] || operandB[1]) return BAD_EXP;
      const calculation = BINARY_OPERATORS[token](operandA[0], operandB[0]);
      stack.add(calculation);
      continue;
    } else {
      const result = toNumber(token);

      if (result[1]) return BAD_EXP;
      stack.add(result[0]);
      continue;
    }
  }

  return stack.top;
};

export default singlePassEvaluator;
