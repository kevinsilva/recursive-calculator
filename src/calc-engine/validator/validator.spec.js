import {validator, orderValidator} from './validator.js';

describe('validator', () => {
  it('returns true if the expression has balanced parentheses', () => {
    expect(validator('SIN (21)')).toBe(true);
    expect(validator('+ (3) (2)')).toBe(true);
  });

  it('returns false if the expression has unbalanced parentheses', () => {
    expect(validator('(+ (3) (2)')).toBe(false);
    expect(validator('+ (3) (2))')).toBe(false);
  });

  it('returns false if the order is not correct', () => {
    expect(validator('SIN )21(')).toBe(false);
    expect(validator('+ (3) )2)')).toBe(false);
  });

  it('returns true if an expression has 4 parentheses for each binary operation, false otherwise', () => {
    expect(validator('+ (+ (-1) (5)) (5)')).toBe(true);
    expect(validator('+ -1 -1')).toBe(false);
  });

  it('returns true if an expression has 2 parentheses for each unary operation, false otherwise', () => {
    expect(validator('EXP (-1.4)')).toBe(true);
    expect(validator('LOG (-5.1')).toBe(false);
  });

  it('returns true if either a number or an operator follows open parens, false otherwise', () => {
    expect(validator('COS (-1.4)')).toBe(true);
    expect(validator('* (-1.4) (2)')).toBe(true);
    expect(validator('* (-1.4) (a2)')).toBe(false);
    expect(validator('* (780982) ()754')).toBe(false);
  });

  it('returns true if only a parens follows close parens, false otherwise', () => {
    expect(validator('COS (-1.4)')).toBe(true);
    expect(validator('+ (780982) + (754)')).toBe(false);
    expect(validator('* (780982) 754')).toBe(false);
    expect(orderValidator('* (780982) 754')).toBe(false);
    expect(orderValidator('* (780982) + (754)')).toBe(false);
  });
});
