'use strict';

(function () {
  var map = document.querySelector('.map');
  var fieldsetHeader = document.querySelector('.ad-form-header');
  var formInput = document.querySelectorAll('.ad-form__element');
  var formAd = document.querySelector('.ad-form');
  var addressForm = document.querySelector('#address');
  var mapFilters = document.querySelector('.map__filters');
  var mapPinMain = document.querySelector('.map__pin--main');

  var RADIX_NUMBER = 10;
  var HALF = 2;
  var MAINPIN_AFTER_HEIGHT = 22;

  var getCoordinates = function (point, size) {
    return parseInt(point, RADIX_NUMBER) + Math.round(size / HALF);
  };

  var mainPinX = getCoordinates(mapPinMain.style.left, mapPinMain.offsetWidth);
  var mainPinY = getCoordinates(mapPinMain.style.top, mapPinMain.offsetHeight);
  var mainPinActiveY = mainPinY + MAINPIN_AFTER_HEIGHT;
  var mainPinCoordinate = mainPinX + ',' + mainPinY;
  var mainPinCoordinateActive = mainPinX + ',' + mainPinActiveY;

  var toggleElementAvailability = function (elements, status) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = status;
    }
  };

  var deactivateMap = function () {

    fieldsetHeader.setAttribute('disabled', 'disabled');
    addressForm.setAttribute('value', mainPinCoordinate);
    mapFilters.classList.add('map__filters--disabled');
    toggleElementAvailability(formInput, true);
  };

  var activatePageHandler = function (evt) {
    if (evt.which === 1 || evt.key === window.util.ENTER_KEY) {
      window.pin.render();
      mapPinMain.removeEventListener('mousedown', activatePageHandler);
      mapPinMain.removeEventListener('keydown', activatePageHandler);
    }

    map.classList.remove('map--faded');
    fieldsetHeader.removeAttribute('disabled');
    formAd.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    addressForm.setAttribute('value', mainPinCoordinateActive);
    toggleElementAvailability(formInput, false);
  };

  mapPinMain.addEventListener('mousedown', activatePageHandler);
  mapPinMain.addEventListener('keydown', activatePageHandler);

  deactivateMap();
})();


