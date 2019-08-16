'use strict';

(function () {

  var FILTER_INACTIVE_CLASS = 'img-filters--inactive';

  var filterSection = document.querySelector('.img-filters');
  var form = filterSection.querySelector('.img-filters__form');
  var filterBtnNew = form.querySelector('#filter-new');
  var activeFilterBtn = form.querySelector('.img-filters__button--active');
  var previousActiveFilterButton = activeFilterBtn;

  var setActiveFilterBtn = function (newFilterBtn) {
    if (newFilterBtn === activeFilterBtn) {
      return;
    }

    activeFilterBtn.classList.remove('img-filters__button--active');
    newFilterBtn.classList.add('img-filters__button--active');
    activeFilterBtn = newFilterBtn;
  };

  var onFormClick = function (evt) {
    evt.preventDefault();
    var filterBtn = evt.target;

    if (!filterBtn.classList.contains('img-filters__button')) {
      return;
    }

    setActiveFilterBtn(filterBtn);
    window.utils.debounce(function () {
      if (activeFilterBtn !== previousActiveFilterButton || activeFilterBtn === filterBtnNew) {
        window.data.filter(activeFilterBtn.id);
        window.gallery.updatePictures(window.data.filteredPictures);
        previousActiveFilterButton = activeFilterBtn;
      }
    });
  };

  window.filterForm = {
    init: function () {
      form.addEventListener('click', onFormClick);
    },

    activate: function () {
      filterSection.classList.remove(FILTER_INACTIVE_CLASS);
    },

    deactivate: function () {
      filterSection.classList.add(FILTER_INACTIVE_CLASS);
    }
  };

})();
