import { getData } from './fetchReq.js';
import { createFilters } from './filters.js';
import { openUploadForm } from './form.js';
import { createSlider } from './effects.js';
import { alertError } from './util.js';

getData(
  (photos) => createFilters(photos),
  () => alertError('Не удалось загрузить фотографии. Попробуйте перезагрузить страницу')
);
openUploadForm();
createSlider();
