import { OPERATOR_MAP, makeEmptyExpression } from "../../utilities";
import { BinaryExpression } from "../evaluator/modeled/BinaryExpressions";
import { UnaryExpression } from "../evaluator/modeled/UnaryExpressions";


//parseRecursive("8", "modeled"))
const parseRecursive = (expression, outputMode = "array") => 
    OUTPUT_MODES[outputMode](expression);


// function parseRecursive2(expression, outputMode = "array") {

//     if (outputMode === "modeled") {
//         const { processOperator, processOperand } = modeledProcessor();
//         return genericOutput("modeled", expression, processOperator, processOperand);
//     } else if (outputMode === "array") {
//         const { processOperator, processOperand } = arrayProcessor(); // processOperator = arrayProcessor.processOperator
//         return genericOutput("array", expression, processOperator, processOperand);
//     }
// }

const OUTPUT_MODES = {
    array: expression => {
        const { processOperator, processOperand } = arrayProcessor(); // processOperator = arrayProcessor.processOperator
        return genericOutput("array", expression, processOperator, processOperand);
    },
    modeled: expression => {
        const { processOperator, processOperand } = modeledProcessor();
        return genericOutput("modeled", expression, processOperator, processOperand);
    }, 
};


const genericOutput = (mode, expression, processOperator, processOperand) => {
    if (!expression.includes("(") && !expression.includes(")")) return expression;
    
    let operator = "";
    let processedOperator = null;
    let processedExpression = null;
    let unwrappedLength = 0;
    
    //"COS (-45)"
    //character = "COS"

    for (const [index, character] of expression.replace(" ", "").split("").entries()) {
        if (unwrappedLength > 0) {
            unwrappedLength--;
            continue;
        }

        if (character === "(") {
            const unwrappedOperand = unwrapOperand(expression.substring(index)); //"-45"
            unwrappedLength = unwrappedOperand.length;
            const parsedOperand = parseRecursive(unwrappedOperand, mode);
            processedExpression = processOperand(processedOperator, parsedOperand);
            continue;
        }

        operator += character;
        if (operator in OPERATOR_MAP) {
            processedOperator = processOperator(operator);
            operator = "";
            continue;
        }
    }
    return processedExpression;
};

//revealing module pattern
//estado interno no contexto por função (independente)
//propriedades e funções privadas (única forma de ter inacessibilidade)
//desvantagem: não dá para usar operador: instance of

// const arrayProcessor = () => {
//     const tokens = [];
//     const processOperator = it => {
//         tokens.push(it);
//         return tokens;
//     };

//     return {
//         processOperator,
//         processOperand: (_operator, operand) => pushIt(operand)
//     };
// };

const arrayProcessor = () => {
    const tokens = [];
    const pushIt = it => {
        tokens.push(it);
        return tokens;
    };

    return {
        processOperator: pushIt,
        processOperand: (_operator, operand) => pushIt(operand)
    };
};

//stack [tokens, processOperator]

// const { processOperator } = arrayProcessor();

// processOperator("banana");
// processOperator("bananas");

// class ArrayProcessor {
//     constructor() {
//         this._tokens = [];
//     }


//     processOperator(it) {
//         this.tokens.push(it);
//         return this.tokens;
//     }
// }

// const arrayp = new ArrayProcessor();

// arrayp.processOperator("banana")
// arrayp.processOperator("bananas")

const modeledProcessor = () => ({
    processOperator: operator => makeEmptyExpression(operator),
    processOperand: (operator, operand) => {
        switch(true) {
            case operator instanceof UnaryExpression:
                operator.operand = operand;
                break;
            
            case operator instanceof BinaryExpression:
                const operandName = operator.operandA ? "operandB" : "operandA";
                operator[operandName] = operand;
                break; 
        }

        return operator;
    },
});

const isEndOfOperand = (openCount, closeCount) => 
    openCount > 0 && closeCount  > 0 && openCount - closeCount === 0;

const unwrapOperand = expression => {
    let openCount = 0;
    let closeCount = 0;

    let openIndex = -1;
    let closeIndex = -1;

    for (const [index, character] of expression.split("").entries()) {
        if (character === "(") {
            if (openIndex === -1) {
                openIndex = index;
            }
            openCount++;
            continue;
        } else if (character === ")") {
            closeCount++;
            if (isEndOfOperand(openCount, closeCount)) {
                closeIndex = index;
                break;
            }
        }
    }

    return expression.substring(openIndex + 1, closeIndex);
}


export default parseRecursive;