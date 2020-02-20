'use strict';

(function () {
  var similarElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var xOffset = similarElementTemplate.offsetWidth;
  var yOffset = similarElementTemplate.offsetTop;
  var newPinElement = similarElementTemplate.cloneNode(true);

  window.renderPinTemplate = function (pin) {
    newPinElement.style.left = pin.location.x - xOffset + 'px';
    newPinElement.style.top = pin.location.y - yOffset + 'px';
    newPinElement.querySelector('img').src = pin.author.avatar;
    newPinElement.querySelector('img').alt = pin.offer.title;

    return newPinElement;
  };
})();

(function () {
  var similarListElement = document.querySelector('.map__pins');
  var ADS_NUMBER = 8;
  var advertisements = window.generateAd(ADS_NUMBER);

  window.renderPins = function () {
    for (var i = 0; i < advertisements.length; i++) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(window.renderPinTemplate(advertisements[i]));
    }
    similarListElement.appendChild(fragment);
  };
})();


