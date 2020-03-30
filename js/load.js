'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var URL = 'https://js.dump.academy/keksobooking/data';
  var mapFilter = document.querySelectorAll('.map__filter');

  var ErrorMessage = {
    ERROR_SERVER: 'Произошла ошибка соединения. Пожалуйста, обновите страницу.',
    ERROR_TIMEOUT: 'Сервер долго не отвечает. Пожалуйста, обновите страницу.'
  };

  window.load = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.StatusCode.OK) {
        successHandler(xhr.response);
        window.map.toggleElementAvailability(mapFilter, false);
      } else {
        errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler(ErrorMessage.ERROR_SERVER);
    });

    xhr.addEventListener('timeout', function () {
      errorHandler(ErrorMessage.ERROR_TIMEOUT);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
