'use strict';

(function () {
  var mapPins = document.querySelectorAll('.map__pin');
  var map = document.querySelector('.map');
  var filterContainer = document.querySelector('.map__filters-container');
  var ADS_NUMBER = 8;

  var cards = window.adCard.renderCard(ADS_NUMBER);

  var openPopupHandler = function () {
    for (var i = 0; i < mapPins.length; i++) {
      var card = cards[i];
      mapPins[i].addEventListener('click', function () {
        return {
          card: card,
          selectHandler: function () {
            map.insertBefore(this.card, filterContainer);
          }
        };
      });
    }
  };

  openPopupHandler();

})();

