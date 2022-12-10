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
    avatar: `img/avatar-${getRandomNumber(1,6)}.svg`,
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
    comments:  Array.from({length: getRandomNumber(1,25) }, createComment)
  };
};

const arrayPhotos = () => Array.from({length: 25 }, createPhotoDescription);

const MAX_STRING_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;

const ErrorMessage = {
  SEPARETED_BY_SPACES: 'Хэш-теги должны разделяться пробелами',
  START_WITH: 'Хэш-тег должен начинаться с символа #',
  NO_REPEAT: 'Хэш-теги не должны повторяться',
  HASHTAG_MAX_LENTH: `Максимальная длина одного хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая #`,
  MAX_COUNT_HASHTAG: `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэш-тегов`,
  UNACCEPTABLE_SYMBOLS: 'Хэш-тег содержит недопустимые символы',
  COMMENT_MAX_LENGTH: `Максимальная длина комментария ${MAX_STRING_LENGTH} символов`
};
const UPLOAD_COMMENTS_COUNT = 5;
const DEFAULT_COMMENTS_COUNT = 5;
const ScaleImg = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};
const Effects = {
  chrome: {
    filter: 'grayscale',
    units: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    }
  },
  sepia: {
    filter: 'sepia',
    units: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    }
  },
  marvin: {
    filter: 'invert',
    units: '%',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    }
  },
  phobos: {
    filter: 'blur',
    units: 'px',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    }
  },
  heat: {
    filter: 'brightness',
    units: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    }
  }
};
export{arrayPhotos, ErrorMessage, MAX_HASHTAG_COUNT, MAX_HASHTAG_LENGTH, MAX_STRING_LENGTH, DEFAULT_COMMENTS_COUNT,UPLOAD_COMMENTS_COUNT, ScaleImg,Effects};
