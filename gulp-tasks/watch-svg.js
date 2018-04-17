const gulp = require('gulp'),
    runSequence = require('run-sequence').use(gulp),
    config = require('../gulp.config.js')();

module.exports = function () {
    gulp.watch(
        config.svg.sourceFolder + '**/*.svg',
        () => runSequence('create-svg-sprite', 'live-reload')
    );
};
