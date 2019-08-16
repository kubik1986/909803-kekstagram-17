'use strict';

(function () {

  window.ImageScale = function (obj) {
    this._element = obj.element; // контейнер блока масштабирования изображения
    this._input = this._element.querySelector('.scale__control--value'); // поле текущего масштаба
    this._decreaseBtn = this._element.querySelector('.scale__control--smaller');
    this._increaseBtn = this._element.querySelector('.scale__control--bigger');
    this._minValue = parseInt(obj.minValue, 10); // минимальное значение масштаба, в %
    this._maxValue = parseInt(obj.maxValue, 10); // максимальное значение масштаба, в %
    this._defaultValue = parseInt(obj.defaultValue, 10); // значение масштаба по умолчанию, в %
    this._step = parseInt(obj.step, 10); // шаг изменения масштаба, в %
    this._value = parseInt(this._input.value, 10); // текущее значение масштаба
    this._previewImg = obj.previewImg; // изображение превью

    this._init();
  };

  window.ImageScale.prototype = {
    _init: function () {
      this.reset();
      this._input.setAttribute('value', this._defaultValue + '%');
      this._element.addEventListener('click', this._onElementClick.bind(this));
    },

    _onElementClick: function (evt) {
      var target = evt.target;

      if (target === this._decreaseBtn) {
        this.setValue(this._value - this._step);
      } else if (target === this._increaseBtn) {
        this.setValue(this._value + this._step);
      }
    },

    setValue: function (value) {
      value = parseInt(value, 10);

      if (!isNaN(value)) {
        if (value < this._minValue) {
          value = this._minValue;
        } else if (value > this._maxValue) {
          value = this._maxValue;
        } else {
          var k = 1 / this._step;
          value = (Math.round(value * k)) / k;
        }

        this._value = value;
        this._input.value = this._value + '%';
        this._previewImg.style.transform = 'scale(' + this._value / 100 + ')';
      }
    },

    reset: function () {
      this.setValue(this._defaultValue);
    }
  };

})();
