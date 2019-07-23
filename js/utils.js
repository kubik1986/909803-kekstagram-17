'use strict';

;(function () { // eslint-disable-line

  var DEBOUNCE_INTERVAL = 500;

  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  var lastTimeout;

  window.utils = {
    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }

      return array;
    },

    onEscPress: function (evt, cb) {
      if (evt.keyCode === KeyCode.ESC) {
        evt.preventDefault();
        cb();
      }
    },

    debounce: function (cb) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    }
  };

})();
