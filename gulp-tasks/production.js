module.exports = function (done) {
    const gulp = require('gulp');
    const runSequence = require('run-sequence').use(gulp);

    return runSequence(
        'check-deps',
        'prepare-assets',
        'prepare-config',
        'clear-image-cache',
        done
    );
};
