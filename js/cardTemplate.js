'use strict';

(function () {
  var IMAGE_WIDTH = 45;
  var IMAGE_HEIGHT = 40;
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var popupClose = '.popup__close';
  var popup = '.map__card';

  var TypesMap = {
    FLAT: 'квартира',
    HOUSE: 'дом',
    PALACE: 'дворец',
    BUNGALO: 'бунгало'
  };

  var renderPhotos = function (newCard, card) {
    var popupPhotos = newCard.querySelector('.popup__photos');
    newCard.querySelector('.popup__photo').hidden = true;

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
    var newCard = cardTemplate.cloneNode(true);

    if (card.offer.title) {
      newCard.querySelector('.popup__title').textContent = card.offer.title;
    }

    if (card.offer.address) {
      newCard.querySelector('.popup__text--address').textContent = card.offer.address;
    }
    if (card.offer.price) {
      newCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    }
    if (card.offer.type) {
      newCard.querySelector('.popup__type').textContent = TypesMap[card.offer.type.toUpperCase()];
    }
    if (card.offer.rooms !== null && card.offer.guests !== null) {
      newCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнат(а) для ' + card.offer.guests + ' гостя(ей)';
    }
    if (card.offer.checkin && card.offer.checkout) {
      newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', ' + 'выезд после ' + card.offer.checkout;
    }
    if (card.offer.features.length !== 0) {
      newCard.querySelector('.popup__features').textContent = card.offer.features;
    } else {
      newCard.querySelector('.popup__features').hidden = true;
    }
    if (card.offer.description) {
      newCard.querySelector('.popup__description').textContent = card.offer.description;
    }
    if (card.offer.photos.length !== 0) {
      renderPhotos(newCard, card);
    } else {
      newCard.querySelector('.popup__photo').hidden = true;
    }
    if (card.author.avatar) {
      newCard.querySelector('.popup__avatar').src = card.author.avatar;
    }
    return newCard;
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

