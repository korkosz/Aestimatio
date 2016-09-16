'use strict';

angular.module('aestimatio', []);

angular.element(document)
    .ready(() => {
        angular.bootstrap(document, ['aestimatio'], {
            strictDi: true
        })
    });