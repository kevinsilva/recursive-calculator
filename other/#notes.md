I.Calculation engine
i.parser (Modulo)
ii.evaluator (Modulo)
iii.single pass (Modulo)

//PARSE RECURSIVE 2

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
const { processOperator, processOperand } = arrayProcessor();
return genericOutput("array", expression, processOperator, processOperand);
}
}

const arrayProcessor = () => {
const tokens = [];
const processOperator = (it) => {
tokens.push(it);
return tokens;
};

return {
processOperator,
processOperand: (\_operator, operand) => pushIt(operand),
};
};

stack[(tokens, processOperator)];

const { processOperator } = arrayProcessor();

processOperator("banana");
processOperator("bananas");

class ArrayProcessor {
constructor() {
this.\_tokens = [];
}

processOperator(it) {
this.tokens.push(it);
return this.tokens;
}
}

const arrayp = new ArrayProcessor();

arrayp.processOperator("banana");
arrayp.processOperator("bananas");

//HOW TO EVALUATE INSIDE SINGLE-PASS?

- (3) (4)
  4 3 +
  opA opB operatorBinary

after first operand:
A: another operand must follow
B: an unary operator must follow
after second operand:
C: a binary operator must follow
D: first token must be an operator, either binary or unary
3 + 4 : fails A
1 2 3 : fails C
3 + + : fails A

- 3 4 : fails D

we need to know what token we are iterating
we need to know if it's first or second operand
we need to know the type of operator

// VALIDATOR
const test1 = "+ (+ (-1) (5)) (5)";
const test2 = "_ -1 (-1)"
const test3 = "+ -1 -1"
const test4 = "_ (780982) 754"

it needs to have balanced parens
the parens need to be in order
a binary expression needs to have 4 parentheses
an unary expression needs to have 2 parentheses

balance - the expression needs equal number of ordered open and closed parentheses.
count - the expression needs to have 4 parentheses for each binary operation, and 2 parentheses for each unary operation.
order - the expression needs to respect certain order
after ( -> number or operator
after operator -> open parentheses
after ) -> another parentheses opened or closed

II.Memory Manager
i. 1 vari??vel para cada memoria (no m??ximo 2)
ii. CRUD
Create: AM
Read: VM/LM
Update: AVM
Delete: N/A

parser.parse("VM primeira")???
memoryManager.parse("VM primeira")???
"VM primeira"
memoryManager.read("primeira")
"AVM primeira"
memoryManager.update("primeira")
"AM primeira"
memoryManager.create("primeira")
memoryManager.update("primeira", 10)
memoryManager.read("primeira") 10.00

Todos os comandos devem informar o nome da memoria,
com exce????o do LM (Listar Memorias)

AM: se criar memoria hom??nima, o programa deve retornar um aviso
e nao gravar.

AVM: caso nao tenha nenhum valor calculador, AVM recebe zero

III.Interface Web
i.prompts (para os testes)
ii.interface gr??fica (calculadora gr??fica)
iii.output

-> o utilizador clica numa tecla
-> numpad controller determina o valor
-> main controller passa para o
-> display-controller actualiza main display

numpad-controller
detecta click events em cada tecla e determina o valor

<!-- // Esquecer mem??ria pois n??o foi pensada tendo em conta a componente gr??fica.
// Em compensa????o, permitir teclas de par??nteses
// O visor deve mostrar todos os caracteres que vamos escrevendo
// Criar um backspace para apagar ??ltimos caracteres
// Todos os operadores devem aparecer no visor
// Acrescentar texto de refer??ncia sobre a operacionalidade em NPR
// par??nteses necess??rios somente para c??lculo de express??es complexas: + 1 2 (funcionaria)
// modo gr??fico permite excep????es para c??lculo de linha anterior.
// bot??o de igual = executa a express??o, depois mostra resultado
// ao mostrar resultado da expres??o, coloca express??o calculada em cima e em tamanho pequeno
// colocar par??nteses autom??ticos nos operadores un??rios (?)
// ter bot??o clear para limpar tudo
// adicionar tecla de espa??o -->
