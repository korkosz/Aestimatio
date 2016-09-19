'use strict';

var angular = require('angular');

angular.module('aestimatio', [
    require('./account').name
]);

angular.element(document)
    .ready(() => {
        angular.bootstrap(document, ['aestimatio'], {
            strictDi: true
        });
    });