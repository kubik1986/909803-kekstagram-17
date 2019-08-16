'use strict';

(function () {

  var NEW_PICTURES_AMOUNT = 12;

  var FilterID = {
    POPULAR: 'filter-popular',
    NEW: 'filter-new',
    DISCUSSED: 'filter-discussed'
  };

  var discussedComparator = function (a, b) {
    var diff = b.comments.length - a.comments.length;

    if (diff !== 0) {
      return diff;
    }

    diff = b.likes - a.likes;
    if (diff !== 0) {
      return diff;
    }

    if (a.url > b.url) {
      return 1;
    } else if (a.url < b.url) {
      return -1;
    }
    return 0;
  };

  window.data = {
    pictures: [],
    filteredPictures: [],

    filter: function (filterID) {
      switch (filterID) {
        case FilterID.POPULAR:
          this.filteredPictures = this.pictures;
          break;
        case FilterID.NEW:
          this.filteredPictures = window.utils.shuffleArray(this.pictures)
            .slice(0, NEW_PICTURES_AMOUNT);
          break;
        case FilterID.DISCUSSED:
          this.filteredPictures = this.pictures.slice()
            .sort(discussedComparator);
          break;
      }
    }
  };

})();
