module.exports = function () {
    const gulp = require('gulp');
    const watch = require('gulp-watch');
    const runSequence = require('run-sequence').use(gulp);
    const config = require('../gulp.config.js')();

    watch(
        config.optimize.images.src,
        () => runSequence('image-optimization', 'live-reload')
    );
};
