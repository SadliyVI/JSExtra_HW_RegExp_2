// __tests__/phone.test.js
import Validator from '../src/validator.js';

describe('Validator.normalizePhoneNumber', () => {
  test('Россия: номер с 8 -> +7', () => {
    expect(Validator.normalizePhoneNumber('8 (927) 000-00-00')).toBe('+79270000000');
    expect(Validator.normalizePhoneNumber('89270000000')).toBe('+79270000000');
  });

  test('Россия: с +7 -> +7...', () => {
    expect(Validator.normalizePhoneNumber('+7 960 000 00 00')).toBe('+79600000000');
    expect(Validator.normalizePhoneNumber('+7(960)0000000')).toBe('+79600000000');
  });

  test('Китай и другие страны: сохраняем ведущий +', () => {
    expect(Validator.normalizePhoneNumber('+86 000 000 0000')).toBe('+860000000000');
    expect(Validator.normalizePhoneNumber('+1 (800) 123-4567')).toBe('+18001234567');
  });

  test('Без плюса, не Россия -> просто +digits', () => {
    expect(Validator.normalizePhoneNumber('18001234567')).toBe('+18001234567');
  });

  test('пустая строка, нестрока, буквы -> null', () => {
    expect(Validator.normalizePhoneNumber('')).toBeNull();
    expect(Validator.normalizePhoneNumber('abc')).toBeNull();
    expect(Validator.normalizePhoneNumber(null)).toBeNull();
    expect(Validator.normalizePhoneNumber(undefined)).toBeNull();
  });

  test('Россия: номер 11 цифр, начинается с 7 без +', () => {
    expect(Validator.normalizePhoneNumber('79270000000')).toBe('+79270000000');
  });
});
