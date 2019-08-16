'use strict';

(function () {

  var main = document.querySelector('main');
  var loadingMessageTemplate = document.querySelector('#messages')
      .content
      .querySelector('.img-upload__message--loading');
  var loadingMessage;


  window.spinners = {
    showLoadingMessage: function () {
      loadingMessage = loadingMessageTemplate.cloneNode(true);

      main.appendChild(loadingMessage);
      document.body.style.overflow = 'hidden';
    },

    hideLoadingMessage: function () {
      if (loadingMessage) {
        loadingMessage.remove();
      }
      document.body.style.overflow = 'visible';
    }
  };

})();
