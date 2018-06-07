const gulp = require('gulp'),
    watch = require('gulp-watch'),
    runSequence = require('run-sequence').use(gulp),
    config = require('../gulp.config.js')();

module.exports = function () {
    watch(
        config.optimize.images.src,
        () => runSequence('image-optimization', 'live-reload')
    );
};
