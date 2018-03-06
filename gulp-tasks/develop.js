module.exports = function () {
    return require("check-dependencies")({
        install: true,
        verbose: false
    }, function () {
        let gulp = require('gulp'),
            runSequence = require('run-sequence').use(gulp);

        runSequence(
            'clean',
            'prepare-assets',
            'prepare-config',
            'clear-image-cache',
            'watch-scss',
            'watch-htmlrender',
            'watch-svg',
            'watch-images-optimize',
            'live-server'
        );
    });
};
