'use strict';

(function () {
  var MIN_VALUE = 0;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var getRandomNumberInRange = function (max, min) {
    min = min || MIN_VALUE;
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomElementFromArray = function (array) {
    return array[getRandomNumberInRange(array.length)];
  };

  var getRandomLengthArray = function (array) {
    var randomLengthArray = [];
    var randomLength = getRandomNumberInRange(array.length);
    for (var i = 0; i <= randomLength; i++) {
      randomLengthArray.push(array[i]);
    }
    return randomLengthArray;
  };

  var shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = getRandomNumberInRange(array.length);
      var shuffleElement = array[i];
      array[i] = array[j];
      array[j] = shuffleElement;
    }
    return array;
  };
  /*
  var hasProperties = function (card) {
    var keys = Object.keys(card);
    keys.forEach(function (key) {
      var list = card[key];
      var props = Object.keys(list);
      props.forEach(function (prop) {
        if (list[prop] === undefined) {
          delete list.prop;
        }
      });
    });
  };
*/

  window.util = {
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,
    getRandomNumberInRange: getRandomNumberInRange,
    getRandomElementFromArray: getRandomElementFromArray,
    getRandomLengthArray: getRandomLengthArray,
    shuffle: shuffle
  };
})();
