const gulp = require('gulp'),
    runSequence = require('run-sequence').use(gulp),
    config = require('../gulp.config.js')();

module.exports = function () {
    gulp.watch(
        config.html.src,
        () => runSequence('html-render', 'live-reload')
    );
};
