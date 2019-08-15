'use strict';

(function () {

  var PhotoLoader = {
    FILE_TYPES: ['jpg', 'jpeg', 'png'],
    MAX_FILE_SIZE: 2048 // KB
  };

  var ImageScale = {
    MIN_VALUE: 25,
    MAX_VALUE: 100,
    STEP: 25
  };

  var body = document.querySelector('body');
  var form = document.querySelector('.img-upload__form');
  var overlay = form.querySelector('.img-upload__overlay');
  var closeButton = overlay.querySelector('#upload-cancel');
  var previewImg = form.querySelector('.img-upload__preview img');
  var photoLoader;
  var imageScale;
  var effects;

  var show = function () {
    body.classList.add('modal-open');
    overlay.classList.remove('hidden');
    overlay.focus();

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

  window.uploadForm = {
    init: function () {
      photoLoader = new window.ImageLoader({
        fileChooser: form.querySelector('#upload-file'),
        dropZone: form.querySelector('.img-upload__control'),
        previewImg: previewImg,
        highlightClass: 'img-upload__control--highlighted',
        fileTypes: PhotoLoader.FILE_TYPES,
        maxFileSize: PhotoLoader.MAX_FILE_SIZE,
        defaultImg: 'img/upload-default-image.jpg',
        onFileLoaded: show
      });

      imageScale = new window.ImageScale({
        element: form.querySelector('.img-upload__scale'),
        minValue: ImageScale.MIN_VALUE,
        maxValue: ImageScale.MAX_VALUE,
        step: ImageScale.STEP,
        previewImg: previewImg
      });

      effects = new window.Effects(form.querySelector('.effects'),
          previewImg,
          form.querySelector('.effect-level'));
    }
  };

})();
