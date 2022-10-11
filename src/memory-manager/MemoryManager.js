export default class MemoryManager {
  constructor() {
    this.memory = {};
  }

  create(memoryName) {
    if (this.memoryExists(memoryName)) {
      return "ja existe uma memoria com o mesmo nome.";
    }

    if (!this.isMemoryFull()) {
      this.memory[memoryName] = 0;
      return `Memoria criada com o nome: ${memoryName}`;
    }

    return "A calculadora não tem mais memórias disponíveis";
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
      return "Calculadora sem memorias.";
    }

    return this.createdMemoryNames()
      .map((name) => `${name}: ${this.memory[name].toFixed(2)}`)
      .join("; ");
  }

  _isMemoryUsed(expression) {
    const memoryRegex = this.createdMemoryNames().map(
      (name) => new RegExp(name, "g")
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
