'use strict';

(function () {
  var similarListElement = document.querySelector('.map__pins');
  var similarElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

  var successHandler = function (advertisements) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < advertisements.length; i++) {
      fragment.appendChild(renderPinTemplate(advertisements[i]));
    }
    similarListElement.appendChild(fragment);
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

  window.pin = {
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();

