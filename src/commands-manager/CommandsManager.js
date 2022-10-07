import { roundResult } from '../utilities.js';

export default class CommandsManager {
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

    if (!this.isCommandValid(command)) return 'Opção nao existente';
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
      'CE - Calcular o valor duma expressão',
      'AVM - Atribuir ultimo valor calculado a uma memoria',
      'A - Ajuda',
      'AM - Alocar Memória',
      'S - Sair',
    ];

    return commandsList.join('\n');
  }

  get quit() {
    return 'Aplicação terminada. Até à próxima.';
  }
}
