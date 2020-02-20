'use strict';

window.getRandom = (function () {
  var MIN_VALUE = 0;
  var randomLengthArray = [];

  return {
    numberInRange: function (max, min) {
      min = min || MIN_VALUE;
      return Math.floor(Math.random() * (max - min)) + min;
    },
    elementFromArray: function (array) {
      return array[window.getRandom.numberInRange(array.length)];
    },
    lengthArray: function (array) {
      var randomLength = window.getRandom.numberInRange(array.length);
      for (var i = 0; i <= randomLength; i++) {
        randomLengthArray.push(array[i]);
      }
      return randomLengthArray;
    }
  };
})();
