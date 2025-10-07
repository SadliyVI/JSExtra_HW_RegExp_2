import Validator from './validator.js';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // для проверки имени пользователя
  const form = document.querySelector('#username-form');
  const input = document.querySelector('#username');
  const message = document.querySelector('#message');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = input.value.trim();
    const valid = Validator.validateUsername(username);

    message.textContent = valid ? 'Имя пользователя корректно ✅' : 'Имя пользователя не прошло проверку ❌';
    message.style.color = valid ? 'green' : 'red';
  });

  // для нормализации телефона
  const phoneForm = document.querySelector('#phone-form');
  const phoneInput = document.querySelector('#phone');
  const phoneMessage = document.querySelector('#phone-message');
  const copyBtn = document.querySelector('#copy-btn');

  phoneForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const phoneRaw = phoneInput.value;
    const normalized = Validator.normalizePhoneNumber(phoneRaw);

    if (normalized) {
      phoneMessage.textContent = `Нормализованный телефон: ${normalized} ✅`;
      phoneMessage.style.color = 'green';

      copyBtn.style.display = 'inline-block';
      copyBtn.dataset.value = normalized;
    } else {
      phoneMessage.textContent = 'Невозможно нормализовать номер (нет цифр) ❌';
      phoneMessage.style.color = 'red';
      copyBtn.style.display = 'none';
    }
  });

  copyBtn.addEventListener('click', async () => {
    const textToCopy = copyBtn.dataset.value;
    try {
      await navigator.clipboard.writeText(textToCopy);
      copyBtn.textContent = '✅ Скопировано!';
      setTimeout(() => {
        copyBtn.textContent = '📋 Копировать результат';
      }, 1500);
    } catch (err) {
      copyBtn.textContent = '❌ Ошибка копирования';
      console.error('Ошибка копирования:', err);
    }
  });
});
