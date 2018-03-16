module.exports = function () {
    let gulp = require('gulp'),
        htmlrender = require('gulp-htmlrender'),
        flatten = require('gulp-flatten'),
        config = require('../gulp.config.js')();

    return gulp.src(config.html.src, {read: false})
        .pipe(htmlrender.render())
        .pipe(flatten())
        .pipe(gulp.dest('dist'));
};
