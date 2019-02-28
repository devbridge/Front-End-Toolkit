module.exports = function () {
    const htmlhint = require('gulp-htmlhint');
    const gulp = require('gulp');
    const config = require('../gulp.config.js')();

    return gulp.src(config.html.src)
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
};
