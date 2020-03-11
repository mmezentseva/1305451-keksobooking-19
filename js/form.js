'use strict';

(function () {
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var priceInput = document.querySelector('#price');
  var typeHouseInput = document.querySelector('#type');
  var addressInput = document.querySelector('#address');
  var housePhotoInput = document.querySelector('#images');
  var avatarInput = document.querySelector('#avatar');
  var titleInput = document.querySelector('#title');
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAX_PRICE_NUMBER = 1000000;

  var houseTypeAttribute = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 1000,
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

  titleInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < MIN_TITLE_LENGTH) {
      target.setCustomValidity(
          'Заголовок должен состоять минимум из ' + MIN_TITLE_LENGTH + '-ти символов');
    } else if (target.value.length > MAX_TITLE_LENGTH) {
      target.setCustomValidity(
          'Заголовок должен состоять максимум из ' + MAX_TITLE_LENGTH + ' символов');
    } else {
      target.setCustomValidity('');
    }
  });

  priceInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value > MAX_PRICE_NUMBER) {
      target.setCustomValidity('Стоимость не должна превышать ' + MAX_PRICE_NUMBER + '₽/ночь');
    } else {
      target.setCustomValidity('');
    }
  });

  timeInInput.addEventListener('change', function () {
    var index = timeInInput.options.selectedIndex;
    timeOutInput.options[index].selected = true;
  });

  timeOutInput.addEventListener('change', function () {
    var index = timeOutInput.options.selectedIndex;
    timeInInput.options[index].selected = true;
  });

  addressInput.setAttribute('readonly', 'readonly');
  housePhotoInput.setAttribute('accept', 'image/*');
  housePhotoInput.setAttribute('multiple', 'multiple');
  avatarInput.setAttribute('accept', 'image/*');

  typeHouseInput.options[2].setAttribute('selected', 'selected');

  typeHouseInput.addEventListener('change', function () {
    var index = typeHouseInput.options.selectedIndex;
    var value = typeHouseInput.options[index].value;

    if (value === 'bungalo') {
      priceInput.setAttribute('min', houseTypeAttribute['bungalo']);
      priceInput.setAttribute('placeholder', houseTypeAttribute['bungalo']);
    } else if (value === 'flat') {
      priceInput.setAttribute('min', houseTypeAttribute['flat']);
      priceInput.setAttribute('placeholder', houseTypeAttribute['flat']);
    } else if (value === 'house') {
      priceInput.setAttribute('min', houseTypeAttribute['house']);
      priceInput.setAttribute('placeholder', houseTypeAttribute['house']);
    } else if (value === 'palace') {
      priceInput.setAttribute('min', houseTypeAttribute['palace']);
      priceInput.setAttribute('placeholder', houseTypeAttribute['palace']);
    }
  });

})();
