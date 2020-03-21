'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT_IN_MS = 10000;
  var mapFilter = document.querySelectorAll('.map__filter');

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
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
