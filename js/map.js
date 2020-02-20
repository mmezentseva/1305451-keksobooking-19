'use strict';

(function () {
  var ENTER_KEY = 'Enter';

  window.hotKey = {
    ENTER_KEY: ENTER_KEY
  };
})();

(function () {
  var RADIX_NUMBER = 10;
  var HALF = 2;

  window.getCoordinates = function (point, size) {
    return parseInt(point, RADIX_NUMBER) + Math.round(size / HALF);
  };
})();

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var MAINPIN_AFTER_HEIGHT = 22;
  var mainPinX = window.getCoordinates(mapPinMain.style.left, mapPinMain.offsetWidth);
  var mainPinY = window.getCoordinates(mapPinMain.style.top, mapPinMain.offsetHeight);
  var mainPinActiveY = mainPinY + MAINPIN_AFTER_HEIGHT;
  var mainPinCoordinate = mainPinX + ',' + mainPinY;
  var mainPinCoordinateActive = mainPinX + ',' + mainPinActiveY;

  window.dataCoordinate = {
    mainPinCoordinate: mainPinCoordinate,
    mainPinCoordinateActive: mainPinCoordinateActive
  };
})();

(function () {
  window.toggleElementAvailability = function (elements, status) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = status;
    }
  };
})();

(function () {
  var fieldsetHeader = document.querySelector('.ad-form-header');
  var formInput = document.querySelectorAll('.ad-form__element');
  var addressForm = document.querySelector('#address');
  var mapFilters = document.querySelector('.map__filters');

  window.deactivateMap = function () {
    fieldsetHeader.setAttribute('disabled', 'disabled');
    addressForm.setAttribute('value', window.dataCoordinate.mainPinCoordinate);
    mapFilters.classList.add('map__filters--disabled');
    window.toggleElementAvailability(formInput, true);
  };
})();

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var fieldsetHeader = document.querySelector('.ad-form-header');
  var formInput = document.querySelectorAll('.ad-form__element');
  var formAd = document.querySelector('.ad-form');
  var addressForm = document.querySelector('#address');
  var mapFilters = document.querySelector('.map__filters');

  window.activatePageHandler = function (evt) {
    if (evt.which === 1 || evt.key === window.hotKey.ENTER_KEY) {
      window.renderPins();
      mapPinMain.removeEventListener('mousedown', window.activatePageHandler);
      mapPinMain.removeEventListener('keydown', window.activatePageHandler);
    }
    map.classList.remove('map--faded');
    fieldsetHeader.removeAttribute('disabled');
    formAd.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    addressForm.setAttribute('value', window.dataCoordinate.mainPinCoordinateActive);
    window.toggleElementAvailability(formInput, false);
  };
})();

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', window.activatePageHandler);
  mapPinMain.addEventListener('mousedown', window.activatePageHandler);
})();
