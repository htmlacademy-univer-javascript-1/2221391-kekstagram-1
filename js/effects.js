import { imgPreview } from './form.js';
import { Effects } from './data.js';

const sliderElement = document.querySelector('.effect-level__slider');
const sliderFile = document.querySelector('.effect-level');
const effectValue = document.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');

const createSlider = () =>{
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 80,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};

const onEffectButtonChange = (evt) => {
  const effectName = evt.target.value;
  if( effectName === 'none') {
    sliderFile.classList.add('hidden');
    imgPreview.style.filter = 'none';
  }
  else{
    sliderFile.classList.remove('hidden');
    imgPreview.removeAttribute('class');
    imgPreview.classList.add(`effects__preview--${effectName}`);
    sliderElement.noUiSlider.updateOptions(Effects[effectName].options);
    sliderElement.noUiSlider.on('update', () => {
      effectValue.value = sliderElement.noUiSlider.get();
      imgPreview.style.filter = `${Effects[effectName].filter}(${effectValue.value}${Effects[effectName].units})`;
    });
  }
};

export{createSlider, onEffectButtonChange, sliderFile, effectList};
