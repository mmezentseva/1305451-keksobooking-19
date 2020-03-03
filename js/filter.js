'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var currentValue;
  var TIMEOUT_DEBOUNCE = 500;
  var advertisements = [];
  var HOUSING_TYPE_ANY = 'any';

  var updateAds = function () {
    if (housingType.value === HOUSING_TYPE_ANY) {
      window.pin.render(window.util.shuffle(advertisements));
    } else {
      var sameHousingType = advertisements.filter(function (it) {
        return it.offer.type === currentValue;
      });
      window.pin.render(sameHousingType);
    }
  };

  housingType.addEventListener('change', function () {
    currentValue = housingType.value;
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
