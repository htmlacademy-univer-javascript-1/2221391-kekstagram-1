import { arrayPhotos } from './data.js';
import{ createPhotos } from './render.js';
import { openUploadForm } from './form.js';

const arr = arrayPhotos();
createPhotos(arr);
openUploadForm();
