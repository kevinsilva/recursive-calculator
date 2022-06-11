import { Add, Divide, Multiply, Subtract } from "./calc-engine/evaluator/modeled/BinaryExpressions.js";
import { Abs, Cos, Sin, Exp, Ceil, Floor, Log, Round } from "./calc-engine/evaluator/modeled/UnaryExpressions.js";

const toNumber = input => {
    const result = Number.parseFloat(input);
    if (isNaN(result)) return [null, true];
    return [result, false];
};

const roundResult = result => parseFloat(result.toFixed(2));

// SPLIT EXPRESSION
// It splits the expression by characters or words*

const splitExpression = expression => expression.replace(/[\(]/g, " ( ")
                                                .replace(/[\)]/g, " ) ")
                                                .split(" ")
                                                .filter(el => el !== ""); 



const makeEmptyExpression = operator => new OPERATOR_MAP[operator]();

const UNARY_OPERATORS = {
    "ABS": a => Math.abs(a),
    "SIN": a => Math.sin(a),
    "COS": a => Math.cos(a),
    "EXP": a => Math.exp(a),
    "FLOOR": a => Math.floor(a),
    "CEIL": a => Math.ceil(a),
    "ROUND": a => Math.round(a),
    "LOG": a => Math.log(a)
}

const BINARY_OPERATORS = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b
}

const OPERATOR_MAP = {
    ABS: Abs,
    SIN: Sin,
    COS: Cos,
    EXP: Exp,
    FLOOR: Floor,
    CEIL: Ceil,
    ROUND: Round,
    LOG: Log,
    "+": Add,
    "-": Subtract,
    "*": Multiply,
    "/": Divide
};

const BAD_EXP = "Expressão mal definida.";




export { toNumber, roundResult, splitExpression, makeEmptyExpression, UNARY_OPERATORS, BINARY_OPERATORS, OPERATOR_MAP, BAD_EXP };

// *SPLIT EXPRESSION 
// const exp = "+ (+ (1) (1)) (LOG (-1))"
// exp.split(" ") -> ["+", "(+", "(1)", "(1))", "(LOG", "(-1))"]
// exp.replaceAll(" ", "").split.("") -> ["+", "(", "+", "(", "1", ")", "(", "1", ")", ")", "(", "L", "O", "G", "(", "-", "1", ")", ")"]
// PROBLEM - these splits are not convenient. We do not get unary operators unless with accumulator.
// SOLUTION - add spaces to each ( ) characters, then split by space, then remove extra spaces.
