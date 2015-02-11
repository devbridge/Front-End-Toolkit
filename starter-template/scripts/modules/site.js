"use strict";

/*jslint regexp: true, nomen: true, sloppy: true */
/*global require, define, alert, applicationConfig, location, document, window,  setTimeout, Countable */

define(['jquery'], function ($) {

    var module = {};

    module.sample = function () {
        console.log('sample');
    };

    module.init = function () {
        module.sample();
    };

    return module;
});