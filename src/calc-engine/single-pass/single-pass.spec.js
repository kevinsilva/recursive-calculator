import singlePassEvaluator from "./single-pass.js";
import { roundResult } from "../../utilities.js";

describe("single pass evaluator", () => {
  describe("parses and evaluates unary expressions", () => {
    it("parses and evaluates simple unary expressions", () => {
      expect(singlePassEvaluator("ABS (-1)")).toEqual(1);
      expect(singlePassEvaluator("ABS (-562.02)")).toEqual(562.02);
      expect(roundResult(singlePassEvaluator("COS (3)"))).toEqual(-0.99);
      expect(roundResult(singlePassEvaluator("COS (0.8)"))).toEqual(0.7);
      expect(roundResult(singlePassEvaluator("LOG (0.8)"))).toEqual(-0.22);
      expect(roundResult(singlePassEvaluator("LOG (101)"))).toEqual(4.62);
      expect(roundResult(singlePassEvaluator("CEIL (1.02)"))).toEqual(2);
      expect(roundResult(singlePassEvaluator("CEIL (-4.123)"))).toEqual(-4);
      expect(roundResult(singlePassEvaluator("FLOOR (-4.123)"))).toEqual(-5);
      expect(roundResult(singlePassEvaluator("FLOOR (2.54)"))).toEqual(2);
      expect(roundResult(singlePassEvaluator("SIN (0.5)"))).toEqual(0.48);
      expect(roundResult(singlePassEvaluator("SIN (1)"))).toEqual(0.84);
      expect(roundResult(singlePassEvaluator("ROUND (4.67)"))).toEqual(5);
      expect(roundResult(singlePassEvaluator("ROUND (4.5)"))).toEqual(5);
      expect(roundResult(singlePassEvaluator("EXP (3.23545)"))).toEqual(25.42);
      expect(roundResult(singlePassEvaluator("EXP (-1.4)"))).toEqual(0.25);
    });

    it("parses and evaluates single nested operands", () => {
      expect(roundResult(singlePassEvaluator("SIN (ABS (-45))"))).toEqual(0.85);
    });

    it("parses and evaluated recursive nesting operands", () => {
      expect(singlePassEvaluator("COS (SIN (ABS (-45)))")).toEqual(
        Math.cos(Math.sin(45))
      );
    });
  });

  describe("parses and evaluates binary expressions", () => {
    it("parses and evaluates simple binary expressions", () => {
      expect(singlePassEvaluator("+ (4) (5)")).toEqual(9);
      expect(singlePassEvaluator("+ (-1) (5)")).toEqual(4);
      expect(singlePassEvaluator("- (5) (5)")).toEqual(0);
      expect(singlePassEvaluator("/ (5) (5)")).toEqual(1);
      expect(roundResult(singlePassEvaluator("/ (5) (3)"))).toEqual(1.67);
      expect(roundResult(singlePassEvaluator("* (23) (43)"))).toEqual(989);
      expect(singlePassEvaluator("+ (-1) (-1)")).toEqual(-2);
    });

    it("parses and evaluates single nested operands", () => {
      expect(singlePassEvaluator("+ (+ (-1) (5)) (5)")).toEqual(9);
      expect(singlePassEvaluator("+ (4) (+ (1) (5))")).toEqual(10);
    });

    it("parses and evaluates recursive nesting operands", () => {
      expect(singlePassEvaluator("+ (+ (-1) (5)) (- (10) (8))")).toEqual(6);
    });
  });
});
