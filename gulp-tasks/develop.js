module.exports = function (done) {
    let gulp = require('gulp'),
        runSequence = require('run-sequence').use(gulp);

    return runSequence(
        'clean',
        'prepare-assets',
        'prepare-config',
        'clear-image-cache',
        'watch-scss',
        'watch-htmlrender',
        'watch-svg',
        'watch-images-optimize',
        'live-server',
        done
    );
};
