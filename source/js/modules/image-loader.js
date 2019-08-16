'use strict';

(function () {

  var Byte = {
    KB: 1024,
    MB: 1024 * 1024,
  };

  window.ImageLoader = function (obj) {
    this._fileChooser = obj.fileChooser; // инпут
    this._dropZone = obj.dropZone; // drop zone
    this._highlightClass = obj.highlightClass; // класс drop zone при dragenter и dragover
    this._previewImg = obj.previewImg; // изображение превью
    this._defaultImg = obj.defaultImg; // адрес изображения по умолчанию
    this._fileTypes = obj.fileTypes; // допустимые типы файлов
    this._maxFileSize = obj.maxFileSize; // максимальный размер файла в KB
    this._files = []; // массив файлов, передаваемый в FormData
    this._errors = []; // массив сообщений об ошибках
    this._onFileLoaded = obj.onFileLoaded; // cb, вызываемый после загрузки файла

    this._init();
  };

  window.ImageLoader.prototype = {
    _highlight: function () {
      if (!this._dropZone.classList.contains(this._highlightClass)) {
        this._dropZone.classList.add(this._highlightClass);
      }
    },

    _unhighlight: function () {
      if (this._dropZone.classList.contains(this._highlightClass)) {
        this._dropZone.classList.remove(this._highlightClass);
      }
    },

    _showError: function (message) {
      var self = this;

      window.alerts.showError(message,
          null,
          function () {
            self._fileChooser.click();
          }
      );
    },

    _validate: function (file) {
      var isCorrect = false;
      var typeError = 'Допустимые типы файлов - ' + this._fileTypes.join(', ');
      var sizeError = 'Максимальный размер файла - ' + this._maxFileSize + '&nbsp;КБ';
      var fileName = file.name.toLowerCase();
      var matches = this._fileTypes.some(function (type) {
        return fileName.endsWith(type);
      });

      if (!matches) {
        if (!this._errors.includes(typeError)) {
          this._errors.push(typeError);
        }
      } else if (file.size > this._maxFileSize * Byte.KB) {
        if (!this._errors.includes(sizeError)) {
          this._errors.push(sizeError);
        }
      } else {
        isCorrect = true;
      }

      return isCorrect;
    },

    _clearFiles: function () {
      this._files = [];
    },

    _clearErrors: function () {
      this._errors = [];
    },

    _updatePreview: function () {
      var self = this;

      if (self._files.length > 0) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          self._previewImg.src = reader.result;
          self._onFileLoaded();
        });

        reader.readAsDataURL(self._files[0]);
      }
    },

    _setDefaultPreview: function () {
      this._previewImg.src = this._defaultImg;
    },

    _addFiles: function (files) {
      this.reset();

      if (files[0] && this._validate(files[0])) {
        this._files.push(files[0]);
      }

      if (this._errors.length > 0) {
        this._errors.unshift('Изображение не загружено');

        var message = this._errors.join('.<br>');
        this._showError(message);
      }
    },

    _setAcceptAttr: function () {
      this._fileChooser.accept = 'image/*';
    },

    _init: function () {
      var self = this;

      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (evtName) {
        self._dropZone.addEventListener(evtName, function (evt) {
          evt.preventDefault();
          evt.stopPropagation();
        });
      });

      ['dragenter', 'dragover'].forEach(function (evtName) {
        self._dropZone.addEventListener(evtName, function () {
          self._highlight();
        });
      });

      ['dragleave', 'drop'].forEach(function (evtName) {
        self._dropZone.addEventListener(evtName, function () {
          self._unhighlight();
        });
      });

      self._setAcceptAttr();
      self._dropZone.addEventListener('drop', self._onDrop.bind(self));
      self._fileChooser.addEventListener('change', self._onInputChange.bind(self));
    },

    _onDrop: function (evt) {
      var dataTransfer = evt.dataTransfer;
      var files = Array.from(dataTransfer.files);

      this._addFiles(files);
      this._updatePreview();
    },

    _onInputChange: function () {
      var files = Array.from(this._fileChooser.files);

      this._addFiles(files);
      this._updatePreview();
    },

    reset: function () {
      this._clearFiles();
      this._fileChooser.value = '';
      this._clearErrors();
      this._setDefaultPreview();
    },

    getFiles: function () {
      return this._files;
    }
  };

})();
