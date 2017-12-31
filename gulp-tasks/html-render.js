module.exports = function () {
    let gulp = require('gulp'),
        htmlrender = require('gulp-htmlrender'),
        config = require('../gulp.config.js')();

    return gulp.src('src/**/*.html', {read: false})
        .pipe(htmlrender.render())
        .pipe(gulp.dest('dist'));
};


