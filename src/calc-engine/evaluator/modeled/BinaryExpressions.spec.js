import {roundResult} from '../../../utilities.js';
import {Add, Multiply, Subtract, Divide} from './BinaryExpressions.js';
import {Log} from './UnaryExpressions.js';


describe('binary expressions evaluator', () => {
  it('evaluates add expression', () => {
    expect(new Add('4', '5').result).toEqual(9);
    expect(new Add('-1', '5').result).toEqual(4);
    expect(new Add('-1', '-1').result).toEqual(-2);
  });

  it('evaluates subtract expression', () => {
    expect(new Subtract(5, 5).result).toEqual(0);
  });

  it('evaluates multiply expression', () => {
    expect(new Multiply(23, 43).result).toEqual(989);
  });

  it('evaluates divide expression', () => {
    expect(new Divide(5, 5).result).toEqual(1);
    expect(roundResult(new Divide(5, 3).result)).toEqual(1.67);
  });

  it('can have other binary expressions as operands', () => {
    expect(new Add(new Add(-1, 5), 5).result).toEqual(9);
    expect(new Add(new Add(-1, 5), new Add(-1, 5)).result).toEqual(8);
  });

  it('can have other unary expressions as operands', () => {
    expect(roundResult(new Add(new Add(4566578, 5), new Log(0.8)).result)).toEqual(4566582.78);
    expect(roundResult(new Multiply(new Add(4566578, 5), new Log(new Multiply(2, 5))).result)).toEqual(10514945.94);
  });
});
