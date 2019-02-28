module.exports = function () {
    const sassLint = require('gulp-sass-lint');
    const gulp = require('gulp');
    const gulpif = require('gulp-if');
    const argv = require('yargs').argv;
    const config = require('../gulp.config.js')();

    return gulp.src(config.scss.lint)
        .pipe(gulpif(!argv.nolint, sassLint()))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
};
