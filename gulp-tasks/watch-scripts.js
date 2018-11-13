const gulp = require('gulp'),
    watch = require('gulp-watch'),
    runSequence = require('run-sequence').use(gulp),
    config = require('../gulp.config.js')();

module.exports = function () {
    watch(
        config.path.ALL,
        () => runSequence('compile-scripts', 'live-reload')
    );
};
