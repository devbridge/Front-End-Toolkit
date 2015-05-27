/*jslint regexp: true, nomen: true, sloppy: true */
/*global require, applicationConfig, window, applicationConfig */
require.config({
    baseUrl: '/scripts/',
    paths: {
        jquery: [
            '//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min', // cdn
            '/libs/jquery-1.8.3.min' // fallback
        ],
        validation: 'plugins/jquery.validate',
        slickSlider: [
            '//cdn.jsdelivr.net/jquery.slick/1.4.1/slick.min',
            'plugins/slick.min'
        ],
        modal: 'plugins/jquery.modal',
        site: 'modules/site'
    },
    shim: {
        validation: {
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
