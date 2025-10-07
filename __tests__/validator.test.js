import Validator from '../src/validator.js';

describe('Validator.validateUsername', () => {
  test('валидное имя', () => {
    expect(Validator.validateUsername('User_123')).toBe(true);
    expect(Validator.validateUsername('John-Doe')).toBe(true);
    expect(Validator.validateUsername('Abc1_def')).toBe(true);
  });

  test('начинается с цифры', () => {
    expect(Validator.validateUsername('1abc')).toBe(false);
  });

  test('заканчивается тире', () => {
    expect(Validator.validateUsername('abc-')).toBe(false);
  });

  test('содержит недопустимые символы', () => {
    expect(Validator.validateUsername('abc!def')).toBe(false);
    expect(Validator.validateUsername('абвгд')).toBe(false);
  });

  test('содержит более трёх цифр подряд', () => {
    expect(Validator.validateUsername('abc1234def')).toBe(false);
  });

  test('начинается с подчёркивания', () => {
    expect(Validator.validateUsername('_abc')).toBe(false);
  });

  test('пустая строка', () => {
    expect(Validator.validateUsername('')).toBe(false);
  });
});
