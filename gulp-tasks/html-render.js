module.exports = function () {
    let gulp = require('gulp'),
        htmlrender = require('gulp-htmlrender'),
        rename = require('gulp-rename'),
        config = require('../gulp.config.js')();

    return gulp.src(config.html.src, {read: false})
        .pipe(htmlrender.render())
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('dist'));
};
