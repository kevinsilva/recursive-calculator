import parseRecursive from "./parseRecursive";
import { Sin, Cos, Abs } from "../evaluator/modeled/UnaryExpressions";
import { Add, Subtract, Multiply, Divide } from "../evaluator/modeled/BinaryExpressions";

describe("parseRecursive", () => {
    describe("parses as an array", () => {
        it ("parses the expression if there are no parentheses" , () => {
            expect(parseRecursive("8")).toEqual("8");
            expect(parseRecursive("-1")).toEqual("-1");
        });

        it ("parses simple wrapped expressions", () => {
            expect(parseRecursive("(8)")).toEqual(["8"]);
            expect(parseRecursive("(-1)")).toEqual(["-1"]);
        });

        it("parses simple unary expressions", () => {
            expect(parseRecursive("ABS (-9)")).toEqual(["ABS", "-9"]);
            expect(parseRecursive("SIN (30)")).toEqual(["SIN", "30"]);
            expect(parseRecursive("COS (-45)")).toEqual(["COS", "-45"]);
        });

        it("parses simple binary expressions", () => {
            expect(parseRecursive("+ (8) (9)")).toEqual(["+", "8", "9"]);
            expect(parseRecursive("- (-3) (-5)")).toEqual(["-", "-3", "-5"]);
            expect(parseRecursive("* (4) (-5)")).toEqual(["*", "4", "-5"]);
            expect(parseRecursive("/ (10) (2)")).toEqual(["/", "10", "2"]);
        });

        it("parses recursive unary expressions", () => {
            expect(parseRecursive("ABS (COS (45))")).toEqual(["ABS", ["COS", "45"]]);
            expect(parseRecursive("SIN (COS (ABS (-30)))")).toEqual([
                "SIN",
                ["COS", ["ABS", "-30"]],
            ]);
        })

        it("parses recursive binary expressions", () => {
            expect(parseRecursive("+ (- (5) (3)) (* (9) (10))")).toEqual([
                "+",
                ["-", "5", "3"],
                ["*", "9", "10"]
            ]);

            expect(parseRecursive("/ (* (-1) (2)) (+ (- (3) (-4)) (-5))")).toEqual([
                "/",
                ["*", "-1", "2"],
                ["+", ["-", "3", "-4"], "-5"]
            ]);
        });

        it ("parses complex recursive expressions", () => {
            expect(parseRecursive("ABS (+ (8) (9))")).toEqual([
                "ABS",
                ["+", "8", "9"]
            ]);

            expect(parseRecursive("+ (ABS (2.25)) (COS (30))")).toEqual([
                "+",
                ["ABS", "2.25"],
                ["COS", "30"]
            ]);
        })
    });

    describe("parse as modeled expression", () => {
        it ("parses the expression if there are no parentheses", () => {
            expect(parseRecursive("8", "modeled")).toEqual("8");
            expect(parseRecursive("-1", "modeled")).toEqual("-1");
        });

        it ("parses simple wrapped expressions", () => {
            expect(parseRecursive("8", "modeled")).toEqual("8");
            expect(parseRecursive("-1", "modeled")).toEqual("-1");
        });

        it ("parses simple unary expressions", () => {
            expect(parseRecursive("ABS (-9)", "modeled")).toEqual(new Abs(-9));
            expect(parseRecursive("SIN (30)", "modeled")).toEqual(new Sin(30));
            expect(parseRecursive("COS (-45)", "modeled")).toEqual(new Cos (-45));
        });

        it("parses simple binary expressions", () => {
            expect(parseRecursive("+ (8) (9)", "modeled")).toEqual(new Add(8, 9));
            expect(parseRecursive("- (-3) (-5)", "modeled")).toEqual(new Subtract(-3, -5));
            expect(parseRecursive("* (4) (-5)", "modeled")).toEqual(new Multiply(4, -5));
            expect(parseRecursive("/ (10) (2)", "modeled")).toEqual(new Divide(10, 2));

        });

        it ("parses recursive unary expressions", () => {
            expect(parseRecursive("ABS (COS (45))", "modeled")).toEqual(new Abs (new Cos(45)));
            expect(parseRecursive("SIN (COS (ABS (-30)))", "modeled")).toEqual(new Sin(new Cos(new Abs(-30))));

        });

        it ("parses recursive binary expressions", () => {
            expect(parseRecursive("+ (- (-5) (3)) (* (9) (10))", "modeled")).toEqual(new Add(new Subtract(-5, 3), new Multiply(9, 10)));
            expect(parseRecursive("/ (* (-1) (2)) (+ (- (3) (-4)) (-5))", "modeled")).toEqual(new Divide(new Multiply(-1, 2), new Add(new Subtract(3, -4), -5)));
        });

        it ("parses complex recursive expressions", () => {
            expect(parseRecursive("ABS (+ (8) (9))", "modeled")).toEqual(new Abs(new Add(8, 9)));
            expect(parseRecursive("+ (ABS (2.25)) (COS (30))", "modeled")).toEqual(new Add(new Abs(2.25), new Cos(30)));
        });


    });
});