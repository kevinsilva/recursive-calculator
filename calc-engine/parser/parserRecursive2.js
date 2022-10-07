function parseRecursive2(expression, outputMode = "array") {
  if (outputMode === "modeled") {
    const { processOperator, processOperand } = modeledProcessor();
    return genericOutput(
      "modeled",
      expression,
      processOperator,
      processOperand
    );
  } else if (outputMode === "array") {
    const { processOperator, processOperand } = arrayProcessor(); // processOperator = arrayProcessor.processOperator
    return genericOutput("array", expression, processOperator, processOperand);
  }
}

// revealing module pattern
// estado interno no contexto por função (independente)
// propriedades e funções privadas (única forma de ter inacessibilidade)
// desvantagem: não dá para usar operador: instance of

const arrayProcessor = () => {
  const tokens = [];
  const processOperator = (it) => {
    tokens.push(it);
    return tokens;
  };

  return {
    processOperator,
    processOperand: (_operator, operand) => pushIt(operand),
  };
};

stack[(tokens, processOperator)];

const { processOperator } = arrayProcessor();

processOperator("banana");
processOperator("bananas");

class ArrayProcessor {
  constructor() {
    this._tokens = [];
  }

  processOperator(it) {
    this.tokens.push(it);
    return this.tokens;
  }
}

const arrayp = new ArrayProcessor();

arrayp.processOperator("banana");
arrayp.processOperator("bananas");
