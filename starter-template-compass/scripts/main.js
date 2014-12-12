/*jslint regexp: true, nomen: true, sloppy: true */
/*global require, applicationConfig, window, applicationConfig */
require.config({
    baseUrl: '/',
    paths: {
        jquery: '/scripts/libs/jquery-1.8.3.min',
        site: '/scripts/modules/site',
        validation: '/scripts/plugins/jquery.validate'
    },
    shim: {
        site: {
            deps: ['jquery']
        },
        validation: {
            deps: ['jquery']
        },
        browserCompatability: {
            deps: ['jquery']
        }
    }
});
require(['jquery', 'site'], function ($, site) {
    var console = window.console || { log: $.noop, error: $.noop },
        maxData = [];
    if (typeof applicationConfig != 'undefined') {
        var config = applicationConfig;
    }
    if (typeof site != 'undefined') {
        site.init();
    }
});
