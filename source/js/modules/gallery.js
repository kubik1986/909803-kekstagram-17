'use strict';

(function () {

  var picturesContainer = document.querySelector('.pictures.container');
  var pictures = [];

  var onPictureClick = function (evt) {
    evt.preventDefault();
    window.fullscreenView.show(evt.currentTarget.dataset.id);
  };

  var removePictures = function () {
    pictures.forEach(function (picture) {
      picture.remove();
    });
    pictures = [];
  };

  window.gallery = {
    renderPictures: function (picturesData) {
      var fragment = document.createDocumentFragment();

      picturesData.forEach(function (pictureData, index) {
        var pictureElement = window.picture.create(index, pictureData);

        fragment.appendChild(pictureElement);
        pictures.push(pictureElement);

        pictureElement.addEventListener('click', onPictureClick);
      });
      picturesContainer.appendChild(fragment);
    },

    updatePictures: function (picturesData) {
      removePictures();
      this.renderPictures(picturesData);
    }
  };

})();
