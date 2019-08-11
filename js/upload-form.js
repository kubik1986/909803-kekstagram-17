'use strict';

(function () {

  var PHOTO_FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var body = document.querySelector('body');
  var form = document.querySelector('.img-upload__form');
  var overlay = form.querySelector('.img-upload__overlay');

  var showForm = function () {
    body.classList.add('modal-open');
    overlay.classList.remove('hidden');
  };

  var photoLoader = new window.ImageLoader({
    fileChooser: form.querySelector('#upload-file'),
    dropZone: form.querySelector('.img-upload__control'),
    preview: form.querySelector('.img-upload__preview'),
    highlightClass: 'img-upload__control--highlighted',
    fileTypes: PHOTO_FILE_TYPES,
    maxFileSize: 2048, // KB
    defaultImg: 'img/upload-default-image.jpg',
    onFileLoaded: showForm
  });

})();
