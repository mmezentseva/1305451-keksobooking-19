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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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
renderPins();
