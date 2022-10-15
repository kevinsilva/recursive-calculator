import CommandsManager from './commands-manager/CommandsManager.js';
import singlePassEvaluator from './calc-engine/single-pass/single-pass.js';
import MemoryManager from './memory-manager/MemoryManager.js';
import readline from 'readline'; // Needs NODE JS

const memoryManager = new MemoryManager();
const calcEngine = singlePassEvaluator;
const calculator = new CommandsManager(memoryManager, calcEngine);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
    'Bem-vindo à calculadora Eddisrupt. Para lista de comandos utilize \'A\'',
);

// call me back when this event (close) happens
rl.on('close', function() {
  console.log('Aplicação terminada. Até à próxima.');
  process.exit(0);
});

function run() {
  rl.question('Insira o comando: ', (comando) => {
    const output = calculator.runCommand(comando);
    console.log(output);
    if (output !== 'Aplicação terminada. Até à próxima.') {
      run();
    } else {
      process.exit(0);
    }
  });
}

run();

export {calculator};
