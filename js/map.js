'use strict';

(function () {
  var map = document.querySelector('.map');
  var fieldsetHeader = document.querySelector('.ad-form-header');
  var formInput = document.querySelectorAll('.ad-form__element');
  var formAd = document.querySelector('.ad-form');
  var addressForm = document.querySelector('#address');
  var mapFilter = document.querySelectorAll('.map__filter');
  var mapPinMain = document.querySelector('.map__pin--main');

  var RADIX_NUMBER = 10;
  var HALF = 2;
  var ONE = 1;
  var MAINPIN_AFTER_HEIGHT = 22;

  var getCoordinates = function (point, size, half) {
    half = half || HALF;
    return parseInt(point, RADIX_NUMBER) + Math.round(size / half);
  };

  var getCoordsCenter = function () {
    var mainPinX = getCoordinates(mapPinMain.style.left, mapPinMain.offsetWidth);
    var mainPinY = getCoordinates(mapPinMain.style.top, mapPinMain.offsetHeight);
    return mainPinX + ',' + mainPinY;
  };

  var getCoordsBottom = function () {
    var mainPinX = getCoordinates(mapPinMain.style.left, mapPinMain.offsetWidth);
    var mainPinActiveY = getCoordinates(mapPinMain.style.top, mapPinMain.offsetHeight, ONE) + MAINPIN_AFTER_HEIGHT;
    return mainPinX + ',' + mainPinActiveY;
  };

  var toggleElementAvailability = function (elements, status) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = status;
    }
  };

  var deactivateMap = function () {

    fieldsetHeader.setAttribute('disabled', 'disabled');
    addressForm.setAttribute('value', getCoordsCenter());
    toggleElementAvailability(mapFilter, true);
    toggleElementAvailability(formInput, true);
  };

  var activatePageHandler = function (evt) {
    if (evt.which === 1 || evt.key === window.util.ENTER_KEY) {
      window.load(window.filter.successHandler, window.filter.errorHandler);
      mapPinMain.removeEventListener('mousedown', activatePageHandler);
      mapPinMain.removeEventListener('keydown', activatePageHandler);
    }

    map.classList.remove('map--faded');
    fieldsetHeader.removeAttribute('disabled');
    formAd.classList.remove('ad-form--disabled');
    addressForm.setAttribute('value', getCoordsBottom());
    toggleElementAvailability(formInput, false);
  };

  mapPinMain.addEventListener('mousedown', activatePageHandler);
  mapPinMain.addEventListener('keydown', activatePageHandler);

  deactivateMap();

  window.map = {
    toggleElementAvailability: toggleElementAvailability,
    getCoordsCenter: getCoordsCenter,
    getCoordsBottom: getCoordsBottom,
    deactivate: deactivateMap,
    activatePageHandler: activatePageHandler
  };
})();


