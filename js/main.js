'use strict';

var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLES = ['Комфортабельная квартира возле городского парка', 'Вы нашли то, что искали. Приезжайте прямо сейчас'];
var ADDRESSES = ['600, 350', '450, 300', '570, 520', '130, 400'];
var PRICES = [3400, 4700, 5200, 7800, 11600];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4, 5];
var GUESTS = [1, 2, 3, 4, 5];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.', 'Роскошная квартира в живописном, престижном районе'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var adsNumber = 8;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

document.querySelector('.map').classList.remove('map--faded');

var getRandomNumber = function (length) {
  return Math.floor(Math.random() * length);
};

var getRandomElementFromArray = function (array) {
  return array[getRandomNumber(array.length)];
};

var getRandomAvatar = function () {
  var rand = getRandomNumber(AVATARS.length);
  var uniqueItem = AVATARS[rand];
  AVATARS.splice(rand, 1);
  return uniqueItem;
};

var getRandomLengthArray = function (array) {
  var randomLengthArray = [];
  for (var i = 0; i <= getRandomNumber(array.length + 1); i++) {
    randomLengthArray.push(array[i]);
  }
  return randomLengthArray;
};

var getRandomLocation = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var createRandomAd = function () {
  return {
    author: {
      avatar: getRandomAvatar()
    },
    offer: {
      title: getRandomElementFromArray(TITLES),
      address: getRandomElementFromArray(ADDRESSES),
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
      x: getRandomLocation(LOCATION_Y_MIN, LOCATION_Y_MAX),
      y: getRandomLocation(LOCATION_Y_MIN, LOCATION_Y_MAX)
    }
  };
};

var generateAd = function (number) {
  var ads = [];
  for (var i = 0; i < number; i++) {
    ads.push(createRandomAd());
  }
  return ads;
};

var advertisements = generateAd(adsNumber);

var similarListElement = document.querySelector('.map__pins');
var similarElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPinTemplate = function (pin) {
  var newPinElement = similarElementTemplate.cloneNode(true);

  newPinElement.style.left = pin.location.x;
  newPinElement.style.top = pin.location.y;
  newPinElement.src = pin.avatar;
  newPinElement.alt = pin.title;

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
