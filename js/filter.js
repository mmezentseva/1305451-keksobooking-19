'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var featureWifi = document.querySelector('#filter-wifi');
  var featureDishwasher = document.querySelector('#filter-dishwasher');
  var featureParking = document.querySelector('#filter-parking');
  var featureWasher = document.querySelector('#filter-washer');
  var featureElevator = document.querySelector('#filter-elevator');
  var featureConditioner = document.querySelector('#filter-conditioner');
  var ANY = 'any';
  var currentTypeValue = ANY;
  var currentPriceValue = ANY;
  var currentRoomsValue = ANY;
  var currentGuestsValue = ANY;
  var TIMEOUT_DEBOUNCE = 500;
  var advertisements = [];

  var housingPriceValue = function (property) {
    if (property < 10000) {
      property = 'low';
    } else if (property > 10000 && property < 50000) {
      property = 'middle';
    } else {
      property = 'hight';
    }
    return property;
  };

  var filterType = function (advertisement) {
    return currentTypeValue === ANY ? true : advertisement.offer.type === currentTypeValue;
  };

  var filterPrice = function (advertisement) {
    return currentPriceValue === ANY ? true : housingPriceValue(advertisement.offer.price) === currentPriceValue;
  };

  var filterRooms = function (advertisement) {
    return currentRoomsValue === ANY ? true : advertisement.offer.rooms === currentRoomsValue;
  };

  var filterGuests = function (advertisement) {
    return currentGuestsValue === ANY ? true : advertisement.offer.guests === currentGuestsValue;
  };

  var filterFeatures = function (advertisement) {
    var features = document.querySelector('#housing-features');
    var filtered = true;

    Array.from(features.elements).forEach(function (item) {
      if (item.checked && !advertisement.offer.features.includes(item.value)) {
        filtered = false;
      }
    });
    return filtered;
  };

  var updateAds = function () {
    var filteredItems = advertisements.filter(function (it) {
      return filterType(it) && filterPrice(it) && filterRooms(it) && filterGuests(it) && filterFeatures(it);
    });
    window.pin.render(filteredItems);
  };

  housingGuests.addEventListener('change', function () {
    currentGuestsValue = housingGuests.value === ANY ? ANY : parseInt(housingGuests.value, 10);
    window.setTimeout(function () {
      updateAds();
    }, TIMEOUT_DEBOUNCE);
  });

  housingRooms.addEventListener('change', function () {
    currentRoomsValue = housingRooms.value === ANY ? ANY : parseInt(housingRooms.value, 10);
    window.setTimeout(function () {
      updateAds();
    }, TIMEOUT_DEBOUNCE);
  });

  housingPrice.addEventListener('change', function () {
    currentPriceValue = housingPrice.value;
    window.setTimeout(function () {
      updateAds();
    }, TIMEOUT_DEBOUNCE);
  });

  housingType.addEventListener('change', function () {
    currentTypeValue = housingType.value;
    window.setTimeout(function () {
      updateAds();
    }, TIMEOUT_DEBOUNCE);
  });

  featureWifi.addEventListener('change', function () {
    window.setTimeout(function () {
      updateAds();
    }, TIMEOUT_DEBOUNCE);
  });

  featureDishwasher.addEventListener('change', function () {
    window.setTimeout(function () {
      updateAds();
    }, TIMEOUT_DEBOUNCE);
  });

  featureParking.addEventListener('change', function () {
    window.setTimeout(function () {
      updateAds();
    }, TIMEOUT_DEBOUNCE);
  });

  featureWasher.addEventListener('change', function () {
    window.setTimeout(function () {
      updateAds();
    }, TIMEOUT_DEBOUNCE);
  });

  featureElevator.addEventListener('change', function () {
    window.setTimeout(function () {
      updateAds();
    }, TIMEOUT_DEBOUNCE);
  });

  featureConditioner.addEventListener('change', function () {
    window.setTimeout(function () {
      updateAds();
    }, TIMEOUT_DEBOUNCE);
  });

  var successHandler = function (data) {
    advertisements = data;
    var shuffleAds = window.util.shuffle(advertisements);
    window.pin.render(shuffleAds);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.filter = {
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
