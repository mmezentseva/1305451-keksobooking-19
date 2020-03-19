'use strict';
(function () {

  var mapPinMain = document.querySelector('.map__pin--main');
  var addressForm = document.querySelector('#address');
  var map = document.querySelector('.map');
  var HALF = 2;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;

  var limits = {
    top: LOCATION_Y_MIN,
    right: map.offsetWidth + mapPinMain.offsetWidth / HALF,
    bottom: LOCATION_Y_MAX,
    left: map.offsetLeft
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    // var dragged = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var getLocation = function (moveEvt) {

      if (moveEvt.clientX < limits.right && moveEvt.clientX > limits.left &&
        moveEvt.pageY < limits.bottom && moveEvt.pageY > limits.top) {

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
      }

      addressForm.setAttribute('value', window.map.getCoordsBottom());
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      // dragged = true;

      getLocation(moveEvt);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      /*
      if (dragged) {
        mapPinMain.style.top = (mapPinMain.offsetTop - startCoords.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - startCoords.x) + 'px';
        addressForm.setAttribute('value', window.map.getCoordsBottom());
      }*/
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

})();
