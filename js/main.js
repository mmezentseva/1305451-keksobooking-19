'use strict';

var TITLES = ['Комфортабельная квартира возле городского парка', 'Вы нашли то, что искали. Приезжайте прямо сейчас'];
var PRICES = [3400, 4700, 5200, 7800, 11600];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4, 5];
var GUESTS = [1, 2, 3, 4, 5];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.', 'Роскошная квартира в живописном, престижном районе'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ADS_NUMBER = 8;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var MIN_VALUE = 0;
var ENTER_KEY = 'Enter';
var RADIX_NUMBER = 10;
var HALF = 2;
var MAINPIN_AFTER_HEIGHT = 22;

var map = document.querySelector('.map');

var getRandomNumberInRange = function (max, min) {
  min = min || MIN_VALUE;
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomElementFromArray = function (array) {
  return array[getRandomNumberInRange(array.length)];
};

var getRandomLengthArray = function (array) {
  var randomLengthArray = [];
  var randomLength = getRandomNumberInRange(array.length);
  for (var i = 0; i <= randomLength; i++) {
    randomLengthArray.push(array[i]);
  }
  return randomLengthArray;
};

var getAvatar = function (id) {
  return 'img/avatars/user0' + id + '.png';
};

var createRandomAds = function (avatarID) {
  var xCoordinate = getRandomNumberInRange(map.clientWidth);
  var yCoordinate = getRandomNumberInRange(LOCATION_Y_MAX, LOCATION_Y_MIN);
  return {
    author: {
      avatar: getAvatar(avatarID)
    },
    offer: {
      title: getRandomElementFromArray(TITLES),
      address: xCoordinate + ',' + yCoordinate,
      price: getRandomElementFromArray(PRICES),
      type: getRandomElementFromArray(TYPES),
      rooms: getRandomElementFromArray(ROOMS),
      guests: getRandomElementFromArray(GUESTS),
      checkin: getRandomElementFromArray(CHECKINS),
      checkout: getRandomElementFromArray(CHECKOUTS),
      features: getRandomLengthArray(FEATURES),
      description: getRandomElementFromArray(DESCRIPTIONS),
      photos: getRandomLengthArray(PHOTOS)
    },
    location: {
      x: xCoordinate,
      y: yCoordinate
    }
  };
};

var generateAd = function (number) {
  var ads = [];
  for (var i = 1; i <= number; i++) {
    ads.push(createRandomAds(i));
  }
  return ads;
};

var advertisements = generateAd(ADS_NUMBER);

var similarListElement = document.querySelector('.map__pins');
var similarElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var xOffset = similarElementTemplate.offsetWidth;
var yOffset = similarElementTemplate.offsetTop;

var renderPinTemplate = function (pin) {
  var newPinElement = similarElementTemplate.cloneNode(true);

  newPinElement.style.left = pin.location.x - xOffset + 'px';
  newPinElement.style.top = pin.location.y - yOffset + 'px';
  newPinElement.querySelector('img').src = pin.author.avatar;
  newPinElement.querySelector('img').alt = pin.offer.title;

  return newPinElement;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertisements.length; i++) {
    fragment.appendChild(renderPinTemplate(advertisements[i]));
  }
  similarListElement.appendChild(fragment);
};

// Доверяй, но проверяй. Часть_1

var fieldsetHeader = document.querySelector('.ad-form-header');
var formInput = document.querySelectorAll('.ad-form__element');
var formAd = document.querySelector('.ad-form');
var addressForm = document.querySelector('#address');
var mapFilters = document.querySelector('.map__filters');
var mapPinMain = document.querySelector('.map__pin--main');
var capacity = document.querySelector('#capacity');
var roomNumber = document.querySelector('#room_number');

var mainPinX = parseInt(mapPinMain.style.left, RADIX_NUMBER) + Math.round(mapPinMain.offsetWidth / HALF);
var mainPinY = parseInt(mapPinMain.style.top, RADIX_NUMBER) + Math.round(mapPinMain.offsetHeight / HALF);
var mainPinActiveY = mainPinY + MAINPIN_AFTER_HEIGHT;
var mainPinCoordinate = mainPinX + ',' + mainPinY;
var mainPinCoordinateActive = mainPinX + ',' + mainPinActiveY;

fieldsetHeader.setAttribute('disabled', 'disabled');
addressForm.setAttribute('value', mainPinCoordinate);
mapFilters.classList.add('map__filters--disabled');

var makeFormDisabled = function () {
  for (var i = 0; i < formInput.length; i++) {
    formInput[i].setAttribute('disabled', 'disabled');
  }
};
makeFormDisabled();

var pageMakeActiveHandler = function () {
  renderPins();
  map.classList.remove('map--faded');
  fieldsetHeader.removeAttribute('disabled');
  formAd.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  addressForm.setAttribute('value', mainPinCoordinateActive);

  for (var j = 0; j < formInput.length; j++) {
    formInput[j].removeAttribute('disabled');
  }
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    pageMakeActiveHandler();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    pageMakeActiveHandler();
  }
});

capacity.addEventListener('change', function () {

  var index = capacity.options.selectedIndex;
  roomNumber.options[index].selected = true;
  var roomNumberLenght = roomNumber.options.length;

  if (index === roomNumberLenght - 1) {
    for (var j = 0; j < roomNumberLenght; j++) {
      if (j < index) {
        roomNumber.options[j].disabled = true;
      } else {
        roomNumber.options[j].disabled = false;
      }
    }
  } else {
    for (var k = 0; k < roomNumberLenght; k++) {
      if (k > index) {
        roomNumber.options[k].disabled = true;
      } else {
        roomNumber.options[k].disabled = false;
      }
    }
  }
});

roomNumber.addEventListener('change', function () {

  var index = roomNumber.options.selectedIndex;
  capacity.options[index].selected = true;
  var capacityLenght = capacity.options.length;

  for (var k = 0; k < capacityLenght - 1; k++) {
    capacity.options[capacityLenght - 1].disabled = true;
    if (k < index) {
      capacity.options[k].disabled = true;
    } else {
      capacity.options[k].disabled = false;
    }
  }
});

