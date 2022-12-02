import { DEFAULT_COMMENTS_COUNT, UPLOAD_COMMENTS_COUNT } from './data.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.body;
const closeButton = bigPicture.querySelector('#picture-cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const uploadCommentsButton = document.querySelector('.comments-loader');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');

let currentPhotoComments;

const updateCommentsCount = () => {
  const currentCommentsCount = commentsList.children.length;
  if(currentCommentsCount === currentPhotoComments.length) {
    uploadCommentsButton.classList.add('hidden');
  }
  else{
    uploadCommentsButton.classList.remove('hidden');
  }
  socialCommentCount.innerHTML = '';
  socialCommentCount.insertAdjacentHTML('beforeend', `${currentCommentsCount} из <span class = 'comments-count'>${currentPhotoComments.length}</span> комментариев`);
};

const fillComments = (comments)=>{
  const commentTemplate = bigPicture.querySelector('.social__comment');
  const fragment = document.createDocumentFragment();
  comments.forEach((comment)=>{
    const cloneComment = commentTemplate.cloneNode(true);
    const image = cloneComment.querySelector('.social__picture');
    image.src = comment.avatar;
    image.alt = comment.name;
    cloneComment.querySelector('.social__text').textContent = comment.message;
    fragment.appendChild(cloneComment);
  });
  commentsList.innerHTML = '';
  commentsList.append(fragment);
  updateCommentsCount();
};

const uploadMoreComments = () =>{
  const currentComments = commentsList.children.length;
  fillComments(currentPhotoComments.slice(0, currentComments + UPLOAD_COMMENTS_COUNT));
};

const closeByEscape = (evt)=> {
  if (evt.key === 'Escape'){
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', closeByEscape);
  }
};
const closePhoto = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', closeByEscape);
  uploadCommentsButton.removeEventListener('click', fillComments);
};

const openPhoto = (phot) =>{
  currentPhotoComments = phot.comments;
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = phot.url;
  bigPicture.querySelector('.comments-count').textContent = phot.comments.length;
  bigPicture.querySelector('.social__caption').textContent = phot.description;
  bigPicture.querySelector('.likes-count').textContent = phot.likes;
  fillComments(currentPhotoComments.slice(0, DEFAULT_COMMENTS_COUNT));
  closeButton.addEventListener('click', closePhoto);
  document.addEventListener('keydown', closeByEscape);
  uploadCommentsButton.addEventListener('click', uploadMoreComments);
};
export {openPhoto};
