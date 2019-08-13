'use strict';

(function () {

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

  window.Effects = function (element, preview, sliderElement) {
    this._element = element;
    this._radios = this._element.querySelectorAll('.effects__radio');
    this._currentEffect = 'none';
    this._preview = preview;
    this.slider = new window.Slider({
      sliderElement: sliderElement,
      scale: sliderElement.querySelector('.effect-level__line'),
      valueLine: sliderElement.querySelector('.effect-level__depth'),
      grip: sliderElement.querySelector('.effect-level__pin'),
      input: sliderElement.querySelector('.effect-level__value'),
      minValue: 0,
      maxValue: 100,
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

    _clearPreviewClass: function () {
      if (this._preview.classList.contains('effects__preview--' + this._currentEffect)) {
        this._preview.classList.remove('effects__preview--' + this._currentEffect);
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

        this._clearPreviewClass();

        if (effect !== 'none') {
          this._preview.classList.add('effects__preview--' + effect);
        }

        this._currentEffect = effect;
        this.slider.reset();
      }
    },

    applyEffect: function (effectLevel) {
      if (!effectFunctions.hasOwnProperty(this._currentEffect)) {
        throw new Error('Функция для эффекта "' + this._currentEffect + '" не найдена');
      }
      this._preview.style.filter = effectFunctions[this._currentEffect](effectLevel);
    },

    reset: function () {
      this._clearPreviewClass();
      this._element.querySelector('#effect-none').checked = true;
      this._currentEffect = 'none';
      this.slider.hide();
      this.slider.reset();
    }
  };

})();
