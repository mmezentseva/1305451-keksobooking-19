'use strict';

(function () {
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
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var map = document.querySelector('.map');

  var getAvatar = function (id) {
    return 'img/avatars/user0' + id + '.png';
  };

  var createRandomAds = function (avatarID) {
    var xCoordinate = window.util.getRandomNumberInRange(map.clientWidth);
    var yCoordinate = window.util.getRandomNumberInRange(LOCATION_Y_MAX, LOCATION_Y_MIN);
    return {
      author: {
        avatar: getAvatar(avatarID)
      },
      offer: {
        title: window.util.getRandomElementFromArray(TITLES),
        address: xCoordinate + ',' + yCoordinate,
        price: window.util.getRandomElementFromArray(PRICES),
        type: window.util.getRandomElementFromArray(TYPES),
        rooms: window.util.getRandomElementFromArray(ROOMS),
        guests: window.util.getRandomElementFromArray(GUESTS),
        checkin: window.util.getRandomElementFromArray(CHECKINS),
        checkout: window.util.getRandomElementFromArray(CHECKOUTS),
        features: window.util.getRandomLengthArray(FEATURES),
        description: window.util.getRandomElementFromArray(DESCRIPTIONS),
        photos: window.util.getRandomLengthArray(PHOTOS)
      },
      location: {
        x: xCoordinate,
        y: yCoordinate
      }
    };
  };

  var generate = function (number) {
    var ads = [];
    for (var i = 1; i <= number; i++) {
      ads.push(createRandomAds(i));
    }
    return ads;
  };

  window.card = {
    generate: generate
  };
})();
