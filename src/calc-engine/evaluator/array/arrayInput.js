import { toNumber, UNARY_OPERATORS, BINARY_OPERATORS } from "../../../utilities";

const evaluate = operand => 
    Array.isArray(operand) 
    ? evaluators[operand.length](operand) 
    : toNumber(operand)[0];


const evaluateUnary = ([operator, operandA]) => {
    const numberA = evaluate(operandA);
    return UNARY_OPERATORS[operator](numberA);
}


const evaluateBinary = ([operator, operandA, operandB]) => {
    const numberA = evaluate(operandA); 
    const numberB = evaluate(operandB);
    return BINARY_OPERATORS[operator](numberA, numberB);
}

const evaluators = {
    2: evaluateUnary,
    3: evaluateBinary
};


export { evaluate, evaluateUnary, evaluateBinary }
    
