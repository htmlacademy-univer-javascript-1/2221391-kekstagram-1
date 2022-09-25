/**Функция, возвращающая случайное целое число из переданного диапазона включительно. */
function getRandomNumber(firstNumber,secondNumber)
{
  if(firstNumber<0 || firstNumber>=secondNumber)
  {
    throw {name : 'Invalid arguments', message : 'You passed the wrong arguments' };
  }
  return Math.floor(Math.random() * (secondNumber - firstNumber)) + firstNumber;
}
getRandomNumber(12,124);
/**Функция для проверки максимальной длины строки.
 * Будет использоваться для проверки длины введённого комментария, но должна быть универсальна.
 * функция возвращает значение true если строка проходит по длине и false если не проходит */
function checkLengthOfString(varifiableString,maxLength)
{
  return varifiableString.length<maxLength;
}
checkLengthOfString('234567898765432',12);


