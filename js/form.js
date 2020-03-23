'use strict';

(function () {
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var priceInput = document.querySelector('#price');
  var typeHouseInput = document.querySelector('#type');

  var houseTypeAttribute = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  var findDisabledEl = function () {

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

  capacity.addEventListener('change', function () {
    findDisabledEl();
  });

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

  timeInInput.addEventListener('change', function (evt) {
    timeOutInput.value = evt.target.value;
  });

  timeOutInput.addEventListener('change', function (evt) {
    timeInInput.value = evt.target.value;
  });

  typeHouseInput.addEventListener('change', function () {
    var index = typeHouseInput.options.selectedIndex;
    var value = typeHouseInput.options[index].value;

    priceInput.setAttribute('min', houseTypeAttribute[value]);
    priceInput.setAttribute('placeholder', houseTypeAttribute[value]);
  });

})();
