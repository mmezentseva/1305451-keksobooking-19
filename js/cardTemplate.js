'use strict';

(function () {
  var similarElementTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var popupClose = '.popup__close';
  var popup = '.map__card';
  var IMAGE_WIDTH = 45;
  var IMAGE_HEIGHT = 40;

  var valueToTranslate = {
    'flat': 'квартира',
    'house': 'дом',
    'palace': 'дворец',
    'bungalo': 'бунгало'
  };

  var renderPhotos = function (newCardElement, card) {
    var popupPhotos = newCardElement.querySelector('.popup__photos');
    newCardElement.querySelector('.popup__photo').hidden = true;

    for (var i = 0; i < card.offer.photos.length; i++) {
      var image = document.createElement('img');
      image.src = card.offer.photos[i];
      image.width = IMAGE_WIDTH;
      image.height = IMAGE_HEIGHT;
      image.alt = 'Фотография жилья';
      popupPhotos.appendChild(image);
    }
  };

  var renderCardTemplate = function (card) {
    var newCardElement = similarElementTemplate.cloneNode(true);

    if (card.offer.title) {
      newCardElement.querySelector('.popup__title').textContent = card.offer.title;
    }

    if (card.offer.address) {
      newCardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    }
    if (card.offer.price) {
      newCardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    }
    if (card.offer.type) {
      newCardElement.querySelector('.popup__type').textContent = valueToTranslate[card.offer.type];
    }
    if (card.offer.rooms !== null && card.offer.guests !== null) {
      newCardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнат(а) для ' + card.offer.guests + ' гостя(ей)';
    }
    if (card.offer.checkin && card.offer.checkout) {
      newCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', ' + 'выезд после ' + card.offer.checkout;
    }
    if (card.offer.features.length !== 0) {
      newCardElement.querySelector('.popup__features').textContent = card.offer.features;
    } else {
      newCardElement.querySelector('.popup__features').hidden = true;
    }
    if (card.offer.description) {
      newCardElement.querySelector('.popup__description').textContent = card.offer.description;
    }
    if (card.offer.photos.length !== 0) {
      renderPhotos(newCardElement, card);
    } else {
      newCardElement.querySelector('.popup__photo').hidden = true;
    }
    if (card.author.avatar) {
      newCardElement.querySelector('.popup__avatar').src = card.author.avatar;
    }
    return newCardElement;
  };

  var removeElementByClick = function () {
    window.util.escPressHandler(popup);
    window.util.closeOnclickBtnHandler(popupClose, popup);
  };

  var removeElement = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  window.cardTemplate = {
    render: renderCardTemplate,
    removeElementByClick: removeElementByClick,
    removeElement: removeElement,
  };
})();

