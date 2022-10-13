import {evaluateUnary, evaluateBinary} from './arrayInput';
import {roundResult} from '../../../utilities';

describe('array input evaluator', () => {
  describe('unary expressions', () => {
    it('evaluates simple unary', () => {
      expect(roundResult(evaluateUnary(['ABS', '-1']))).toEqual(1);
      expect(roundResult(evaluateUnary(['ABS', '456']))).toEqual(456);
      expect(roundResult(evaluateUnary(['ABS', '-562.02']))).toEqual(562.02);
      expect(roundResult(evaluateUnary(['COS', '3']))).toEqual(-0.99);
      expect(roundResult(evaluateUnary(['COS', '0.8']))).toEqual(0.7);
      expect(roundResult(evaluateUnary(['LOG', '0.8']))).toEqual(-0.22);
      expect(roundResult(evaluateUnary(['LOG', '101']))).toEqual(4.62);
      expect(roundResult(evaluateUnary(['CEIL', '1.02']))).toEqual(2);
      expect(roundResult(evaluateUnary(['CEIL', '-4.123']))).toEqual(-4);
      expect(roundResult(evaluateUnary(['FLOOR', '-4.123']))).toEqual(-5);
      expect(roundResult(evaluateUnary(['FLOOR', '2.54']))).toEqual(2);
      expect(roundResult(evaluateUnary(['SIN', '0.5']))).toEqual(0.48);
      expect(roundResult(evaluateUnary(['SIN', '1']))).toEqual(0.84);
      expect(roundResult(evaluateUnary(['ROUND', '4.67']))).toEqual(5);
      expect(roundResult(evaluateUnary(['ROUND', '4.5']))).toEqual(5);
      expect(roundResult(evaluateUnary(['ROUND', '3.23545']))).toEqual(3);
      expect(roundResult(evaluateUnary(['EXP', '3.23545']))).toEqual(25.42);
      expect(roundResult(evaluateUnary(['EXP', '-1.4']))).toEqual(0.25);
    });

    it('evaluates single nested operand', () => {
      expect(roundResult(evaluateUnary(['SIN', ['ABS', '-45']]))).toEqual(0.85);
    });


    it('evaluates recursive nesting operands', () => {
      expect(roundResult(evaluateUnary(['COS', ['SIN', ['ABS', '-45']]]))).toEqual(0.66);
    });
  });

  describe('binary expressions', () => {
    it('evaluates simple binary', () => {
      expect(roundResult(evaluateBinary(['+', '4', '5']))).toEqual(9);
      expect(roundResult(evaluateBinary(['+', '-1', '5']))).toEqual(4);
      expect(roundResult(evaluateBinary(['-', '5', '5']))).toEqual(0);
      expect(roundResult(evaluateBinary(['/', '5', '5']))).toEqual(1);
      expect(roundResult(evaluateBinary(['/', '5', '3']))).toEqual(1.67);
      expect(roundResult(evaluateBinary(['*', '23', '43']))).toEqual(989);
      expect(roundResult(evaluateBinary(['+', '-1', '-1']))).toEqual(-2);
    });

    it('evaluates single nested operand', () => {
      expect(roundResult(evaluateBinary(['+', ['+', '-1', '5'], '5']))).toEqual(9);
      expect(roundResult(evaluateBinary(['+', '4', ['+', '1', '5']]))).toEqual(10);
    });

    it('evaluates double nested operand', () => {
      expect(roundResult(evaluateBinary(['+', ['+', '-1', '5'], ['+', '-1', '5']]))).toEqual(8);
    });

    it('evaluates recursive nesting operands', () => {
      expect(roundResult(evaluateBinary(['+', ['+', '-1', '5'], ['+', '-1', ['+', '-1', '5']]]))).toEqual(7);
      expect(roundResult(evaluateBinary(['+', ['+', '1', '5'], ['+', '3', ['+', '2', ['*', '7', '5']]]]))).toEqual(46);
    });
  });

  describe('complex expressions', () => {
    it('evaluates complex recursive nesting operands', () => {
      expect(roundResult(evaluateBinary(['+', ['+', '4566578', '5'], ['LOG', '0.8']]))).toEqual(4566582.78);
      expect(roundResult(evaluateBinary(['*', ['+', '4566578', '5'], ['LOG', ['*', '2', '5']]]))).toEqual(10514945.94);
      expect(roundResult(evaluateBinary(['*', ['+', '4566578', '5'], ['LOG', ['*', '5', ['COS', '1']]]]))).toEqual(4538322.44);
    });
  });
});

