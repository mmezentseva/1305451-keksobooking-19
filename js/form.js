'use strict';

(function () {
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');

  window.findDisabledEl = function () {
    var index = capacity.options.selectedIndex;
    roomNumber.options[index].selected = true;
    var roomNumberLenght = roomNumber.options.length;

    if (index === roomNumberLenght - 1) {
      for (var j = 0; j < roomNumberLenght; j++) {
        roomNumber.options[j].disabled = j < index;
      }
    } else {
      for (var k = 0; k < roomNumberLenght; k++) {
        roomNumber.options[k].disabled = k > index;
      }
    }
  };
})();

(function () {
  var capacity = document.querySelector('#capacity');
  capacity.addEventListener('change', function () {
    window.findDisabledEl();
  });
})();

(function () {
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');

  roomNumber.addEventListener('change', function () {

    var index = roomNumber.options.selectedIndex;
    capacity.options[index].selected = true;
    var capacityLenght = capacity.options.length;

    for (var k = 0; k < capacityLenght - 1; k++) {
      if (index === capacityLenght - 1) {
        capacity.options[index].disabled = false;
        capacity.options[k].disabled = true;
      } else {
        capacity.options[capacityLenght - 1].disabled = true;
        capacity.options[k].disabled = k < index;
      }
    }
  });
})();
