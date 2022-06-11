import { splitExpression, BINARY_OPERATORS, UNARY_OPERATORS, OPERATOR_MAP } from "../../../utilities.js"

const balanceValidator = expression => {
  const parentheses = expression.replace(/[^\(\)]/g, "");
  let openCount = 0;
  let closeCount = 0;

  for(const character of parentheses) {
    if(character === "(") {
      openCount++;
    } else if(character === ")" && closeCount < openCount) {
      closeCount++
    } else {
      return false;
    }
  }

  return openCount - closeCount === 0;
}

const countValidator = expression => {
  const noParens = expression.replace(/[\(\)]/g, "").split(' ');
  const onlyParens = expression.replace(/[^\(\)]/g, "");
  let minParens = 0

  noParens.forEach(char => {
    if(char in UNARY_OPERATORS) {
      minParens += 2
    } else if(char in BINARY_OPERATORS) {
      minParens += 4
    }
  })

  return onlyParens.length === minParens ? true : false
}

const orderValidator = expression => {
  const splitted = splitExpression(expression);

  for(const [index, char] of splitted.entries()) {
    let nextChar = splitted[index + 1];
    if(char === "(") {
      if(!OPERATOR_MAP.hasOwnProperty(nextChar) && isNaN(nextChar)) {
        return false
      }
    }

    if(char === ")") {
      if(nextChar !== "(" && nextChar !== ")" && index < splitted.length - 1) {
        return false
      }
    }

    //escrever teste que falha por ter comentado este bloco de codigo acima

    //REVISTO. "CE * (780982) + (754)" continua a passar no teste ao comentar o código no orderValidator porque a expressão
    // não é validada também pela countValidator. Ao especificar a validação pela função orderValidor, o teste falha após comentário.

    // Não me lembro se era este o teste: {in: "CE * (780982) 754", out: "Expressão mal definida."},
    // Se for, ele não falha ao se comentar a linha de código acima, porque está-se a fazer uma verificação
    // de uma expressão mal definida, que é partilhada pelas outras verificações, e por isso, ao comentar,
    // a expressão continua mal definida porque essa verificação é feita pelas outras funções. Se comentar a linha
    // juntamente com as outras verificações, o teste falha.

  }

  return true;
}



const validator = expression => {
  return orderValidator(expression) &&
    countValidator(expression) &&
    balanceValidator(expression);
}

export { validator, orderValidator };


// VALIDATOR
// const test1 = "+ (+ (-1) (5)) (5)";
// const test2 = "* -1 (-1)"
// const test3 = "+ -1 -1"
// const test4 = "* (780982) 754"

// balance - the expression needs equal number of ordered open and closed parentheses.
// count - the expression needs to have 4 parentheses for each binary operation, and 2 parentheses for each unary parentheses.
// order - the expression needs to respect certain order
// after ( -> number or operator
// after operator -> open parentheses
// after ) -> another parentheses opened or closed