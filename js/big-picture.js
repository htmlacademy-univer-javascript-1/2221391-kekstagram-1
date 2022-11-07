const bigPicture = document.querySelector('.big-picture');
const body = document.body;
const closeButton = bigPicture.querySelector('#picture-cancel');

const fillComments = (comments)=>{
  const commentsList = bigPicture.querySelector('.social__comments');
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
};

const openPhoto = (phot) =>{
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = phot.url;
  bigPicture.querySelector('.comments-count').textContent = phot.comments.length;
  bigPicture.querySelector('.social__caption').textContent = phot.description;
  bigPicture.querySelector('.likes-count').textContent = phot.likes;
  fillComments(phot.comments);
  closeButton.addEventListener('click', closePhoto);
  document.addEventListener('keydown', closeByEscape);
};
export {openPhoto};
