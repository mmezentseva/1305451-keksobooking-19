'use strict';
(function () {

  var mapPinMain = document.querySelector('.map__pin--main');
  var addressForm = document.querySelector('#address');
  var map = document.querySelector('.map');

  var limits = {
    top: map.offsetTop,
    right: map.offsetWidth,
    bottom: map.offsetHeight - mapPinMain.offsetHeight,
    left: map.offsetLeft
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (moveEvt.clientX < limits.right && moveEvt.clientX > limits.left &&
          moveEvt.clientY < limits.bottom && moveEvt.clientY > limits.top) {

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      addressForm.setAttribute('value', window.map.getCoordsBottom());
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

/*
mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    */

/*
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      mapPinMain.style.top = (shift.y - mapPinMain.offsetHeight * 2) + 'px';
      mapPinMain.style.left = (shift.x - mapPinMain.offsetWidth * 2) + 'px';

      var pinHeight = mapPinMain.offsetHeight / HALF + MAINPIN_AFTER_HEIGHT

      var startCoordsAfter = {
        x: moveEvt.clientX,
        y: moveEvt.clientY + pinHeight
      };

      var shiftAfter = {
        x: evt.clientX - moveEvt.clientX,
        y: evt.clientY + pinHeight * 2 - moveEvt.clientY
      };

      var coordsAfterMove = shiftAfter.x + ',' + shiftAfter.y;
      */
