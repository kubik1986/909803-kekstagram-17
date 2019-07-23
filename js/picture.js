'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  window.picture = {
    create: function (id, pictureObj) {
      var pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.dataset.id = id;
      pictureElement.querySelector('.picture__img').src = pictureObj.url;
      pictureElement.querySelector('.picture__comments').textContent = pictureObj.comments.length;
      pictureElement.querySelector('.picture__likes').textContent = pictureObj.comments.likes;

      return pictureElement;
    }
  };

})();
