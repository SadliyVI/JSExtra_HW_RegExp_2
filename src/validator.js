export default class Validator {
  static validateUsername(username) {
    // Только латиница, цифры, -, _
    if (!/^[a-zA-Z0-9-_]+$/.test(username)) {
      return false;
    }

    // Не начинается с цифры, _ или -
    if (/^[\d_-]/.test(username)) {
      return false;
    }

    // Не заканчивается _ или -
    if (/[_-]$/.test(username)) {
      return false;
    }

    // Не более трёх цифр подряд
    if (/\d{4,}/.test(username)) {
      return false;
    }

    return true;
  }

  static normalizePhoneNumber(input) {
    if (typeof input !== 'string') {
      return null;
    }
    const trimmed = input.trim();
    if (trimmed === '') {
      return null;
    }

    const hasPlus = trimmed.startsWith('+');
    const digits = trimmed.replace(/\D/g, '');
    if (digits.length === 0) {
      return null;
    }

    if (hasPlus) {
      return `+${digits}`;
    }

    // Нет +
    if (digits.length === 11 && digits.startsWith('8')) {
      // российский формат с 8 -> заменить на +7
      return `+7${digits.slice(1)}`;
    }

    if (digits.length === 11 && digits.startsWith('7')) {
      return `+${digits}`;
    }

    // Универсальный fallback — международный формат без + в вводе
    return `+${digits}`;
  }
}
