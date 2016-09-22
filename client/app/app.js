'use strict';

var angular = require('angular');

angular
    .module('aestimatio', [
        require('angular-route'),
        require('./account').name,
        require('./user').name,
        require('./class').name
    ])
    .config(require('./app.routes'));

angular
    .element(document)
    .ready(() => {
        angular.bootstrap(document, ['aestimatio'], {
            strictDi: true
        });
    });