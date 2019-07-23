'use strict';

(function () {

  var onPicturesLoad = function (picturesData) {
    window.data.pictures = picturesData;
    window.filterForm.activate();
    window.gallery.renderPictures(window.data.pictures);
  };

  var onPicturesError = function (errorText) {
    window.alerts.showError('Не удалось загрузить изображения других пользователей.<br>' + errorText, function () {
      window.backend.load(onPicturesLoad, onPicturesError);
    });
  };

  var initPage = function () {
    window.filterForm.deactivate();
    window.backend.load(onPicturesLoad, onPicturesError);
  };

  initPage();

})();
