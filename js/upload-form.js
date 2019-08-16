'use strict';

(function () {

  var PhotoLoader = {
    FILE_TYPES: ['jpg', 'jpeg', 'png'],
    MAX_FILE_SIZE: 2048 // KB
  };

  var ImageScale = {
    MIN_VALUE: 25,
    MAX_VALUE: 100,
    STEP: 25,
    DEFAULT_VALUE: 100
  };

  var Hashtag = {
    MAX_AMOUNT: 5,
    MAX_LENGTH: 20
  };

  var Description = {
    MAX_LENGTH: 140
  };

  var body = document.querySelector('body');
  var form = document.querySelector('.img-upload__form');
  var overlay = form.querySelector('.img-upload__overlay');
  var closeButton = overlay.querySelector('#upload-cancel');
  var previewImg = form.querySelector('.img-upload__preview img');
  var hashtagsField = form.querySelector('.text__hashtags');
  var descriptionField = form.querySelector('.text__description');
  var submitBtn = form.querySelector('.img-upload__submit');
  var notFileFields = form.querySelectorAll('input:not([type="file"]), textarea');
  var photoLoader;
  var imageScale;
  var effects;

  var show = function () {
    body.classList.add('modal-open');
    overlay.classList.remove('hidden');
    overlay.focus();

    closeButton.addEventListener('click', onCloseBtnClick);
    document.addEventListener('keydown', onPreviewEscPress);
  };

  var hide = function () {
    overlay.classList.add('hidden');
    body.classList.remove('modal-open');
    photoLoader.reset();
    imageScale.reset();
    effects.reset();
    hashtagsField.value = '';
    descriptionField.value = '';

    closeButton.removeEventListener('click', onCloseBtnClick);
    document.removeEventListener('keydown', onPreviewEscPress);
  };

  var validateHahtags = function () {
    var value = hashtagsField.value.trim();

    if (value === '') {
      hashtagsField.value = '';
      hashtagsField.setCustomValidity('');
      return true;
    }

    var hashtags = value
      .split(/\s+/)
      .map(function (hashtag) {
        return hashtag.toLowerCase();
      })
      .sort();

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];

      if (hashtag[0] !== '#') {
        hashtagsField.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
        return false;
      }

      if (hashtag === '#') {
        hashtagsField.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
        return false;
      }

      if (hashtag.indexOf('#', 1) !== -1) {
        hashtagsField.setCustomValidity('Хэш-теги должны разделяться пробелами');
        return false;
      }

      if (i < hashtags.length - 1 && hashtag === hashtags[i + 1]) {
        hashtagsField.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        return false;
      }

      if (hashtag.length > Hashtag.MAX_LENGTH) {
        hashtagsField.setCustomValidity('Максимальная длина одного хэш-тега ' + Hashtag.MAX_LENGTH + ' символов, включая решётку');
        return false;
      }
    }

    if (hashtags.length > Hashtag.MAX_AMOUNT) {
      hashtagsField.setCustomValidity('Нельзя указать больше ' + Hashtag.MAX_AMOUNT + ' хэш-тегов');
      return false;
    }

    hashtagsField.setCustomValidity('');
    return true;
  };

  var setFormData = function () {
    var formData = new FormData();

    notFileFields.forEach(function (field) {
      if ((field.type !== 'radio' && field.type !== 'checkbox') || field.checked) {
        formData.append(field.name, field.value);
      }
    });

    var imageFile = photoLoader.getFiles();
    if (imageFile.length > 0) {
      formData.append('filename', imageFile[0], imageFile[0].name);
    }

    return formData;
  };

  var upload = function () {
    submitBtn.disabled = true;
    window.backend.save(setFormData(), onSubmitSuccess, onSubmitError);
  };

  var onCloseBtnClick = function () {
    hide();
  };

  var onPreviewEscPress = function (evt) {
    window.utils.onEscPress(evt, hide);
  };

  var onDescriptionFieldFocus = function () {
    document.removeEventListener('keydown', onPreviewEscPress);
  };

  var onDescriptionFieldBlur = function () {
    document.addEventListener('keydown', onPreviewEscPress);
  };

  var onHashtagsFieldFocus = function () {
    document.removeEventListener('keydown', onPreviewEscPress);
  };

  var onHashtagsFieldBlur = function () {
    document.addEventListener('keydown', onPreviewEscPress);
  };

  var onHashtagsFieldChange = function () {
    validateHahtags();
  };

  var onSubmitSuccess = function () {
    window.alerts.showSuccess('Изображение успешно загружено');
    hide();
    submitBtn.disabled = false;
  };

  var onSubmitError = function (errorText) {
    window.alerts.showError('Ошибка загрузки файла.<br>' + errorText, upload);
    submitBtn.disabled = false;
  };

  var onSubmitBtnClick = function () {
    var isValid = validateHahtags();

    if (isValid) {
      upload();
    }
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
        defaultValue: ImageScale.DEFAULT_VALUE,
        previewImg: previewImg
      });

      effects = new window.Effects(form.querySelector('.effects'),
          previewImg,
          form.querySelector('.effect-level'));

      descriptionField.setAttribute('maxlength', Description.MAX_LENGTH);

      descriptionField.addEventListener('focus', onDescriptionFieldFocus);
      descriptionField.addEventListener('blur', onDescriptionFieldBlur);
      hashtagsField.addEventListener('focus', onHashtagsFieldFocus);
      hashtagsField.addEventListener('blur', onHashtagsFieldBlur);
      hashtagsField.addEventListener('change', onHashtagsFieldChange);
      submitBtn.addEventListener('click', onSubmitBtnClick);
    }
  };

})();
