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
checkLengthOfString('text', 5);
function getRandomElement(element)
{
  return element[getRandomNumber(0,element.length-1)];
}
export {getRandomElement, getRandomNumber};
