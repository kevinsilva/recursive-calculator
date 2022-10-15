import readline from 'readline'; // Needs NODE JS
import calculator from './calculator.js';


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

