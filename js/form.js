/* eslint-disable no-use-before-define */
import './picture-form.js';
import { scaleControlValue,imageUploadPreview} from './picture-form.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');
const hashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const commentsForm = imgUploadForm.querySelector('.text__description');

const pristine = new Pristine(imgUploadForm, {
  classTo:'form_item',
  errorClass: 'form_item--invalid',
  successClass:'form_item--valid',
  errorTextParent:'form_item',
  errorTextTag:'p',
  errorTextClass:'form_error'
});


//функция валидации хэштегов
const validateHashtags = function (value) {
  if (value.length === 0){
    return true;
  }
  const re = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/i;
  const valueHashtags = value.split(' '); // делаем массив из введеных хэштегов
  const set = new Set(valueHashtags).size; //собираем новый массив с неповторяющимися значениями и узнаем длинну массива, чтобы потом сравнить по длине с valueHashtags и узнать повторяются ли хэштеги.
  for (let i=0; i<valueHashtags.length; i++){
    if (!((re.test(valueHashtags[i])) && (valueHashtags.length <= 5) && (set === valueHashtags.length))){
      return false;}
  }
  return true;
};

//функция валидации коменнтария
const validateComment = function (value) {
  if (value.length <= 140){
    return true;
  }else{
    return false;
  }
};

pristine.addValidator(hashtagsInput, validateHashtags, 'Хэштеги заполнены не правильно');
pristine.addValidator(commentsForm, validateComment, 'до 140 символов в комментарии к фотографии');

imgUploadForm.addEventListener('submit', (evt)=>{
  // pristine.validate();
  const valid = pristine.validate();
  if (!valid){
    evt.preventDefault();
  }
});


//отменяем закрытие формы, если фокус на комментарии
commentsForm.addEventListener ('keydown', (evt)=>{
  if (evt.keyCode === 27){
    evt.stopPropagation();
  }
});

//отменяем закрытие формы, если фокус направлен на инпут хэштегов
hashtagsInput.addEventListener ('keydown', (evt)=>{
  if (evt.keyCode === 27){
    evt.stopPropagation();
  }
});

//открываем форму при загрузке фото
uploadFile.addEventListener('change', (evt)=>{
  evt.preventDefault();
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  scaleControlValue.value = '100%';
  imageUploadPreview.style.cssText = 'transform: scale(1)';
});

//закрываем форму при нажатие на крестик
uploadCancel.addEventListener('click', ()=>{
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
});

//закрываем форму при нажатии Esc
document.addEventListener('keydown', (evt)=>{
  if (evt.keyCode === 27){
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadFile.value = '';
  }
});

