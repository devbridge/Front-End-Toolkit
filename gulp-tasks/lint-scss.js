const gulp = require('gulp');
const gulpif = require('gulp-if');
const sassLint = require('gulp-sass-lint');
const { argv } = require('yargs');

const config = require('../gulp.config.js')();

module.exports = () => gulp
    .src(config.paths.scssLint.src)
    .pipe(gulpif(!argv.nolint, sassLint()))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
