'use strict';

(function () {
  var similarElementTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var valueToTranslate = {
    'flat': 'квартира',
    'house': 'дом',
    'palace': 'дворец',
    'bungalo': 'бунгало'
  };
  var toogleToPlural = function (number) {
    return number === 1 ? ' гостя' : ' гостей';
  };

  var valueToPlural = {
    1: ' комната для ',
    2: ' комнаты для ',
    3: ' комнаты для ',
    4: ' комнаты для ',
    5: ' комнат для ',
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
    if (card.offer.rooms && card.offer.guests) {
      newCardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + valueToPlural[card.offer.rooms] + card.offer.guests + toogleToPlural(card.offer.guests);
    }
    if (card.offer.checkin && card.offer.checkout) {
      newCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', ' + 'выезд после ' + card.offer.checkout;
    }
    if (card.offer.features) {
      newCardElement.querySelector('.popup__features').textContent = card.offer.features;
    }
    if (card.offer.description) {
      newCardElement.querySelector('.popup__description').textContent = card.offer.description;
    }
    if (card.offer.photos) {
      newCardElement.querySelector('.popup__photos').src = card.offer.photos;
    }
    if (card.offer.avatar) {
      newCardElement.querySelector('.popup__avatar').src = card.offer.avatar;
    }
    return newCardElement;
  };

  var escPressHandler = function (evt) {
    var mapCard = document.querySelector('.map__card');
    if (evt.key === window.util.ESC_KEY) {
      mapCard.remove();
    }
  };

  var removeCardEsc = function () {
    document.addEventListener('keydown', escPressHandler);
  };

  var removeCard = function (card) {
    card.addEventListener('click', function (evt) {
      var popupClose = document.querySelector('.popup__close');
      if (evt.target === popupClose) {
        card.remove();
        document.removeEventListener('keydown', escPressHandler);
      }
    });
    removeCardEsc();
  };

  var removeDoubleCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  window.adCard = {
    renderTemplate: renderCardTemplate,
    remove: removeCard,
    removeDouble: removeDoubleCard
  };
})();

