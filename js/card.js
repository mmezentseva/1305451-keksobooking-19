'use strict';

(function () {
  var map = document.querySelector('.map');
  var filterContainer = document.querySelector('.map__filters-container');

  var createAdvertisment = function (data) {
    return {
      author: {
        avatar: data.author.avatar
      },
      offer: {
        title: data.offer.title,
        address: data.offer.address,
        price: data.offer.price,
        type: data.offer.type,
        rooms: data.offer.rooms,
        guests: data.offer.guests,
        checkin: data.offer.checkin,
        checkout: data.offer.checkout,
        features: data.offer.features,
        description: data.offer.description,
        photos: data.offer.photos
      },
      location: {
        x: data.location.x,
        y: data.location.y
      },
      selectHandler: function () {
        window.cardTemplate.removeDouble();
        var element = window.cardTemplate.render(this);
        map.insertBefore(element, filterContainer);
        window.cardTemplate.removeElement();
      }
    };
  };

  window.card = {
    createAdvertisment: createAdvertisment
  };

})();
