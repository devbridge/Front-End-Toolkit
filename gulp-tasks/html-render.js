module.exports = function () {
    let gulp = require('gulp'),
        htmlrender = require('gulp-htmlrender'),
        config = require('../gulp.config.js')();

    return gulp.src(config.html.src, {read: false})
        .pipe(htmlrender.render())
        .pipe(gulp.dest('dist'));
};
