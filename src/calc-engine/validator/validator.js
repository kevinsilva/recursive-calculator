import {
  splitExpression,
  BINARY_OPERATORS,
  UNARY_OPERATORS,
  OPERATOR_MAP,
} from '../../utilities.js';

const balanceValidator = (expression) => {
  const parentheses = expression.replace(/[^\(\)]/g, '');
  let openCount = 0;
  let closeCount = 0;

  for (const character of parentheses) {
    if (character === '(') {
      openCount++;
    } else if (character === ')' && closeCount < openCount) {
      closeCount++;
    } else {
      return false;
    }
  }

  return openCount - closeCount === 0;
};

const countValidator = (expression) => {
  const noParens = expression.replace(/[\(\)]/g, '').split(' ');
  const onlyParens = expression.replace(/[^\(\)]/g, '');
  let minParens = 0;

  noParens.forEach((char) => {
    if (char in UNARY_OPERATORS) {
      minParens += 2;
    } else if (char in BINARY_OPERATORS) {
      minParens += 4;
    }
  });

  return onlyParens.length === minParens ? true : false;
};

const orderValidator = (expression) => {
  const splitted = splitExpression(expression);

  for (const [index, char] of splitted.entries()) {
    const nextChar = splitted[index + 1];
    if (char === '(') {
      if (!OPERATOR_MAP.hasOwnProperty(nextChar) && isNaN(nextChar)) {
        return false;
      }
    }

    if (char === ')') {
      if (nextChar !== '(' && nextChar !== ')' && index < splitted.length - 1) {
        return false;
      }
    }
  }

  return true;
};

const validator = (expression) => {
  return (
    orderValidator(expression) &&
    countValidator(expression) &&
    balanceValidator(expression)
  );
};

export {validator, orderValidator};
