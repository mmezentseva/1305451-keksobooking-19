'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var formAd = document.querySelector('.ad-form');
  var formReset = document.querySelector('.ad-form__reset');
  var errorBtn = '.error__button';
  var successPopup = '.success';
  var errorPopup = '.error';

  var main = document.querySelector('main');
  var successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
  var newSuccessPopup = successPopupTemplate.cloneNode(true);

  var errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
  var newErrorPopup = errorPopupTemplate.cloneNode(true);

  var success = function () {
    main.insertAdjacentElement('afterbegin', newSuccessPopup);
    window.util.escPressHandler(successPopup);
    window.util.closeOnClickHandler(successPopup);
  };

  /*
  var success = function (cb) {
    main.insertAdjacentElement('afterbegin', newSuccessPopup);
    window.util.escPressHandler(successPopup);
    window.util.closeOnClickHandler(successPopup);
    cb();
  };
*/
  var error = function () {
    main.insertAdjacentElement('afterbegin', newErrorPopup);
    window.util.escPressHandler(errorPopup);
    window.util.closeOnClickHandler(errorPopup);
    window.util.closeOnclickBtnHandler(errorBtn, errorPopup);
  };

  window.upload = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.StatusCode.OK) {
        successHandler(xhr.response);
      } else {
        errorHandler();
      }
    });

    xhr.addEventListener('error', function () {
      error();
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  formAd.addEventListener('submit', function (evt) {
    window.upload(new FormData(formAd), function () {
      success();
      // success(window.location.reload(true));
    });
    evt.preventDefault();
  });

  formReset.addEventListener('click', function () {
    formAd.reset();
  });

})();


