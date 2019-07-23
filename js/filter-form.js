'use strict';

(function () {

  var FILTER_INACTIVE_CLASS = 'img-filters--inactive';

  var filterSection = document.querySelector('.img-filters');
  var form = filterSection.querySelector('.img-filters__form');
  var popularBtn = form.querySelector('filter-popular');
  var newBtn = form.querySelector('.filter-new');
  var discussedBtn = form.querySelector('.filter-discussed');
  var activeFilterBtn = form.querySelector('.img-filters__button--active');

  window.filterForm = {
    activate: function () {
      filterSection.classList.remove(FILTER_INACTIVE_CLASS);
    },

    deactivate: function () {
      filterSection.classList.add(FILTER_INACTIVE_CLASS);
    }
  };

})();
