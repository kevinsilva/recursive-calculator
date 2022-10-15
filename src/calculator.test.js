import {calculator} from './calculator.js';

describe('Recursive Calculator', () => {
  it.each([
    {in: 'CE 0.53', out: 0.53},
    {in: 'CE 3.14159', out: 3.14},
    {in: 'CE 56723', out: 56723},
    {in: 'CE 56723.01', out: 56723.01},
    {in: 'CE 0.000001', out: 0},
    {in: 'CE 0.01', out: 0.01},
    {in: 'CE 0.555', out: 0.56},
    {in: 'CE a', out: 'Expressão mal definida.'},
    {in: 'CE (1', out: 'Expressão mal definida.'},
    {in: 'S', out: 'Aplicação terminada. Até à próxima.'},
  ])('Test N1: $in', (testCase) => {
    expect(calculator.runCommand(testCase.in)).toBe(testCase.out);
  });

  it.each([
    {in: 'CE ABS (-1)', out: 1},
    {in: 'CE ABS (456)', out: 456},
    {in: 'CE ABS (-562.02)', out: 562.02},
    {in: 'CE COS (3)', out: -0.99},
    {in: 'CE COS (0.8)', out: 0.7},
    {in: 'CE LOG (0.8)', out: -0.22},
    {in: 'CE LOG (101)', out: 4.62},
    {in: 'CE CEIL (1.02)', out: 2},
    {in: 'CE CEIL (-4.123)', out: -4},
    {in: 'CE FLOOR (-4.123)', out: -5},
    {in: 'CE FLOOR (2.54)', out: 2},
    {in: 'CE SIN (0.5)', out: 0.48},
    {in: 'CE SIN (1)', out: 0.84},
    {in: 'CE ROUND (4.67)', out: 5},
    {in: 'CE ROUND (4.5)', out: 5},
    {in: 'CE ROUND (3.23545)', out: 3},
    {in: 'CE EXP (3.23545)', out: 25.42},
    {in: 'CE EXP (-1.4)', out: 0.25},
    {in: 'CE EXP (-1.4', out: 'Expressão mal definida.'},
    {in: 'CE EXP (', out: 'Expressão mal definida.'},
    {in: 'CE BI (17)', out: 'Expressão mal definida.'},
    {in: 'S', out: 'Aplicação terminada. Até à próxima.'},
  ])('Test N2: $in', (testCase) => {
    expect(calculator.runCommand(testCase.in)).toBe(testCase.out);
  });

  it.each([
    {in: 'CE + (4) (5)', out: 9},
    {in: 'CE + (-1) (5)', out: 4},
    {in: 'CE - (5) (5)', out: 0},
    {in: 'CE / (5) (5)', out: 1},
    {in: 'CE / (5) (3)', out: 1.67},
    {in: 'CE * (23) (43)', out: 989},
    {in: 'CE + (-1) (-1)', out: -2},
    {in: 'CE ~ (-1) (-1)', out: 'Expressão mal definida.'},
    {in: 'CE * (-1 (-1)', out: 'Expressão mal definida.'},
    {in: 'CE * -1 (-1)', out: 'Expressão mal definida.'},
    {in: 'CE / -1456787654 -1)', out: 'Expressão mal definida.'},
    {in: 'CE + -1 -1', out: 'Expressão mal definida.'},
    {in: 'CE * (780982) 754', out: 'Expressão mal definida.'},
    {in: 'S', out: 'Aplicação terminada. Até à próxima.'},
  ])('Test N3: $in', (testCase) => {
    expect(calculator.runCommand(testCase.in)).toBe(testCase.out);
  });

  it.each([
    {in: 'CE + (+ (-1) (5)) (5)', out: 9},
    {in: 'CE + (+ (-1) (5)) (+ (-1) (5))', out: 8},
    {in: 'CE + (+ (-1) (5)) (+ (-1) (+ (-1) (5)))', out: 7},
    {in: 'CE + (+ (1) (5)) (+ (3) (+ (2) (* (7) (5))))', out: 46},
    {in: 'CE / (* (* (2) (5)) (5)) (+ (3) (/ (2) (* (7) (5))))', out: 16.36},
    {in: 'CE / (* (* (2) (5)) (5)) (+ (3) (/ (2) (* (7) (5)))', out: 'Expressão mal definida.'},
    {in: 'CE / (* (* (2) (5) (5)) (+ (3) (/ (2) (* (7) (5))))', out: 'Expressão mal definida.'},
    {in: 'S', out: 'Aplicação terminada. Até à próxima.'},
  ])('Test N4: $in', (testCase) => {
    expect(calculator.runCommand(testCase.in)).toBe(testCase.out);
  });

  it.each([
    {in: 'CE + (+ (4566578) (5)) (LOG (0.8))', out: 4566582.78},
    {in: 'CE * (+ (4566578) (5)) (LOG (* (2) (5)))', out: 10514945.94},
    {in: 'CE * (+ (4566578) (5)) (LOG (* (5) (COS (1))))', out: 4538322.44},
    {in: 'CE * (+ (4566578) (5)) (LOG (* (+ (+ (1) (5)) (+ (3) (+ (2) (* (7) (5))))) (COS (1))))', out: 14672499.34},
    {in: 'CE * (+ (* (+ (4566578) (5)) (LOG (* (+ (+ (1) (5)) (+ (3) (+ (2) (* (7) (5))))) (COS (1))))) (5)) (LOG (* (+ (+ (1) (5)) (+ (3) (+ (2) (* (7) (5))))) (COS (1))))', out: 47142975.45},
    {in: 'CE * (+ (* (+ (4566578) (5)) (LOG (* (+ (+ (1) (5)) (+ (3) (+ (2) (* (7) (5))))) (COS (1))))) (5)) (LOG (* (+ (+ (1) (5)) (+ (3) (+ (2) (* (7) (5))))) (COS (1)))', out: 'Expressão mal definida.'},
    {in: 'S', out: 'Aplicação terminada. Até à próxima.'},
  ])('Test N5: $in', (testCase) => {
    expect(calculator.runCommand(testCase.in)).toBe(testCase.out);
  });


  it.each([
    {in: 'LM', out: 'Calculadora sem memorias.'},
    {in: 'AM memory_1', out: 'Memoria criada com o nome: memory_1'},
    {in: 'CE + (4) (5)', out: 9},
    {in: 'AVM memory_1', out: 'memory_1: 9.00'},
    {in: 'CE + (memory_1) (5)', out: 14},
    {in: 'AVM memory_2', out: 'Memoria nao existente.'},
    {in: 'AM memory_2', out: 'Memoria criada com o nome: memory_2'},
    {in: 'LM', out: 'memory_1: 9.00; memory_2: 0.00'},
    {in: 'AVM memory_2', out: 'memory_2: 14.00'},
    {in: 'CE + (9) (EXP (/ (14) (9)))', out: 13.74},
    {in: 'CE + (memory_1) (EXP (/ (memory_2) (memory_1)))', out: 13.74},
    {in: 'S', out: 'Aplicação terminada. Até à próxima.'},
  ])('Test N6: $in', (testCase) => {
    expect(calculator.runCommand(testCase.in)).toBe(testCase.out);
  });
});
