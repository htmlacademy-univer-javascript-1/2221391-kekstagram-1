import { getRandomElement, getRandomNumber } from './util.js';

const NAMES = ['Анастасия', 'Александр', 'Семён', 'Евгения', 'Наталья', 'Валерий', 'Дарья' ];

const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const DESCRIPTION = ['Балда какая-то пикнула', 'На прогулке', 'Иииииииуууууууу', 'Тут должно быть описание...',
  'Живу жизнь, а вы чем занимаетесь?', 'Отвлекаюсь', 'Посиделки с друзьями', 'ЖОЗЗЗ'];

let idComm = 0;
const createComment = () =>{
  idComm++;
  return{
    id: idComm,
    avatar: `img/avatar${getRandomNumber(0,6)}.svg`,
    message: getRandomElement(MESSAGES),
    name: getRandomElement(NAMES)
  };

};

let idNumber = 0;
const createPhotoDescription = () => {
  idNumber++;
  return {
    id: idNumber,
    url: `photos/${idNumber}.jpg`,
    description: getRandomElement(DESCRIPTION),
    likes: getRandomNumber(15,200),
    comments:  Array.from({length: getRandomNumber(1,10) }, createComment)
  };
};

const arrayPhotos = () => Array.from({length: 25 }, createPhotoDescription);

const MAX_STRING_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;

const ErrorMessage = {
  SEPARETED_BY_SPASES: 'Хэш-теги должны разделяться пробелами',
  START_WITH: 'Хэш-тег должен начинаться с символа #',
  NO_REPEAT: 'Хэш-теги не должны повторяться',
  HASHTAG_MAX_LENTH: `Максимальная длина одного хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая #`,
  MAX_COUNT_HASHTAG: `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэш-тегов`,
  UNACCEPTABLE_SYMBOLS: 'Хэш-тег содержит недопустимые символы',
  COMMENT_MAX_LENGTH: `Максимальная длина комментария ${MAX_STRING_LENGTH} символов`
};
export{arrayPhotos, ErrorMessage, MAX_HASHTAG_COUNT, MAX_HASHTAG_LENGTH, MAX_STRING_LENGTH};
