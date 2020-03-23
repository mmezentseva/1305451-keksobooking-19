'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var formAd = document.querySelector('.ad-form');
  var formReset = document.querySelector('.ad-form__reset');
  var errorBtn = '.error__button';
  var successPopup = '.success';
  var errorPopup = '.error';
  var map = document.querySelector('.map');
  var similarListElement = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapOverlay = document.querySelector('.map__overlay');
  var addressForm = document.querySelector('#address');

  var main = document.querySelector('main');
  var successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
  var newSuccessPopup = successPopupTemplate.cloneNode(true);

  var errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
  var newErrorPopup = errorPopupTemplate.cloneNode(true);

  var makeDefaultPinMainCoords = function () {
    mapPinMain.style.left = window.util.StartMainPinCoords.LEFT;
    mapPinMain.style.top = window.util.StartMainPinCoords.TOP;
    addressForm.setAttribute('value', window.map.getCoordsCenter());
  };

  var makeDefaltStateMap = function () {
    map.classList.add('map--faded');
    formAd.reset();
    formAd.classList.add('ad-form--disabled');

    window.pin.remove();
    similarListElement.appendChild(mapOverlay);
    window.cardTemplate.removeElement();
    window.filter.reset();

    mapPinMain.addEventListener('mousedown', window.map.activatePageHandler);
    mapPinMain.addEventListener('keydown', window.map.activatePageHandler);

    makeDefaultPinMainCoords();
  };

  var showSuccess = function () {
    main.insertAdjacentElement('afterbegin', newSuccessPopup);
    window.util.escPressHandler(successPopup);
    window.util.closeOnClickHandler(successPopup);

    makeDefaltStateMap();
  };

  var showError = function () {
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
      showError();
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  formAd.addEventListener('submit', function (evt) {
    window.upload(new FormData(formAd), function () {
      showSuccess();
    });
    evt.preventDefault();
  });

  formReset.addEventListener('click', function () {
    makeDefaltStateMap();
  });

})();
