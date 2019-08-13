'use strict';

(function () {

  var GripLeftPositionLimit = { // CSS left в %
    MIN: 0,
    MAX: 100
  };

  window.Slider = function (obj) {
    this._element = obj.sliderElement; // контейнер слайдера
    this._scale = obj.scale; // шкала слайдера
    this._valueLine = obj.valueLine; // линия текущего значения
    this._grip = obj.grip; // ручка слайдера
    this._input = obj.input; // поле текущего значения
    this._cb = obj.cb; // callback, выполняемый при перемещении ручки слайдера
    this._minValue = obj.minValue; // минимальное значение
    this._maxValue = obj.maxValue; // максимальное значение
    this._value = this._input.value; // текущее значение слайдера
    this._gripPosition = parseInt(getComputedStyle(this._grip).left, 10);

    this._init();
  };

  window.Slider.prototype = {
    _moveGrip: function (gripPosition) {
      this._grip.style.left = gripPosition + '%';
      this._valueLine.style.width = gripPosition + '%';
      this._gripPosition = gripPosition;
    },

    _init: function () {
      this.reset();
      this._grip.addEventListener('mousedown', this._onGripMousedown.bind(this));
    },

    _updateValue: function (gripPosition) { // gripPosition в %
      this._moveGrip(gripPosition);

      var value = Math.round(gripPosition / 100 * (this._maxValue - this._minValue) + this._minValue);
      this._value = value;
      this._input.value = value;
    },

    _onGripMousedown: function (evt) {
      evt.preventDefault();
      var self = this;
      var startX = evt.clientX;
      var gripLeftOffsetPerPixel = GripLeftPositionLimit.MAX / self._scale.offsetWidth;

      self._clientXCoordinateLimit = {
        min: self._scale.getBoundingClientRect().left,
        max: self._scale.getBoundingClientRect().left + self._scale.offsetWidth
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shiftX = startX - moveEvt.clientX;

        startX = moveEvt.clientX;

        var left = Math.round((self._gripPosition - shiftX * gripLeftOffsetPerPixel) * 100) / 100;

        if (left < GripLeftPositionLimit.MIN) {
          left = GripLeftPositionLimit.MIN;
          if (startX < self._clientXCoordinateLimit.min - pageXOffset) {
            startX = self._clientXCoordinateLimit.min - pageXOffset;
          }
        } else if (left > GripLeftPositionLimit.MAX) {
          left = GripLeftPositionLimit.MAX;
          if (startX > self._clientXCoordinateLimit.max - pageXOffset) {
            startX = self._clientXCoordinateLimit.max - pageXOffset;
          }
        }

        self._updateValue(left);
        self._cb();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },

    setValue: function (value) {
      value = parseInt(value, 10);

      if (!isNaN(value) && value >= this._minValue && value <= this._maxValue) {
        this._value = Math.round(value);
        this._input.value = this._value;

        var gripPosition = Math.round((this._value - this._minValue) / (this._maxValue - this._minValue) * 100 * 100) / 100;
        this._moveGrip(gripPosition);
      }
    },

    getValue: function () {
      return this._value;
    },

    reset: function () {
      this.setValue(this._maxValue);
    },

    hide: function () {
      this._element.style.display = 'none';
    },

    show: function () {
      this._element.style.display = '';
    }
  };

})();
