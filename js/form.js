import { checkLengthOfString, showError, showSuccess } from './util.js';
import { ErrorMessage, MAX_HASHTAG_COUNT, MAX_HASHTAG_LENGTH, MAX_STRING_LENGTH, ScaleImg, FILE_TYPES } from './data.js';
import { onScaleButtonClick, scaleContainer } from './photo-scale.js';
import { effectList, onEffectButtonChange, sliderFile } from './effects.js';
import { sendData } from './fetchReq.js';

const body = document.querySelector('body');
const imgUploadField = document.querySelector('#upload-file');
const submitButton = document.querySelector('#upload-submit');
const editPicture = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const closeButton = document.querySelector('.img-upload__cancel');
const hashtagsText = document.querySelector('.text__hashtags');
const commentsText = document.querySelector('.text__description');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const closePopup = () => {
  editPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  scaleContainer.removeEventListener('click', onScaleButtonClick);
  effectList.removeEventListener('change', onEffectButtonChange);
};
const closePopupAndClearForm = () =>{
  closePopup();
  imgPreview.removeAttribute('class');
  imgPreview.removeAttribute('style');
  imgPreview.style.transform = `scale(${ScaleImg.MAX / 100})`;
  form.reset();
};

const onEscKeydown = (evt) =>{
  if(evt.key === 'Escape') {
    closePopupAndClearForm();
    document.removeEventListener('keydown', onEscKeydown);
  }
};

const onCloseButtonClick = () =>{
  closePopupAndClearForm();
  document.removeEventListener('keydown', onEscKeydown);
};

const addFocusListeners = (field) => {
  field.addEventListener('focus', () => {
    document.removeEventListener('keydown', onEscKeydown);
  });
  field.addEventListener('blur', () => {
    document.addEventListener('keydown', onEscKeydown);
  });
};

const buttonAvailability = () => {
  submitButton.disabled = !pristine.validate();
};
const doActionWithClassHidden = () => imgPreview.hasAttribute('class') ? sliderFile.classList.remove('hidden') : sliderFile.classList.add('hidden');

const uploadPhoto = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
};
const onImgUploadFieldChange = () => {
  editPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseButtonClick );
  document.addEventListener('keydown', onEscKeydown);
  doActionWithClassHidden();
  scaleContainer.addEventListener('click', onScaleButtonClick);
  effectList.addEventListener('change', onEffectButtonChange);
  addFocusListeners(hashtagsText);
  addFocusListeners(commentsText);
  buttonAvailability();
};

const uniqueHashtags = (hashtags) => {
  const uniqueSet = new Set(hashtags);
  return hashtags.length === uniqueSet.size;
};

let errorMessage = '';

const error = () => errorMessage;

const hashtagsHandler = (text) => {
  errorMessage = '';

  const inputText = text.toLowerCase().trim();

  if(!inputText) {
    return true;
  }

  const inputHashtags = inputText.split(/\s+/);

  if(inputHashtags.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputHashtags.some((item) => item.indexOf('#', 1) >= 1),
      error: ErrorMessage.SEPARETED_BY_SPACES,
    },

    {
      check: inputHashtags.length > MAX_HASHTAG_COUNT,
      error: ErrorMessage.MAX_COUNT_HASHTAG,
    },

    {
      check: inputHashtags.some((item) => item[0] !== '#'),
      error: ErrorMessage.START_WITH,
    },

    {
      check: inputHashtags.some((item) => item.length > MAX_HASHTAG_LENGTH),
      error: ErrorMessage.HASHTAG_MAX_LENTH,
    },

    {
      check: inputHashtags.some((item) => !/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(item)),
      error: ErrorMessage.UNACCEPTABLE_SYMBOLS,
    },

    {
      check: !uniqueHashtags(inputHashtags),
      error: ErrorMessage.NO_REPEAT,
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if(isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const commentHandler = (text) => {
  errorMessage = '';

  const inputText = text.trim();

  if(!inputText) {
    return true;
  }

  const rule = {
    check: !checkLengthOfString(inputText, MAX_STRING_LENGTH),
    error: ErrorMessage.COMMENT_MAX_LENGTH,
  };

  const isInvalid = rule.check;
  if(isInvalid) {
    errorMessage = rule.error;
  }
  return !isInvalid;
};

const validateForm = () => {
  pristine.addValidator(hashtagsText, hashtagsHandler, error);
  pristine.addValidator(commentsText, commentHandler, error);
  buttonAvailability();
};

const onHashtagInput = () => buttonAvailability();

const onCommentInput = () => buttonAvailability();

const sendForm = (onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitButton.disabled = true;
    sendData(
      () => {
        onSuccess();
        showSuccess();
      },
      () => {
        onError();
        showError();
      },
      new FormData(form),
    );
  });
};

const openUploadForm = () => {
  imgUploadField.addEventListener('change', onImgUploadFieldChange);
  imgUploadField.addEventListener('change', uploadPhoto);
  hashtagsText.addEventListener('input', onHashtagInput);
  commentsText.addEventListener('input', onCommentInput);
  sendForm(closePopupAndClearForm, closePopup);
  validateForm(closePopupAndClearForm,closePopup);
};

export { openUploadForm, imgPreview };
