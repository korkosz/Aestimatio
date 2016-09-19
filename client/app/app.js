'use strict';

angular.module('aestimatio', ['aestimatio.account']);

angular.element(document)
    .ready(() => {
        angular.bootstrap(document, ['aestimatio'], {
            strictDi: true
        });
    });