'use strict';

(function () {
  var MIN_VALUE = 0;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var StatusCode = {
    OK: 200
  };

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

  var escPressHandler = function (className) {
    var element = document.querySelector(className);
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.util.ESC_KEY) {
        element.remove();
      }
    });
  };

  var closeOnClickHandler = function (className) {
    var element = document.querySelector(className);
    document.addEventListener('click', function (evt) {
      if (evt.target === element) {
        element.remove();
      }
    });
    document.removeEventListener('keydown', escPressHandler(className));
  };

  var closeOnclickBtnHandler = function (BtnclassName, elementClassName) {
    var button = document.querySelector(BtnclassName);
    var element = document.querySelector(elementClassName);
    document.addEventListener('click', function (evt) {
      if (evt.target === button) {
        element.remove();
      }
    });
    document.removeEventListener('keydown', escPressHandler(elementClassName));
  };

  window.util = {
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,
    getRandomNumberInRange: getRandomNumberInRange,
    getRandomElementFromArray: getRandomElementFromArray,
    getRandomLengthArray: getRandomLengthArray,
    shuffle: shuffle,
    escPressHandler: escPressHandler,
    closeOnClickHandler: closeOnClickHandler,
    closeOnclickBtnHandler: closeOnclickBtnHandler,
    StatusCode: StatusCode
  };
})();
