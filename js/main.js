import { arrayPhotos } from './data.js';
import{ createPhotos } from './render.js';
import { openUploadForm } from './form.js';
import { createSlider } from './effects.js';

const arr = arrayPhotos();
createPhotos(arr);
openUploadForm();
createSlider();
