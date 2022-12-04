import { imgPreview } from './form.js';
import { ScaleImg } from './data.js';

const currentScaleValue = document.querySelector('.scale__control--value');
const scaleContainer = document.querySelector('.img-upload__scale');

const onScaleButtonClick = (evt) => {
  const currentScale = Number.parseInt(currentScaleValue.value , 10);
  const buttonScale = evt.target;
  let scaleValue;

  if(buttonScale.classList.contains('scale__control--bigger')) {
    scaleValue = Math.min(currentScale + ScaleImg.STEP , ScaleImg.MAX);
    currentScaleValue.value = `${scaleValue}%`;
  }
  else if(buttonScale.classList.contains('scale__control--smaller')) {
    scaleValue = Math.max(currentScale -ScaleImg.STEP, ScaleImg.MIN);
    currentScaleValue.value = `${scaleValue}%`;
  }
  else {
    return;
  }
  imgPreview.style.transform = `scale(${scaleValue / 100})`;
};
export{onScaleButtonClick,scaleContainer};

