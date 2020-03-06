'use strict';

(function () {
  var map = document.querySelector('.map');
  var filterContainer = document.querySelector('.map__filters-container');
  var similarElementTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var AD_COUNT = 1;
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
    '1': ' комната для ',
    '2': ' комнаты для ',
    '3': ' комнаты для ',
    '4': ' комнаты для ',
    '5': ' комнат для ',
  };

  var renderCardTemplate = function (card) {
    var newCardElement = similarElementTemplate.cloneNode(true);

    newCardElement.querySelector('.popup__title').textContent = card.offer.title;
    newCardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    newCardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    newCardElement.querySelector('.popup__type').textContent = valueToTranslate[card.offer.type];
    newCardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + valueToPlural[card.offer.rooms] + card.offer.guests + toogleToPlural(card.offer.guests);
    newCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', ' + 'выезд после ' + card.offer.checkout;
    newCardElement.querySelector('.popup__features').textContent = card.offer.features;
    newCardElement.querySelector('.popup__description').textContent = card.offer.description;
    newCardElement.querySelector('.popup__photos').src = card.offer.photos;
    newCardElement.querySelector('.popup__avatar').src = card.offer.avatar;

    return newCardElement;
  };

  var hasProperties = function (obj) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i) === undefined) {
        delete obj.key;
      }
    }
    return obj;
  };

  var advertisements = window.card.generate(AD_COUNT);

  var renderCard = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertisements.length; i++) {
      hasProperties(advertisements[i]);
      fragment.appendChild(renderCardTemplate(advertisements[i]));
    }
    map.insertBefore(fragment, filterContainer);
  };

  window.adCard = {
    renderCard: renderCard
  };
})();
