module.exports = function (done) {
    var gulp = require('gulp'),
        runSequence = require('run-sequence'),
        config = require('../gulp.config.js')();

    return runSequence('image-optimization',
        'create-svg-sprite',
        'scss-linting',
        'compile-scss',
        'html-render',
        done);
};


