const templatePicture = document.querySelector('#picture').content;
const newPictureTemplate = templatePicture.querySelector('.picture');
const photosContainer = document.querySelector('.pictures');

const createPhoto = function({url, likes, comments}) {
  const clonedPicture = newPictureTemplate.cloneNode(true);
  clonedPicture.querySelector('.picture__img').src = url;
  clonedPicture.querySelector('.picture__likes').textContent = likes;
  clonedPicture.querySelector('.picture__comments').textContent = comments.length;
  return clonedPicture;
};

const createPhotos = function(photos) {
  const fragment = document.createDocumentFragment();
  for(let i = 0; i<photos.length;i++) {
    fragment.appendChild(createPhoto(photos[i]));
  }
  photosContainer.appendChild(fragment);
};
export{createPhotos};
