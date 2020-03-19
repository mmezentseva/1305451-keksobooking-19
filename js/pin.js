'use strict';

(function () {
  var similarListElement = document.querySelector('.map__pins');
  var similarElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  // var mapPinMain = document.querySelector('.map__pin--main');

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

  /*
  var render = function (data) {
    similarListElement.innerHTML = '';
    similarListElement.appendChild(mapPinMain);
    var takeNumber = data.length > ADS_NUMBERS ? ADS_NUMBERS : data.length;
    for (var i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(renderPinTemplate(data[i]));
    }
  };
  */
  var advertisements = window.card.generate(ADS_NUMBER);

  var render = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertisements.length; i++) {
      var advertisement = advertisements[i];
      var pin = renderPinTemplate(advertisement);
      pin.addEventListener('click', advertisement.selectHandler.bind(advertisement));

      fragment.appendChild(pin);
    }
    similarListElement.appendChild(fragment);
  };

  window.pin = {
    render: render
  };
})();

