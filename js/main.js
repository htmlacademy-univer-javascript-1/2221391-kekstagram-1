import { getData } from './fetchReq.js';
import{ createPhotos } from './render.js';
import { openUploadForm } from './form.js';
import { createSlider } from './effects.js';
import { alertError } from './util.js';

getData(
  (photos) => createPhotos(photos),
  () => alertError('Не удалось загрузить фотографии. Попробуйте перезагрузить страницу')
);
openUploadForm();
createSlider();
