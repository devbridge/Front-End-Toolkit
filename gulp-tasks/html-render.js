module.exports = function () {
    const gulp = require('gulp');
    const htmlRender = require('gulp-htmlrender');
    const config = require('../gulp.config.js')();

    return gulp.src(config.html.src, {read: false})
        .pipe(htmlRender.render())
        .pipe(gulp.dest('dist'));
};
