const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const showSuccess = () => {
  const success = successTemplate.cloneNode(true);

  const closeModal = (evt) => {
    if (evt.key === 'Escape') {
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', closeModal);
      document.querySelector('.success').remove();
    } else if (evt.type === 'click') {
      const successInner = evt.target.closest('.success__inner');
      const successButton = evt.target.closest('.success__button');

      if ((successInner && successButton) || (!successInner && !successButton)) {
        document.removeEventListener('click', closeModal);
        document.removeEventListener('keydown', closeModal);
        document.querySelector('.success').remove();
      }
    }
  };

  document.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
  document.body.append(success);
};

const showError = () => {
  const error = errorTemplate.cloneNode(true);

  const closeModal = (evt) => {
    if (evt.key === 'Escape') {
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', closeModal);
      document.querySelector('.error').remove();
    } else if (evt.type === 'click') {
      const errorInner = evt.target.closest('.error__inner');
      const errorButton = evt.target.closest('.error__button');

      if ((errorInner && errorButton) || (!errorInner && !errorButton)) {
        document.removeEventListener('click', closeModal);
        document.removeEventListener('keydown', closeModal);
        document.querySelector('.error').remove();
      }
    }
  };

  document.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
  document.body.append(error);
};

function getRandomNumber(firstNumber,secondNumber)
{
  if(firstNumber<0 || firstNumber>=secondNumber)
  {
    throw {name : 'Invalid arguments', message : 'You passed the wrong arguments' };
  }
  return Math.floor(Math.random() * (secondNumber - firstNumber)) + firstNumber;
}
/**Функция для проверки максимальной длины строки.
 * Будет использоваться для проверки длины введённого комментария, но должна быть универсальна.
 * функция возвращает значение true если строка проходит по длине и false если не проходит */
function checkLengthOfString(varifiableString,maxLength)
{
  return varifiableString.length<maxLength;
}
checkLengthOfString('text',5);
function getRandomElement(element)
{
  return element[getRandomNumber(0,element.length-1)];
}

const alertError =(message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => alertContainer.remove(), 5000);
};

export {getRandomElement, getRandomNumber, checkLengthOfString, alertError, showSuccess, showError};
