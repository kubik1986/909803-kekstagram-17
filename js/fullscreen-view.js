'use strict';

(function () {
  var COMMENTS_STEP = 5;

  var body = document.querySelector('body');
  var container = body.querySelector('.big-picture');
  var img = container.querySelector('.big-picture__img img');
  var description = container.querySelector('.social__caption');
  var likesCount = container.querySelector('.likes-count');
  var commentsCount = container.querySelector('.social__comment-count');
  var commentsList = container.querySelector('.social__comments');
  var commentsLoadBtn = container.querySelector('.social__comments-loader');
  var commentTemplate = commentsList.querySelector('.social__comment');
  var leaveCommentForm = container.querySelector('.social__footer');
  var leaveCommentInput = leaveCommentForm.querySelector('.social__footer-text');
  var closeButton = container.querySelector('#picture-cancel');
  var visibleCommentsAmount;
  var commentsAmount;
  var pictureData;
  var lastFocusedElement;

  var clearComments = function () {
    commentsList.innerHTML = null;
  };

  var createComment = function (commentData) {
    var commentElement = commentTemplate.cloneNode(true);
    var commentImg = commentElement.querySelector('img');

    commentImg.src = commentData.avatar;
    commentImg.alt = commentData.name;
    commentElement.querySelector('.social__text').textContent = commentData.message;

    return commentElement;
  };

  var renderComments = function () {
    var fragment = document.createDocumentFragment();
    var commentsData = pictureData.comments.slice(visibleCommentsAmount, visibleCommentsAmount + COMMENTS_STEP);

    commentsData.forEach(function (commentData) {
      var commentElement = createComment(commentData);

      fragment.appendChild(commentElement);
      visibleCommentsAmount++;
    });

    commentsList.appendChild(fragment);

    if (visibleCommentsAmount === commentsAmount) {
      commentsLoadBtn.classList.add('hidden');
    }
  };

  var updateCommentsCount = function () {
    commentsCount.innerHTML = visibleCommentsAmount + ' из <span class="comments-count">' + commentsAmount + '</span> комментариев';
  };

  var hide = function () {
    container.classList.add('hidden');
    body.classList.remove('modal-open');
    lastFocusedElement.focus();

    commentsLoadBtn.removeEventListener('click', onCommentsLoadBtnClick);
    closeButton.removeEventListener('click', onCloseBtnClick);
    document.removeEventListener('keydown', onPreviewEscPress);
  };

  var onCommentsLoadBtnClick = function () {
    renderComments(pictureData);
    updateCommentsCount();
  };

  var onCloseBtnClick = function () {
    hide();
  };

  var onPreviewEscPress = function (evt) {
    window.utils.onEscPress(evt, hide);
  };

  window.fullscreenView = {
    show: function (pictureID) {
      lastFocusedElement = document.activeElement;
      pictureData = window.data.filteredPictures[pictureID];

      visibleCommentsAmount = 0;
      if (commentsLoadBtn.classList.contains('hidden')) {
        commentsLoadBtn.classList.remove('hidden');
      }

      img.src = pictureData.url;
      description.textContent = pictureData.description;
      likesCount.textContent = pictureData.likes;

      commentsAmount = (!pictureData.hasOwnProperty('comments') || pictureData.comments.length === 0) ? 0 : pictureData.comments.length;
      clearComments();
      leaveCommentInput.value = '';

      if (commentsAmount > 0) {
        renderComments(pictureData);
      } else {
        commentsLoadBtn.classList.add('hidden');
      }

      updateCommentsCount();
      container.classList.remove('hidden');
      body.classList.add('modal-open');
      container.focus();
      container.scrollTo(0, 0);

      commentsLoadBtn.addEventListener('click', onCommentsLoadBtnClick);
      closeButton.addEventListener('click', onCloseBtnClick);
      document.addEventListener('keydown', onPreviewEscPress);
    }
  };

})();
