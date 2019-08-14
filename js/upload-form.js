'use strict';

(function () {

  var PHOTO_FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var body = document.querySelector('body');
  var form = document.querySelector('.img-upload__form');
  var overlay = form.querySelector('.img-upload__overlay');
  var closeButton = overlay.querySelector('#upload-cancel');
  var previewImg = form.querySelector('.img-upload__preview img');

  var show = function () {
    body.classList.add('modal-open');
    overlay.classList.remove('hidden');

    imageScale.reset();
    closeButton.addEventListener('click', onCloseBtnClick);
    document.addEventListener('keydown', onPreviewEscPress);
  };

  var hide = function () {
    overlay.classList.add('hidden');
    body.classList.remove('modal-open');
    photoLoader.reset();
    effects.reset();

    closeButton.removeEventListener('click', onCloseBtnClick);
    document.removeEventListener('keydown', onPreviewEscPress);
  };

  var onCloseBtnClick = function () {
    hide();
  };

  var onPreviewEscPress = function (evt) {
    window.utils.onEscPress(evt, hide);
  };

  var photoLoader = new window.ImageLoader({
    fileChooser: form.querySelector('#upload-file'),
    dropZone: form.querySelector('.img-upload__control'),
    previewImg: previewImg,
    highlightClass: 'img-upload__control--highlighted',
    fileTypes: PHOTO_FILE_TYPES,
    maxFileSize: 2048, // KB
    defaultImg: 'img/upload-default-image.jpg',
    onFileLoaded: show
  });

  var imageScale = new window.ImageScale({
    element: form.querySelector('.img-upload__scale'),
    minValue: 25,
    maxValue: 100,
    step: 25,
    previewImg: previewImg
  });

  var effects = new window.Effects(form.querySelector('.effects'),
      previewImg,
      form.querySelector('.effect-level'));

})();
