import { roundResult } from "../../../utilities";
import { Abs, Cos, Log, Floor, Ceil, Sin, Round, Exp } from './UnaryExpressions';
import { Subtract } from "./BinaryExpressions";


describe("unary expressions", () => {
    it("evaluates ABS expressions", () => {
        expect(new Abs(-1).result).toEqual(1);
        expect(new Abs(456).result).toEqual(456);
        expect(new Abs(-562.02).result).toEqual(562.02);
    });

    it("evaluates COS expressions", () => {
        expect(roundResult(new Cos(3).result)).toEqual(-0.99);
        expect(roundResult(new Cos(0.8).result)).toEqual(0.7);
    });

    it("evaluates LOG expressions", () => {
        expect(roundResult(new Log(0.8).result)).toEqual(-0.22);
        expect(roundResult(new Log(101).result)).toEqual(4.62);
    }); 

    it("evaluates FLOOR expressions", () => {
        expect(new Floor(-4.123).result).toEqual(-5);
        expect(roundResult(new Floor(2.54).result)).toEqual(2);

    });

    it("evaluates SIN expressions", () => {
        expect(roundResult(new Sin(0.5).result)).toEqual(0.48);
        expect(roundResult(new Sin(1).result)).toEqual(0.84);
    });

    it("evaluates ROUND expressions", () => {
        expect(roundResult(new Round(4.67).result)).toEqual(5);
        expect(roundResult(new Round(4.5).result)).toEqual(5);
        expect(roundResult(new Round(3.23545).result)).toEqual(3);
    });

    it("evaluates EXP expressions", () => {
        expect(roundResult(new Exp(3.23545).result)).toEqual(25.42);
        expect(roundResult(new Exp(-1.4).result)).toEqual(0.25);
    });

    it("evaluates CEIL expressions", () => {
        expect(roundResult(new Ceil(1.02).result)).toEqual(2);
        expect(roundResult(new Ceil(-4.123).result)).toEqual(-4);
    });

    it("can have other unary expressions as an operand", () => {
        expect(roundResult(new Sin(new Abs(-45)).result)).toEqual(0.85);
    });

    it ("can have other binary expressions as an operand", () => {
        expect(roundResult(new Abs(new Subtract(5, 15)).result)).toEqual(10);
    });
});

