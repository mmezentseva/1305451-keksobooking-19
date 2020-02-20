'use strict';

(function () {
  window.getAvatar = function (id) {
    return 'img/avatars/user0' + id + '.png';
  };
})();

(function () {
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var map = document.querySelector('.map');

  window.createRandomAds = function (avatarID) {
    var xCoordinate = window.getRandom.numberInRange(map.clientWidth);
    var yCoordinate = window.getRandom.numberInRange(LOCATION_Y_MAX, LOCATION_Y_MIN);
    return {
      author: {
        avatar: window.getAvatar(avatarID)
      },
      offer: {
        title: window.getRandom.elementFromArray(window.dataArrays.TITLES),
        address: xCoordinate + ',' + yCoordinate,
        price: window.getRandom.elementFromArray(window.dataArrays.PRICES),
        type: window.getRandom.elementFromArray(window.dataArrays.TYPES),
        rooms: window.getRandom.elementFromArray(window.dataArrays.ROOMS),
        guests: window.getRandom.elementFromArray(window.dataArrays.GUESTS),
        checkin: window.getRandom.elementFromArray(window.dataArrays.CHECKINS),
        checkout: window.getRandom.elementFromArray(window.dataArrays.CHECKOUTS),
        features: window.getRandom.lengthArray(window.dataArrays.FEATURES),
        description: window.getRandom.elementFromArray(window.dataArrays.DESCRIPTIONS),
        photos: window.getRandom.lengthArray(window.dataArrays.PHOTOS)
      },
      location: {
        x: xCoordinate,
        y: yCoordinate
      }
    };
  };
})();

(function () {
  var ads = [];

  window.generateAd = function (number) {
    for (var i = 1; i <= number; i++) {
      ads.push(window.createRandomAds(i));
    }
    return ads;
  };
})();
