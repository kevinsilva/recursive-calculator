import { toNumber } from "../../../utilities.js";

export default class Expression {
    constructor(operator) {
        this.operator = operator;
    }

    getOperandValue(operand) {
        if (operand instanceof Expression) {
            return operand.result;
        }

        const [num, error] = toNumber(operand);
        return error ? null : num;
    }

    get result() {
        throw new Error("Abstract method. Must be overridden");
    }

}