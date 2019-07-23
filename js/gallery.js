'use strict';

(function () {

  var picturesContainer = document.querySelector('.pictures.container');
  var pictures = [];

  // TODO
  var onPictureClick = function () {};

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
    }
  };

})();
