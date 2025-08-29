import { describe, expect, test } from 'vitest';
import { add, divide, multiply, substract } from './math.helper';

describe('Test in function add', () => {
  test('should add two pòsitivies numbers', () => {
    //! 1-> Arrange
    const a = 1;
    const b = 5;

    //! 2->Act
    const result = add(a, b);

    //! 3-> Assert
    expect(result).toBe(a + b);
  });
  test('should add two negative numbers', () => {
    //! 1-> Arrange
    const a = -11;
    const b = -0.5;

    //! 2->Act
    const result = add(a, b);

    //! 3-> Assert
    expect(result).toBe(a + b);
  });
});

describe('Test in function substract', () => {

  test('should substract two positivies  numbers', () => {
    const a = 6;
    const b = 6;
    const result = substract(a, b);
    expect(result).toBe(a - b);
  });

  test('should substract two negativies  numbers', () => {
    const a = -6;
    const b = -36;
    const result = substract(a, b);
    expect(result).toBe(a - b);
  });

});


describe('Test in function multiply', () => {

  test('should multiply two positivies numbers', () => {
    const a = 33;
    const b = 55;
    const result = multiply(a, b);
    expect(result).toBe(a * b);
  });

  test('should multiply two negativies numbers', () => {
    const a = -33;
    const b = -5;
    const result = multiply(a, b);
    expect(result).toBe(a * b);
  });

  test('should multiply numbers by 0', () => {
    const a = -33;
    const b = 0;
    const result = multiply(a, b);
    expect(result).toBe(a * b);
  });

  test('should divide  two numbers numbers ', () => {
    const a = -33;
    const b = 0;
    const result = divide(a, b);
    expect(result).toBe(a / b);
  });



});










