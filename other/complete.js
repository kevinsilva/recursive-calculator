class CommandsManager {
  constructor(memoryManager, calcEngine) {
    this.memoryManager = memoryManager;
    this._result = 0;
    this._commands = {
      CE: (expression) => {
        const loadedExp = memoryManager.loadMemory(expression);
        this._result = calcEngine(loadedExp);

        if (typeof this._result === 'number') return roundResult(this._result);
        return this._result;
      },
      AM: (name) => {
        return memoryManager.create(name);
      },
      VM: (name) => {
        return memoryManager.read(name);
      },
      LM: () => {
        return memoryManager.list();
      },
      A: () => {
        return this.help;
      },
      S: () => {
        return this.quit;
      },
      AVM: (name) => {
        return memoryManager.update(name, this._result);
      },
    };
  }

  runCommand(input) {
    const command = input.split(' ').slice(0, 1).join().toUpperCase();
    const expression = input.split(' ').slice(1).join(' ');

    if (!this.isCommandValid(command)) return 'Opcao nao existente';
    return this._commands[command](expression);
  }

  isCommandValid(command) {
    return this._commands.hasOwnProperty(command);
  }

  get result() {
    return this._result;
  }

  set result(value) {
    this.result = value;
  }

  get help() {
    const commandsList = [
      'VM - Consultar o valor da memoria',
      'LM - Indicar o nome das memorias',
      'CE - Calcular o valor duma expressao',
      'AVM - Atribuir ultimo valor calculado a uma memoria',
      'A - Ajuda',
      'AM - Alocar Memoria',
      'S - Sair',
    ];

    return commandsList.join('\n');
  }

  get quit() {
    //TODO
    return 'Aplicacao terminada. Ate a proxima.';
  }
}

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
    return this.items.length ? this.items[this.items.length - 1] : null;
  }

  get empty() {
    return this.items.length ? false : true;
  }
}

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
    let nextChar = splitted[index + 1];
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

    //escrever teste que falha por ter comentado este bloco de codigo acima

    // Nao me lembro se era este o teste: {in: "CE * (780982) 754", out: "Expressao mal definida."},
    // Se for, ele nao falha ao se comentar a linha de codigo acima, porque está-se a fazer uma verificacao
    // de uma expressao mal definida, que e partilhada pelas outras verificacões, e por isso, ao comentar,
    // a expressao continua mal definida porque essa verificacao e feita pelas outras funcões. Se comentar a linha
    // juntamente com as outras verificacões, o teste falha.
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

const toNumber = (input) => {
  const result = Number.parseFloat(input);
  if (isNaN(result)) return [null, true];
  return [result, false];
};

const roundResult = (result) => parseFloat(result.toFixed(2));

// SPLIT EXPRESSION
// It splits the expression by characters or words*

const splitExpression = (expression) =>
  expression
    .replace(/[\(]/g, ' ( ')
    .replace(/[\)]/g, ' ) ')
    .split(' ')
    .filter((el) => el !== '');

const makeEmptyExpression = (operator) => new OPERATOR_MAP[operator]();

const UNARY_OPERATORS = {
  ABS: (a) => Math.abs(a),
  SIN: (a) => Math.sin(a),
  COS: (a) => Math.cos(a),
  EXP: (a) => Math.exp(a),
  FLOOR: (a) => Math.floor(a),
  CEIL: (a) => Math.ceil(a),
  ROUND: (a) => Math.round(a),
  LOG: (a) => Math.log(a),
};

const BINARY_OPERATORS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

const OPERATOR_MAP = {
  ABS: 'Abs',
  SIN: 'Sin',
  COS: 'Cos',
  EXP: 'Exp',
  FLOOR: 'Floor',
  CEIL: 'Ceil',
  ROUND: 'Round',
  LOG: 'Log',
  '+': 'Add',
  '-': 'Subtract',
  '*': 'Multiply',
  '/': 'Divide',
};

const BAD_EXP = 'Expressao mal definida.';

class MemoryManager {
  constructor() {
    this.memory = {};
  }

  create(memoryName) {
    if (this.memoryExists(memoryName)) {
      return 'ja existe uma memoria com o mesmo nome.';
    }

    if (!this.isMemoryFull()) {
      this.memory[memoryName] = 0;
      return `memoria criada com o nome: ${memoryName}`;
    }

    return 'A calculadora nao tem mais memorias disponíveis';
  }

  read(memoryName) {
    if (this.memoryExists(memoryName)) {
      return `${memoryName}: ${this.memory[memoryName].toFixed(2)}`;
    } else {
      return `Memoria nao existente.`;
    }
  }

  update(memoryName, value) {
    if (this.memoryExists(memoryName)) {
      this.memory[memoryName] = value;
      return `${memoryName}: ${this.memory[memoryName].toFixed(2)}`;
    } else {
      return `Memoria nao existente.`;
    }
  }

  delete(memoryName) {
    if (this.memoryExists(memoryName)) {
      delete this.memory[memoryName];
      return `Memoria ${memoryName} apagada`;
    } else {
      return `Memoria nao existente.`;
    }
  }

  list() {
    if (this.createdMemoryNames(this.memory).length === 0) {
      return 'Calculadora sem memorias.';
    }

    return this.createdMemoryNames()
      .map((name) => `${name}: ${this.memory[name].toFixed(2)}`)
      .join('; ');
  }

  _isMemoryUsed(expression) {
    const memoryRegex = this.createdMemoryNames().map(
      (name) => new RegExp(name, 'g')
    );

    for (const reg of memoryRegex) {
      if (reg.test(expression)) return true;
      return false;
    }
  }

  loadMemory(expression) {
    let result = expression;

    for (const name of this.createdMemoryNames()) {
      const value = this.memory[name];

      result = result.replaceAll(name, value);
    }
    return result;
  }

  createdMemoryNames() {
    return Object.keys(this.memory);
  }

  memoryExists(memoryName) {
    return Object.keys(this.memory).includes(memoryName);
  }

  isMemoryFull() {
    return Object.keys(this.memory).length < 2 ? false : true;
  }
}
const memoryManager = new MemoryManager();

const calcEngine = singlePassEvaluator;
const calculator = new CommandsManager(memoryManager, calcEngine);

const run = () => {
  const input = prompt('Insira o comando: ');
  const output = calculator.runCommand(input);
  alert(output);

  if (output !== 'Aplicacao terminada. Ate a proxima.') {
    run();
  } else {
    stop();
  }
};

run();
