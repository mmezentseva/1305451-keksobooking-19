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
  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select, input');
  var housingFeatures = filter.querySelector('#housing-features');
  var ANY = 'any';
  var currentTypeValue = ANY;
  var currentPriceValue = ANY;
  var currentRoomsValue = ANY;
  var currentGuestsValue = ANY;
  var TIMEOUT_DEBOUNCE = 500;
  var advertisements = [];
  var MIDDLE_PRICE = 10000;
  var HIGHT_PRICE = 50000;

  var getHousingPriceValue = function (property) {
    if (property <= MIDDLE_PRICE) {
      property = 'low';
    } else if (property > MIDDLE_PRICE && property < HIGHT_PRICE) {
      property = 'middle';
    } else {
      property = 'high';
    }
    return property;
  };

  var filterType = function (advertisement) {
    return currentTypeValue === ANY ? true : advertisement.offer.type === currentTypeValue;
  };

  var filterPrice = function (advertisement) {
    return currentPriceValue === ANY ? true : getHousingPriceValue(advertisement.offer.price) === currentPriceValue;
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
      window.cardTemplate.removeElement();
      updateAds();
    }, TIMEOUT_DEBOUNCE);
  });

  housingRooms.addEventListener('change', function () {
    currentRoomsValue = housingRooms.value === ANY ? ANY : parseInt(housingRooms.value, 10);
    window.setTimeout(function () {
      window.cardTemplate.removeElement();
      updateAds();
    }, TIMEOUT_DEBOUNCE);
  });

  housingPrice.addEventListener('change', function () {
    currentPriceValue = housingPrice.value;
    window.setTimeout(function () {
      window.cardTemplate.removeElement();
      updateAds();
    }, TIMEOUT_DEBOUNCE);
  });

  housingType.addEventListener('change', function () {
    currentTypeValue = housingType.value;
    window.setTimeout(function () {
      window.cardTemplate.removeElement();
      updateAds();
    }, TIMEOUT_DEBOUNCE);
  });

  var changeFeatureHandler = function (element) {
    element.addEventListener('change', function () {
      window.setTimeout(function () {
        window.cardTemplate.removeElement();
        updateAds();
      }, TIMEOUT_DEBOUNCE);
    });
  };

  changeFeatureHandler(housingType, currentTypeValue);
  changeFeatureHandler(featureWifi);
  changeFeatureHandler(featureDishwasher);
  changeFeatureHandler(featureParking);
  changeFeatureHandler(featureWasher);
  changeFeatureHandler(featureElevator);
  changeFeatureHandler(featureConditioner);

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

  var reset = function () {
    filterItems.forEach(function (it) {
      it.value = ANY;
    });
    var featuresItems = housingFeatures.querySelectorAll('input');
    featuresItems.forEach(function (element) {
      element.checked = false;
    });
  };

  window.filter = {
    successHandler: successHandler,
    errorHandler: errorHandler,
    reset: reset
  };
})();
