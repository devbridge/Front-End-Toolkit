module.exports = function () {
    const gulp = require('gulp');
    const watch = require('gulp-watch');
    const runSequence = require('run-sequence').use(gulp);
    const config = require('../gulp.config.js')();

    watch(
        config.html.src,
        () => runSequence('html-render', 'live-reload')
    );
};
