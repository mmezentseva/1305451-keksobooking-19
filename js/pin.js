'use strict';

(function () {
  var similarListElement = document.querySelector('.map__pins');
  var similarElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var ADS_NUMBER = 8;

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

  var advertisements = window.card.generate(ADS_NUMBER);

  var render = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertisements.length; i++) {
      fragment.appendChild(renderPinTemplate(advertisements[i]));
    }
    similarListElement.appendChild(fragment);
  };

  window.pin = {
    render: render
  };
})();


