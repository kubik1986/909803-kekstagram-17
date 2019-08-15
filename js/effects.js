'use strict';

(function () {

  var Slider = {
    MIN_VALUE: 0,
    MAX_VALUE: 100,
    VALUE_STEP_BY_KEY_PRESS_MULTIPLIER: 0.01
  };

  var effectFunctions = {
    'none': function () {
      return '';
    },
    'chrome': function (effectLevel) {
      return 'grayscale(' + effectLevel / 100 + ')';
    },
    'sepia': function (effectLevel) {
      return 'sepia(' + effectLevel / 100 + ')';
    },
    'marvin': function (effectLevel) {
      return 'invert(' + effectLevel + '%)';
    },
    'phobos': function (effectLevel) {
      return 'blur(' + effectLevel * 0.03 + 'px)';
    },
    'heat': function (effectLevel) {
      return 'brightness(' + (effectLevel * 0.02 + 1) + ')';
    }
  };

  window.Effects = function (effectsElement, previewImg, sliderElement) {
    this._element = effectsElement; // контейнер блока эффектов
    this._radios = this._element.querySelectorAll('.effects__radio'); // радио-кнопки эффектов
    this._currentEffect = 'none'; // текущий эффект
    this._previewImg = previewImg; // изображение превью
    this.slider = new window.Slider({ // контроллер уровня эффекта
      sliderElement: sliderElement,
      scale: sliderElement.querySelector('.effect-level__line'),
      valueLine: sliderElement.querySelector('.effect-level__depth'),
      grip: sliderElement.querySelector('.effect-level__pin'),
      input: sliderElement.querySelector('.effect-level__value'),
      minValue: Slider.MIN_VALUE,
      maxValue: Slider.MAX_VALUE,
      valueStepByKeyPressMultiplier: Slider.VALUE_STEP_BY_KEY_PRESS_MULTIPLIER,
      cb: this.applyEffect.bind(this)
    });

    this._init();
  };

  window.Effects.prototype = {
    _init: function () {
      var self = this;

      self.reset();
      self._radios.forEach(function (radio) {
        radio.addEventListener('click', self._onRadioClick.bind(self));
      });
    },

    _clearPreviewImgClass: function () {
      if (this._previewImg.classList.contains('effects__preview--' + this._currentEffect)) {
        this._previewImg.classList.remove('effects__preview--' + this._currentEffect);
      }

      if (this._previewImg.classList.length === 0) {
        this._previewImg.removeAttribute('class');
      }
    },

    _onRadioClick: function (evt) {
      var effect = evt.currentTarget.value;

      if (effect !== this._currentEffect) {
        if (this._currentEffect === 'none') {
          this.slider.show();
        } else if (effect === 'none') {
          this.slider.hide();
        }

        this._clearPreviewImgClass();

        if (effect !== 'none') {
          this._previewImg.classList.add('effects__preview--' + effect);
        }

        this._currentEffect = effect;
        this.slider.reset();
      }
    },

    applyEffect: function (effectLevel) {
      if (!effectFunctions.hasOwnProperty(this._currentEffect)) {
        throw new Error('Функция для эффекта "' + this._currentEffect + '" не найдена');
      }
      this._previewImg.style.filter = effectFunctions[this._currentEffect](effectLevel);
    },

    reset: function () {
      this._clearPreviewImgClass();
      this._element.querySelector('#effect-none').checked = true;
      this._currentEffect = 'none';
      this.slider.hide();
      this.slider.reset();
    }
  };

})();
