module.exports = function () {
    const gulp = require('gulp');
    const watch = require('gulp-watch');
    const runSequence = require('run-sequence').use(gulp);
    const config = require('../gulp.config.js')();

    watch(
        config.svg.sourceFolder + '**/*.svg',
        () => runSequence('create-svg-sprite', 'live-reload')
    );
};
