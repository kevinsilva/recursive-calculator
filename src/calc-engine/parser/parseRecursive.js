import {OPERATOR_MAP, makeEmptyExpression} from '../../utilities';
import {BinaryExpression} from '../evaluator/modeled/BinaryExpressions';
import {UnaryExpression} from '../evaluator/modeled/UnaryExpressions';

const parseRecursive = (expression, outputMode = 'array') =>
  OUTPUT_MODES[outputMode](expression);

const OUTPUT_MODES = {
  array: (expression) => {
    const {processOperator, processOperand} = arrayProcessor();
    return genericOutput('array', expression, processOperator, processOperand);
  },
  modeled: (expression) => {
    const {processOperator, processOperand} = modeledProcessor();
    return genericOutput(
        'modeled',
        expression,
        processOperator,
        processOperand,
    );
  },
};

const genericOutput = (mode, expression, processOperator, processOperand) => {
  if (!expression.includes('(') && !expression.includes(')')) return expression;

  let operator = '';
  let processedOperator = null;
  let processedExpression = null;

  let unwrappedLength = 0;

  for (const [index, character] of expression
      .replace(' ', '')
      .split('')
      .entries()) {
    if (unwrappedLength > 0) {
      unwrappedLength--;
      continue;
    }

    if (character === '(') {
      const unwrappedOperand = unwrapOperand(expression.substring(index));
      unwrappedLength = unwrappedOperand.length;
      const parsedOperand = parseRecursive(unwrappedOperand, mode);
      processedExpression = processOperand(processedOperator, parsedOperand);
      continue;
    }

    operator += character;
    if (operator in OPERATOR_MAP) {
      processedOperator = processOperator(operator);
      operator = '';
      continue;
    }
  }
  return processedExpression;
};

const arrayProcessor = () => {
  const tokens = [];
  const pushIt = (it) => {
    tokens.push(it);
    return tokens;
  };

  return {
    processOperator: pushIt,
    processOperand: (_operator, operand) => pushIt(operand),
  };
};

const modeledProcessor = () => ({
  processOperator: (operator) => makeEmptyExpression(operator),
  processOperand: (operator, operand) => {
    switch (true) {
      case operator instanceof UnaryExpression:
        operator.operand = operand;
        break;

      case operator instanceof BinaryExpression:
        const operandName = operator.operandA ? 'operandB' : 'operandA';
        operator[operandName] = operand;
        break;
    }

    return operator;
  },
});

const isEndOfOperand = (openCount, closeCount) =>
  openCount > 0 && closeCount > 0 && openCount - closeCount === 0;

const unwrapOperand = (expression) => {
  let openCount = 0;
  let closeCount = 0;

  let openIndex = -1;
  let closeIndex = -1;

  for (const [index, character] of expression.split('').entries()) {
    if (character === '(') {
      if (openIndex === -1) {
        openIndex = index;
      }
      openCount++;
      continue;
    } else if (character === ')') {
      closeCount++;
      if (isEndOfOperand(openCount, closeCount)) {
        closeIndex = index;
        break;
      }
    }
  }

  return expression.substring(openIndex + 1, closeIndex);
};

export default parseRecursive;
