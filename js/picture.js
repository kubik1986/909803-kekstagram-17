'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  window.picture = {
    create: function (id, pictureData) {
      var pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.dataset.id = id;
      pictureElement.querySelector('.picture__img').src = pictureData.url;
      pictureElement.querySelector('.picture__comments').textContent = pictureData.comments.length;
      pictureElement.querySelector('.picture__likes').textContent = pictureData.comments.likes;

      return pictureElement;
    }
  };

})();
