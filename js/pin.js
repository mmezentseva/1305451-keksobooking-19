'use strict';

(function () {
  var ADS_NUMBER = 5;
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var xOffset = mapPinTemplate.offsetWidth;
  var yOffset = mapPinTemplate.offsetTop;

  var renderPinTemplate = function (pin) {
    var newPinElement = mapPinTemplate.cloneNode(true);

    newPinElement.style.left = pin.location.x - xOffset + 'px';
    newPinElement.style.top = pin.location.y - yOffset + 'px';
    newPinElement.querySelector('img').src = pin.author.avatar;
    newPinElement.querySelector('img').alt = pin.offer.title;

    return newPinElement;
  };

  var removePin = function () {
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPin.forEach(function (it) {
      it.remove();
    });
  };

  var render = function (data) {
    removePin();
    var takeNumber = data.length > ADS_NUMBER ? ADS_NUMBER : data.length;
    for (var i = 0; i < takeNumber; i++) {
      var card = window.card.createAdvertisment(data[i]);
      var pin = renderPinTemplate(card);
      pin.addEventListener('click', card.selectHandler.bind(card));
      mapPins.appendChild(pin);
    }
  };

  window.pin = {
    render: render,
    remove: removePin
  };
})();
