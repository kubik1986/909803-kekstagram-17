'use strict';

(function () {

  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
  var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

  var onAlertEscPress = function (evt) {
    window.utils.onEscPress(evt, hideAlert);
  };

  var onErrorClick = function (evt) {
    if (!evt.target.classList.contains('error__button')) {
      hideAlert();
    }
  };

  var onSuccessClick = function () {
    hideAlert();
  };

  var hideAlert = function () {
    var alerts = main.querySelectorAll('.error, .success');
    alerts.forEach(function (alert) {
      alert.remove();
    });

    document.removeEventListener('keydown', onAlertEscPress);
  };

  window.alerts = {
    showError: function (errorMessage, tryAgainCallback, loadFileCallback) {
      var errorElement = errorTemplate.cloneNode(true);
      var tryAgainBtn = errorElement.querySelector('.error__button-try-again');
      var loadFileBtn = errorElement.querySelector('.error__button-load-file');

      var onTryAgainBtnClick = function () {
        hideAlert();
        tryAgainCallback();
      };

      var onLoadFileBtnClick = function () {
        hideAlert();
        loadFileCallback();
      };

      errorElement.querySelector('.error__title').innerHTML = errorMessage;
      main.appendChild(errorElement);
      errorElement.focus();

      tryAgainBtn.addEventListener('click', onTryAgainBtnClick);
      errorElement.addEventListener('click', onErrorClick);
      document.addEventListener('keydown', onAlertEscPress);

      if (loadFileCallback === undefined) {
        loadFileBtn.remove();
      } else {
        loadFileBtn.addEventListener('click', onLoadFileBtnClick);
      }
    },

    showSuccess: function (successMessage) {
      var successElement = successTemplate.cloneNode(true);

      successElement.querySelector('.success__title').innerHTML = successMessage;
      main.appendChild(successElement);
      successElement.focus();

      successElement.addEventListener('click', onSuccessClick);
      document.addEventListener('keydown', onAlertEscPress);
    }
  };

})();
